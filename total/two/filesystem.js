function basename(path, suffix) {
  //  discuss at: http://phpjs.org/functions/basename/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Ash Searle (http://hexmen.com/blog/)
  // improved by: Lincoln Ramsay
  // improved by: djmix
  // improved by: Dmitry Gorelenkov
  //   example 1: basename('/www/site/home.htm', '.htm');
  //   returns 1: 'home'
  //   example 2: basename('ecra.php?p=1');
  //   returns 2: 'ecra.php?p=1'
  //   example 3: basename('/some/path/');
  //   returns 3: 'path'
  //   example 4: basename('/some/path_ext.ext/','.ext');
  //   returns 4: 'path_ext'

  var b = path;
  var lastChar = b.charAt(b.length - 1);

  if (lastChar === '/' || lastChar === '\\') {
    b = b.slice(0, -1);
  }

  b = b.replace(/^.*[\/\\]/g, '');

  if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
    b = b.substr(0, b.length - suffix.length);
  }

  return b;
}function dirname(path) {
  //  discuss at: http://phpjs.org/functions/dirname/
  // original by: Ozh
  // improved by: XoraX (http://www.xorax.info)
  //   example 1: dirname('/etc/passwd');
  //   returns 1: '/etc'
  //   example 2: dirname('c:/Temp/x');
  //   returns 2: 'c:/Temp'
  //   example 3: dirname('/dir/test/');
  //   returns 3: '/dir'

  return path.replace(/\\/g, '/')
    .replace(/\/[^\/]*\/?$/, '');
}function file_get_contents(url, flags, context, offset, maxLen) {
  //  discuss at: http://phpjs.org/functions/file_get_contents/
  // original by: Legaev Andrey
  //    input by: Jani Hartikainen
  //    input by: Raphael (Ao) RUDLER
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //        note: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
  //        note: Synchronous by default (as in PHP) so may lock up browser. Can
  //        note: get async by setting a custom "phpjs.async" property to true and "notification" for an
  //        note: optional callback (both as context params, with responseText, and other JS-specific
  //        note: request properties available via 'this'). Note that file_get_contents() will not return the text
  //        note: in such a case (use this.responseText within the callback). Or, consider using
  //        note: jQuery's: $('#divId').load('http://url') instead.
  //        note: The context argument is only implemented for http, and only partially (see below for
  //        note: "Presently unimplemented HTTP context options"); also the arguments passed to
  //        note: notification are incomplete
  //        test: skip
  //   example 1: var buf file_get_contents('http://google.com');
  //   example 1: buf.indexOf('Google') !== -1
  //   returns 1: true

  var tmp, headers = [],
    newTmp = [],
    k = 0,
    i = 0,
    href = '',
    pathPos = -1,
    flagNames = 0,
    content = null,
    http_stream = false;
  var func = function(value) {
    return value.substring(1) !== '';
  };

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  var ini = this.php_js.ini;
  context = context || this.php_js.default_streams_context || null;

  if (!flags) {
    flags = 0;
  }
  var OPTS = {
    FILE_USE_INCLUDE_PATH : 1,
    FILE_TEXT             : 32,
    FILE_BINARY           : 64
  };
  if (typeof flags === 'number') {
    // Allow for a single string or an array of string flags
    flagNames = flags;
  } else {
    flags = [].concat(flags);
    for (i = 0; i < flags.length; i++) {
      if (OPTS[flags[i]]) {
        flagNames = flagNames | OPTS[flags[i]];
      }
    }
  }

  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) {
    // These flags shouldn't be together
    throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
  }

  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
    var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
    url = ini.include_path.local_value + slash + url;
  } else if (!/^(https?|file):/.test(url)) {
    // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
    href = this.window.location.href;
    pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
    url = href.slice(0, pathPos + 1) + url;
  }

  var http_options;
  if (context) {
    http_options = context.stream_options && context.stream_options.http;
    http_stream = !!http_options;
  }

  if (!context || !context.stream_options || http_stream) {
    var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }

    var method = http_stream ? http_options.method : 'GET';
    var async = !!(context && context.stream_params && context.stream_params['phpjs.async']);

    if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
      url += (url.match(/\?/) == null ? '?' : '&') + (new Date())
        .getTime(); // Give optional means of forcing bypass of cache
    }

    req.open(method, url, async);
    if (async) {
      var notification = context.stream_params.notification;
      if (typeof notification === 'function') {
        // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
        if (0 && req.addEventListener) {
          // Unimplemented so don't allow to get here
          /*
          req.addEventListener('progress', updateProgress, false);
          req.addEventListener('load', transferComplete, false);
          req.addEventListener('error', transferFailed, false);
          req.addEventListener('abort', transferCanceled, false);
          */
        } else {
          req.onreadystatechange = function(aEvt) {
            // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
            // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
            /*
  PHP Constants:
  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
  */
            var objContext = {
              responseText : req.responseText,
              responseXML  : req.responseXML,
              status       : req.status,
              statusText   : req.statusText,
              readyState   : req.readyState,
              evt          : aEvt
            }; // properties are not available in PHP, but offered on notification via 'this' for convenience
            // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
            // Need to add message, etc.
            var bytes_transferred;
            switch (req.readyState) {
            case 0:
              //     UNINITIALIZED     open() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 1:
              //     LOADING     send() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 2:
              //     LOADED     send() has been called, and headers and status are available.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 3:
              //     INTERACTIVE     Downloading; responseText holds partial data.
              // One character is two bytes
              bytes_transferred = req.responseText.length * 2;
              notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
              break;
            case 4:
              //     COMPLETED     The operation is complete.
              if (req.status >= 200 && req.status < 400) {
                // One character is two bytes
                bytes_transferred = req.responseText.length * 2;
                notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
              } else if (req.status === 403) {
                // Fix: These two are finished except for message
                notification.call(objContext, 10, 2, '', req.status, 0, 0);
              } else {
                // Errors
                notification.call(objContext, 9, 2, '', req.status, 0, 0);
              }
              break;
            default:
              throw 'Unrecognized ready state for file_get_contents()';
            }
          };
        }
      }
    }

    if (http_stream) {
      var sendHeaders = (http_options.header && http_options.header.split(/\r?\n/)) || [];
      var userAgentSent = false;
      for (i = 0; i < sendHeaders.length; i++) {
        var sendHeader = sendHeaders[i];
        var breakPos = sendHeader.search(/:\s*/);
        var sendHeaderName = sendHeader.substring(0, breakPos);
        req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
        if (sendHeaderName === 'User-Agent') {
          userAgentSent = true;
        }
      }
      if (!userAgentSent) {
        var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
        if (user_agent) {
          req.setRequestHeader('User-Agent', user_agent);
        }
      }
      content = http_options.content || null;
      /*
      // Presently unimplemented HTTP context options
      // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
      var request_fulluri = http_options.request_fulluri || false;
      // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
      var max_redirects = http_options.max_redirects || 20;
      // HTTP protocol version
      var protocol_version = http_options.protocol_version || 1.0;
      // Read timeout in seconds, specified by a float
      var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value);
      // Fetch the content even on failure status codes.
      var ignore_errors = http_options.ignore_errors || false;
      */
    }

    if (flagNames & OPTS.FILE_TEXT) {
      // Overrides how encoding is treated (regardless of what is returned from the server)
      var content_type = 'text/html';
      if (http_options && http_options['phpjs.override']) {
        // Fix: Could allow for non-HTTP as well
        // We use this, e.g., in gettext-related functions if character set
        content_type = http_options['phpjs.override'];
        //   overridden earlier by bind_textdomain_codeset()
      } else {
        var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) ||
          'UTF-8';
        if (http_options && http_options.header && (/^content-type:/im)
          .test(http_options.header)) {
          // We'll assume a content-type expects its own specified encoding if present
          // We let any header encoding stand
          content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1];
        }
        if (!(/;\s*charset=/)
          .test(content_type)) {
          // If no encoding
          content_type += '; charset=' + encoding;
        }
      }
      req.overrideMimeType(content_type);
    }
    // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
    //     most people will also want a way to have it be auto-converted into native JavaScript text instead
    else if (flagNames & OPTS.FILE_BINARY) {
      // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
      req.overrideMimeType('text/plain; charset=x-user-defined');
      // Getting an individual byte then requires:
      // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
      // responseText.charCodeAt(x) & 0xFF;
    }

    try {
      if (http_options && http_options['phpjs.sendAsBinary']) {
        // For content sent in a POST or PUT request (use with file_put_contents()?)
        // In Firefox, only available FF3+
        req.sendAsBinary(content);
      } else {
        req.send(content);
      }
    } catch (e) {
      // catches exception reported in issue #66
      return false;
    }

    tmp = req.getAllResponseHeaders();
    if (tmp) {
      tmp = tmp.split('\n');
      for (k = 0; k < tmp.length; k++) {
        if (func(tmp[k])) {
          newTmp.push(tmp[k]);
        }
      }
      tmp = newTmp;
      for (i = 0; i < tmp.length; i++) {
        headers[i] = tmp[i];
      }
      // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
      this.$http_response_header = headers;
    }

    if (offset || maxLen) {
      if (maxLen) {
        return req.responseText.substr(offset || 0, maxLen);
      }
      return req.responseText.substr(offset);
    }
    return req.responseText;
  }
  return false;
}function pathinfo(path, options) {
  //  discuss at: http://phpjs.org/functions/pathinfo/
  // original by: Nate
  //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Dmitry Gorelenkov
  //    input by: Timo
  //        note: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
  //        note: The way the bitwise arguments are handled allows for greater flexibility
  //        note: & compatability. We might even standardize this code and use a similar approach for
  //        note: other bitwise PHP functions
  //        note: php.js tries very hard to stay away from a core.js file with global dependencies, because we like
  //        note: that you can just take a couple of functions and be on your way.
  //        note: But by way we implemented this function, if you want you can still declare the PATHINFO_*
  //        note: yourself, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
  //        note: which makes it fully compliant with PHP syntax.
  //  depends on: basename
  //   example 1: pathinfo('/www/htdocs/index.html', 1);
  //   returns 1: '/www/htdocs'
  //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
  //   returns 2: 'index.html'
  //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
  //   returns 3: 'html'
  //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
  //   returns 4: 'index'
  //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
  //   returns 5: {basename: 'index.html', extension: 'html'}
  //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
  //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
  //   example 7: pathinfo('/www/htdocs/index.html');
  //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}

  var opt = '',
    real_opt = '',
    optName = '',
    optTemp = 0,
    tmp_arr = {},
    cnt = 0,
    i = 0;
  var have_basename = false,
    have_extension = false,
    have_filename = false;

  // Input defaulting & sanitation
  if (!path) {
    return false;
  }
  if (!options) {
    options = 'PATHINFO_ALL';
  }

  // Initialize binary arguments. Both the string & integer (constant) input is
  // allowed
  var OPTS = {
    'PATHINFO_DIRNAME'   : 1,
    'PATHINFO_BASENAME'  : 2,
    'PATHINFO_EXTENSION' : 4,
    'PATHINFO_FILENAME'  : 8,
    'PATHINFO_ALL'       : 0
  };
  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
  for (optName in OPTS) {
    if (OPTS.hasOwnProperty(optName)) {
      OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
    }
  }
  if (typeof options !== 'number') {
    // Allow for a single string or an array of string flags
    options = [].concat(options);
    for (i = 0; i < options.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[options[i]]) {
        optTemp = optTemp | OPTS[options[i]];
      }
    }
    options = optTemp;
  }

  // Internal Functions
  var __getExt = function(path) {
    var str = path + '';
    var dotP = str.lastIndexOf('.') + 1;
    return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
  };

  // Gather path infos
  if (options & OPTS.PATHINFO_DIRNAME) {
    var dirName = path.replace(/\\/g, '/')
      .replace(/\/[^\/]*\/?$/, ''); // dirname
    tmp_arr.dirname = dirName === path ? '.' : dirName;
  }

  if (options & OPTS.PATHINFO_BASENAME) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    tmp_arr.basename = have_basename;
  }

  if (options & OPTS.PATHINFO_EXTENSION) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    if (false === have_extension) {
      have_extension = __getExt(have_basename);
    }
    if (false !== have_extension) {
      tmp_arr.extension = have_extension;
    }
  }

  if (options & OPTS.PATHINFO_FILENAME) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    if (false === have_extension) {
      have_extension = __getExt(have_basename);
    }
    if (false === have_filename) {
      have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 :
        have_extension === false ? 0 : 1));
    }

    tmp_arr.filename = have_filename;
  }

  // If array contains only 1 element: return string
  cnt = 0;
  for (opt in tmp_arr) {
    if (tmp_arr.hasOwnProperty(opt)) {
      cnt++;
      real_opt = opt;
    }
  }
  if (cnt === 1) {
    return tmp_arr[real_opt];
  }

  // Return full-blown array
  return tmp_arr;
}function realpath(path) {
  //  discuss at: http://phpjs.org/functions/realpath/
  // original by: mk.keck
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //        note: Returned path is an url like e.g. 'http://yourhost.tld/path/'
  //   example 1: realpath('../.././_supporters/pj_test_supportfile_1.htm');
  //   returns 1: 'file:/home/kevin/code/_supporters/pj_test_supportfile_1.htm'

  var p = 0,
    arr = []; /* Save the root, if not given */
  var r = this.window.location.href; /* Avoid input failures */
  path = (path + '')
    .replace('\\', '/'); /* Check if there's a port in path (like 'http://') */
  if (path.indexOf('://') !== -1) {
    p = 1;
  } /* Ok, there's not a port in path, so let's take the root */
  if (!p) {
    path = r.substring(0, r.lastIndexOf('/') + 1) + path;
  } /* Explode the given path into it's parts */
  arr = path.split('/'); /* The path is an array now */
  path = []; /* Foreach part make a check */
  for (var k in arr) { /* This is'nt really interesting */
    if (arr[k] == '.') {
      continue;
    } /* This reduces the realpath */
    if (arr[k] == '..') {
      /* But only if there more than 3 parts in the path-array.
       * The first three parts are for the uri */
      if (path.length > 3) {
        path.pop();
      }
    } /* This adds parts to the realpath */
    else {
      /* But only if the part is not empty or the uri
       * (the first three parts ar needed) was not
       * saved */
      if ((path.length < 2) || (arr[k] !== '')) {
        path.push(arr[k]);
      }
    }
  } /* Returns the absloute path as a string */
  return path.join('/');
}function basename(path, suffix) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ash Searle (http://hexmen.com/blog/)
  // +   improved by: Lincoln Ramsay
  // +   improved by: djmix
  // *     example 1: basename('/www/site/home.htm', '.htm');
  // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  // *     returns 2: 'ecra.php?p=1'
  var b = path.replace(/^.*[\/\\]/g, '');

  if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
    b = b.substr(0, b.length - suffix.length);
  }

  return b;
}
function fclose(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fclose(handle);
  // *     returns 1: true
  if (!handle || handle.opener !== 'fopen') {
    return false;
  }

  try {
    delete this.php_js.resourceDataPointer[handle.id];
    delete this.php_js.resourceData[handle.id]; // Free up memory
  } catch (e) {
    return false;
  }
  return true;
}
function feof(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(handle, 1);
  // *     example 1: feof(handle);
  // *     returns 1: false

  if (!handle || !this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return true;
  }

  return !this.php_js.resourceData[handle.id][this.php_js.resourceDataPointer[handle.id]];

}
function fgetc(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetc(handle);
  // *     returns 1: '1'

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return false;
  }

  var start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  var length = 1; // 2 byte-character (or surrogate)
  this.php_js.resourceDataPointer[handle.id] += length;
  var chr = this.php_js.resourceData[handle.id].substr(start, length);

  // If don't want to treat surrogate pairs as single characters, can delete from here until the last line (return chr;)
  var nextChr = this.php_js.resourceData[handle.id].substr(start + 1, 1);
  var prevChr = start === 0 ? false : this.php_js.resourceData[handle.id].substr(start - 1, 1);
  var code = chr.charCodeAt(0);
  if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
    if (!nextChr) {
      throw 'High surrogate without following low surrogate (fgetc)';
    }
    var next = nextChr.charCodeAt(0);
    if (0xDC00 > next || next > 0xDFFF) {
      throw 'High surrogate without following low surrogate (fgetc)';
    }
    this.php_js.resourceDataPointer[handle.id] += length; // Need to increment counter again since grabbing next item
    return chr + nextChr;
  } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
    if (prevChr === false) {
      throw 'Low surrogate without preceding high surrogate (fgetc)';
    }
    var prev = prevChr.charCodeAt(0);
    if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
      throw 'Low surrogate without preceding high surrogate (fgetc)';
    }
    return prevChr + chr; // Probably shouldn't have reached here, at least if traversing by fgetc()
  }

  return chr;
}
function fgetcsv(handle, length, delimiter, enclosure, escape) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: str_getcsv
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetcsv(handle, 1);
  // *     returns 1: '<'

  var start = 0,
      fullline = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start) + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length; // Leaves the pointer one higher apparently than in fgets/fgetss
  return this.str_getcsv(this.php_js.resourceData[handle.id].substr(start, length), delimiter, enclosure, escape);
}
function fgets(handle, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgets(handle, 1);
  // *     returns 1: '<'

  var start = 0,
      fullline = '',
      endlinePos = -1,
      content = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  content = this.php_js.resourceData[handle.id].slice(start);

  endlinePos = content.search(/\r\n?|\n/) + start + 1;
  fullline = this.php_js.resourceData[handle.id].slice(start, endlinePos + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length;
  return this.php_js.resourceData[handle.id].substr(start, length);
}
function fgetss(handle, length, allowable_tags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: strip_tags
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetss(handle, 4096, 'a');
  // *     returns 1: ''

  var start = 0,
      fullline = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start) + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length - 1;
  return this.strip_tags(this.php_js.resourceData[handle.id].substr(start, length), allowable_tags);
}
function file(url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Legaev Andrey
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
  // *     example 1: file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: {0: '123'}
  var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  req.open('GET', url, false);
  req.send(null);

  return req.responseText.split('\n');
}
function file_exists(url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'
  var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  // HEAD Results are usually shorter (faster) than GET
  req.open('HEAD', url, false);
  req.send(null);
  if (req.status == 200) {
    return true;
  }

  return false;
}
function filemtime(file) {
  // +   original by: Ole Vrijenhoek (http://www.nervous.nl/)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: get_headers
  // %        note 1:  Looks for Last-Modified in response header.
  // *     example 1: filemtime('http://www.un.org');
  // *     returns 1: 1241532483

  var headers = {};
  headers = this.get_headers(file, 1);
  return (headers && headers['Last-Modified'] && Date.parse(headers['Last-Modified']) / 1000) || false;
}
function filesize(url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: T. Wild
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // *     example 1: filesize('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '3'
  var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  req.open('HEAD', url, false);
  req.send(null);

  if (!req.getResponseHeader) {
    try {
      throw new Error('No getResponseHeader!');
    } catch (e) {
      return false;
    }
  } else if (!req.getResponseHeader('Content-Length')) {
    try {
      throw new Error('No Content-Length!');
    } catch (e2) {
      return false;
    }
  } else {
    return req.getResponseHeader('Content-Length');
  }
}
function fopen(filename, mode, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Paul Smith
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     returns 1: 'Resource id #1'

  var resource = {},
      i = 0,
      that = this;
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  // BEGIN file inclusion: file_get_contents
  var file_get_contents = function(url) {
    var req = that.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }
    if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
      url = that.window.location.href + '/' + url;
    }
    req.open('GET', url, false);
    req.send(null);
    return req.responseText;
  };
  // END file inclusion

  if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) {
    // Not implemented yet: Search for file in include path too
  }
  if (context) {
    // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
  }

  for (i = 0; i < mode.length; i++) { // Have to deal with other flags if ever allow
    if (mode.charAt(i) === 'r' && (!mode.charAt(i + 1) || mode.charAt(i + 1) !== '+')) {
      continue;
    }
    switch (mode.charAt(i)) {
      case 'r':
      // must have '+' now
      case 'w':
      // or 'w+'
      case 'a':
      // or 'a+'
      case 'x':
        // or 'x+'
        throw 'Writing is not implemented';
      case 'b':
      case 't':
        throw 'Windows-only modes are not supported';
      default:
        throw 'Unrecognized file mode passed to ' + getFuncName(arguments.caller) + '()';
    }
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.resourceData = this.php_js.resourceData || {};
  this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
  this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
  // END REDUNDANT

  // BEGIN STATIC

  function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
    // See http://php.net/manual/en/resource.php for types
    this.type = type;
    this.id = id;
    this.opener = opener;
  }
  PHPJS_Resource.prototype.toString = function() {
    return 'Resource id #' + this.id;
  };
  PHPJS_Resource.prototype.get_resource_type = function() {
    return this.type;
  };
  PHPJS_Resource.prototype.var_dump = function() {
    return 'resource(' + this.id + ') of type (' + this.type + ')';
  };
  // END STATIC

  this.php_js.resourceIdCounter++;
  this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
  this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

  resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'fopen');
  resource.mode = mode; // Add file-specific attributes

  return resource; // may be 'file' instead of 'stream' type on some systems
}
function fpassthru(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fpassthru(handle);
  // *     returns 1: 3

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
    return false;
  }

  var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
  this.echo(chrs);
  this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length; // Place pointer at end
  return chrs;
}
function fread(handle, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(handle, 10);
  // *     returns 1: '123'

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return false;
  }

  length = length < 8192 ? (Math.floor(length / 2) || 1) : 4096; // 2 bytes per character (or surrogate) means limit of 8192 bytes = 4096 characters; ensure at least one

  var start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined) {
    return false; // Resource was already closed
  }

  if (!this.php_js.resourceData[handle.id][start]) {
    return ''; // already reached the end of the file (but pointer not closed)
  }

  this.php_js.resourceDataPointer[handle.id] += length;

  return this.php_js.resourceData[handle.id].substr(start, length); // Extra length won't be a problem here
}
function fscanf(handle, format) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: fgets
  // -    depends on: sscanf
  // *     example 1: var handle = fopen('http://example.com/names_and_professions.html', 'r');
  // *     example 1: fscanf(handle, '%s\t%s\t%s\n');
  // *     returns 1: ['robert', 'slacker', 'us']

  var mixed; // Could be an array or an integer

  mixed = this.sscanf.apply(this, [fgets(handle), format].concat(Array.prototype.slice.call(arguments, 2)));

  return mixed;
}
function fseek(handle, offset, whence) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fseek(h, 100);
  // *     returns 1: 0

  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return -1;
  }

  switch (whence) {
    case undefined:
    // fall-through
    case 'SEEK_SET':
      this.php_js.resourceDataPointer[handle.id] = offset / 2 + 1;
      break;
    case 'SEEK_CUR':
      this.php_js.resourceDataPointer[handle.id] += offset / 2 + 1;
      break;
    case 'SEEK_END':
      this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length + offset / 2 + 1;
      break;
    default:
      throw 'Unrecognized whence value for fseek()';
  }
  return 0;
}
function ftell(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(h, 100);
  // *     example 1: ftell(h);
  // *     returns 1: 99

  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }
  return this.php_js.resourceDataPointer[handle.id] * 2 - 1; // We're currently storing by character, so need to multiply by two; subtract one to appear like array pointer
}
function pclose(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: pclose(handle);
  // *     returns 1: true
  if (!handle || handle.opener !== 'popen') {
    return false;
  }

  try {
    delete this.php_js.resourceDataPointer[handle.id];
    delete this.php_js.resourceData[handle.id]; // Free up memory
  } catch (e) {
    return false;
  }
  return true;
}
function popen(filename, mode, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Paul Smith
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // *     example 1: popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     returns 1: 'Resource id #1'

  var resource = {},
      i = 0,
      that = this;
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  // BEGIN file inclusion: file_get_contents
  var file_get_contents = function(url) {
    var req = that.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }
    if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
      url = that.window.location.href + '/' + url;
    }
    req.open('GET', url, false);
    req.send(null);
    return req.responseText;
  };
  // END file inclusion

  if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) {
    // Not implemented yet: Search for file in include path too
  }
  if (context) {
    // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
  }

  for (i = 0; i < mode.length; i++) { // Have to deal with other flags if ever allow
    switch (mode.charAt(i)) {
      case 'r':
        if (!mode.charAt(i + 1) || mode.charAt(i + 1) !== '+') {
          break;
        }
      case 'w':
      // or 'w+'
      case 'a':
      // or 'a+'
      case 'x':
        // or 'x+'
        throw 'Writing is not implemented';
      case 'b':
      case 't':
        throw 'Windows-only modes are not supported';
      default:
        throw 'Unrecognized file mode passed to ' + getFuncName(arguments.caller) + '()';
    }
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.resourceData = this.php_js.resourceData || {};
  this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
  this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
  // END REDUNDANT

  // BEGIN STATIC

  function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
    // See http://php.net/manual/en/resource.php for types
    this.type = type;
    this.id = id;
    this.opener = opener;
  }
  PHPJS_Resource.prototype.toString = function() {
    return 'Resource id #' + this.id;
  };
  PHPJS_Resource.prototype.get_resource_type = function() {
    return this.type;
  };
  PHPJS_Resource.prototype.var_dump = function() {
    return 'resource(' + this.id + ') of type (' + this.type + ')';
  };
  // END STATIC

  this.php_js.resourceIdCounter++;

  this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
  this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

  resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'popen');
  resource.mode = mode; // Add file-specific attributes

  return resource; // may be 'file' instead of 'stream' type on some systems
}
function readfile(filename, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: echo
  // *     example 1: readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'

  var read_data = this.file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
  this.echo(read_data);
  return read_data;
}
function realpath(path) {
  // From: http://phpjs.org/functions
  // +   original by: mk.keck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: Returned path is an url like e.g. 'http://yourhost.tld/path/'
  // *     example 1: realpath('../.././_supporters/pj_test_supportfile_1.htm');
  // *     returns 1: 'file:/home/kevin/code/_supporters/pj_test_supportfile_1.htm'

  var p = 0;
  var arr = []; /* Save the root, if not given */
  var r = this.window.location.href; /* Avoid input failures */
  path = (path + '').replace('\\', '/'); /* Check if there's a port in path (like 'http://') */
  if (path.indexOf('://') !== -1) {
    p = 1;
  } /* Ok, there's not a port in path, so let's take the root */
  if (!p) {
    path = r.substring(0, r.lastIndexOf('/') + 1) + path;
  } /* Explode the given path into it's parts */
  arr = path.split('/'); /* The path is an array now */
  path = []; /* Foreach part make a check */
  for (var k in arr) { /* This is'nt really interesting */
    if (arr[k] == '.') {
      continue;
    } /* This reduces the realpath */
    if (arr[k] == '..') {
      /* But only if there more than 3 parts in the path-array.
       * The first three parts are for the uri */
      if (path.length > 3) {
        path.pop();
      }
    } /* This adds parts to the realpath */
    else {
      /* But only if the part is not empty or the uri
       * (the first three parts ar needed) was not
       * saved */
      if ((path.length < 2) || (arr[k] !== '')) {
        path.push(arr[k]);
      }
    }
  } /* Returns the absolute path as a string */

  return path.join('/');
}
function rewind(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(h, 100);
  // *     example 1: rewind(h);
  // *     returns 1: true

  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }
  this.php_js.resourceDataPointer[handle.id] = 0;
  return true;
}
