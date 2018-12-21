function basename(path, suffix) {
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
