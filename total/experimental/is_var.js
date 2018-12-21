function get_defined_vars() {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Test case 1: If get_defined_vars can find itself in the defined vars, it worked :)
  // *     example 1: function test_in_array(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
  // *     example 1: funcs = get_defined_vars();
  // *     example 1: found = test_in_array(funcs, 'get_defined_vars');
  // *     results 1: found == true
  var i = '',
      arr = [],
      already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      } else if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    } catch (e) { // Problems accessing some properties in FF (e.g., sessionStorage)
      if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    }
  }

  return arr;
}
function get_resource_type(handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: get_resource_type('a');
  // *     returns 1: false
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }

  return handle.get_resource_type();
}
function import_request_variables(types, prefix) {
  // http://kevin.vanzonneveld.net
  // +      original by: Jalal Berrami
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: IMPORTANT: You must sanitize user variables passed in via URL in JavaScript as in PHP,
  // %          note 1: especially if you want to use any of these variables in an eval()-like function (not recommended)!
  // *        example 1: document.cookie = 'snack=yummy';
  // *        example 1: import_request_variables('gc', 'pr_');
  // *        results 1: pr_snack === 'yummy'
  // *        example 2: ini_set('phpjs.getVarsObj', $_GET = {}); // Only works in PHP.JS, not PHP (!), though by using ini_set(), it does work as though PHP.JS were an extension to PHP
  // *        example 2: import_request_variables('g'); // Allows $_GET.myRequestVar access to query string variables

  var i = 0,
      current = '',
      url = '',
      vars = '',
      arrayBracketPos = -1,
      arrName = '',
      win = this.window,
      requestObj = this.window,
      getObj = false,
      cookieObj = false;
  prefix = prefix || '';

  var that = this;
  var _ini_get = function(ini) {
    if (that.php_js && that.php_js.ini && that.php_js.ini[ini] && that.php_js.ini[ini].local_value) { // Allow designated object to be used instead of window
      return that.php_js.ini[ini].local_value;
    }
    return false;
  };

  requestObj = _ini_get('phpjs.requestVarsObj') || requestObj;
  if (/g/i.test(types)) { // GET
    getObj = _ini_get('phpjs.getVarsObj') || getObj;
    for (i = 0, url = win.location.href, vars = url.substring(url.lastIndexOf('?') + 1, url.length).split('&'); i < vars.length; i++) {
      current = vars[i].split('=');
      current[1] = decodeURIComponent(current[1]);
      arrayBracketPos = current[0].indexOf('[');
      if (arrayBracketPos !== -1) {
        arrName = current[0].substring(0, arrayBracketPos);
        arrName = decodeURIComponent(arrName);
        if (!requestObj[prefix + arrName]) {
          requestObj[prefix + arrName] = [];
        }
        requestObj[prefix + arrName].push(current[1] || null);
        if (getObj) {
          if (!getObj[prefix + arrName]) {
            getObj[prefix + arrName] = [];
          }
          getObj[prefix + arrName].push(current[1] || null);
        }
      } else {
        current[0] = decodeURIComponent(current[0]);
        requestObj[prefix + current[0]] = current[1] || null;
        if (getObj) {
          getObj[prefix + current[0]] = current[1] || null;
        }
      }
    }
  }
  if (/c/i.test(types)) { // COOKIE
    cookieObj = _ini_get('phpjs.cookieVarsObj') || cookieObj;
    for (i = 0, vars = win.document.cookie.split('&'); i < vars.length; i++) {
      current = vars[i].split('=');
      requestObj[prefix + current[0]] = current[1].split(';')[0] || null;
      if (cookieObj) {
        cookieObj[prefix + current[0]] = current[1].split(';')[0] || null;
      }
    }
  }
}
function print_r(array, return_val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // +   improved by: Ben Bryan
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: echo
  // *     example 1: print_r(1, true);
  // *     returns 1: 1

  var output = '',
      pad_char = ' ',
      pad_val = 4,
      d = this.window.document,
      getFuncName = function(fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
          return '(Anonymous)';
        }
        return name[1];
      };
      repeat_char = function(len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
          str += pad_char;
        }
        return str;
      };
      formatArray = function(obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
          cur_depth++;
        }

        var base_pad = repeat_char(pad_val * cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';

        if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
          str += 'Array\n' + base_pad + '(\n';
          for (var key in obj) {
            if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
              str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
            }
            else {
              str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
            }
          }
          str += base_pad + ')\n';
        }
        else if (obj === null || obj === undefined) {
          str = '';
        }
        else { // for our "resource" class
          str = obj.toString();
        }

        return str;
      };

  output = formatArray(array, 0, pad_val, pad_char);

  if (return_val !== true) {
    if (d.body) {
      this.echo(output);
    }
    else {
      try {
        d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
        this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
      } catch (e) {
        this.echo(output); // Outputting as plain text may work in some plain XML
      }
    }
    return true;
  }
  return output;
}
function unset() {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var arr = ['a', 'b', 'c'];
  // *     example 1: unset('arr[1]');
  // *     returns 1: undefined

  // Must pass in a STRING to indicate the variable, not the variable itself (whether or not that evaluates to a string)
  // Works only on globals
  var i = 0, arg = '', win = '', winRef = /^(?:this)?window[.[]/, arr = [], accessor = '', bracket = /\[['"]?(\d+)['"]?\]$/;
  for (i = 0; i < arguments.length; i++) {
    arg = arguments[i];
    winRef.lastIndex = 0, bracket.lastIndex = 0;
    win = winRef.test(arg) ? '' : 'this.window.';
    if (bracket.test(arg)) {
      accessor = arg.match(bracket)[1];
      arr = eval(win + arg.replace(bracket, ''));
      arr.splice(accessor, 1); // We remove from the array entirely, rather than leaving a gap
    }
    else {
      eval('delete ' + win + arg);
    }
  }
}
