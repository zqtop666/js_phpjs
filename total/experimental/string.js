function fprintf(handle, format) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir
  // -    depends on: sprintf
  // -    depends on: fwrite
  // *     example 1: var fp = fopen('currency.txt', 'w');
  // *     example 1: fprintf(fp, '%01.2f', 123.1); // 123.10
  // *     returns 1: 6

  var str = this.sprintf.apply(this, Array.prototype.slice.call(arguments, 1));
  try {
    this.fwrite(handle, str);
  }
  catch (e) {
    throw new Error('Error in fprintf() file-writing');
  }
  return str.length;
}
function hebrev (hebrew_text, max_chars_per_line) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: max_chars_per_line is not supported and this is only a rough approximation of the function behavior
    // *     example 1: hebrev('\u05d0\n\u05ea');
    // *     returns 1: '\u05ea\n\u05d0'

    // max_chars_per_line = max_chars_per_line || 0;
    if (typeof hebrew_text === 'undefined') {
        return null;
    }
    else if (hebrew_text === null) {
        return false;
    }

    return hebrew_text.replace(/[\u05d0-\u05ea \t\n\r!#$%&’()*+,\-./:;<=>\\?@\[\]^_‘{|}~]*/, // hebrew, space, tab, newline, carriage return, punct // [\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]
        function (n0) {
            for (var i = n0.length - 1, output = ''; i >= 0; i--) {
                var c = n0.charAt(i);
                switch (c) {
                    case '(':
                        c = ')';
                        break;
                    case ')':
                        c = '(';
                        break;
                    case '[':
                        c = ']';
                        break;
                    case ']':
                        c = '[';
                        break;
                    case '{':
                        c = '}';
                        break;
                    case '}':
                        c = '{';
                        break;
                    case '<':
                        c = '>';
                        break;
                    case '>':
                        c = '<';
                        break;
                    case '\\':
                        c = '/';
                        break;
                    case '/':
                        c = '\\';
                        break;
                    default:
                        break;
                }
                output += c;
            }
            return output;
        }
    );
}
function hebrevc (hebrew_text, max_chars_per_line) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: max_chars_per_line is not supported and this is only a rough approximation of the function behavior
    // *     example 1: hebrevc('\u05d0\n\u05ea');
    // *     returns 1: '\u05ea<br />\n\u05d0'

    // max_chars_per_line = max_chars_per_line || 0;
    if (typeof hebrew_text === 'undefined') {
        return null;
    }
    else if (hebrew_text === null) {
        return false;
    }

    return hebrew_text.replace(/[\u05d0-\u05ea \t\n\r!#$%&’()*+,\-./:;<=>\\?@\[\]^_‘{|}~]*/, // hebrew, space, tab, newline, carriage return, punct // [\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]
        function (n0) {
            for (var i = n0.length - 1, output = ''; i >= 0; i--) {
                var c = n0.charAt(i);
                switch (c) {
                    case '\n': // One line different from hebrev
                        c = '<br />\n';
                        break;
                    case '(':
                        c = ')';
                        break;
                    case ')':
                        c = '(';
                        break;
                    case '[':
                        c = ']';
                        break;
                    case ']':
                        c = '[';
                        break;
                    case '{':
                        c = '}';
                        break;
                    case '}':
                        c = '{';
                        break;
                    case '<':
                        c = '>';
                        break;
                    case '>':
                        c = '<';
                        break;
                    case '\\':
                        c = '/';
                        break;
                    case '/':
                        c = '\\';
                        break;
                    default:
                        break;
                }
                output += c;
            }
            return output;
        }
    );
}
function print(arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Implemented correctly, but causes a problem for the phpjs.org compiler
  // -    depends on: echo
  // *     example 1: print('Hello World');
  // *     returns 1: 1

  this.echo(arg);
  return 1;
}
function vfprintf(handle, format, args) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir
  // -    depends on: sprintf
  // -    depends on: fwrite
  // *     example 1: var fp = fopen('currency.txt', 'w');
  // *     example 1: vfprintf(fp, '%01.2f', [123.1]); // 123.10
  // *     returns 1: 6


  var str = this.sprintf.apply(this, [].concat(format, args));
  try {
    this.fwrite(handle, str);
  }
  catch (e) {
    throw new Error('Error in vfprintf() file-writing');
  }
  return str.length;
}
