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
}