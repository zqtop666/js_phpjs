function abs(mixed_number) {
  //  discuss at: http://phpjs.org/functions/abs/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  // improved by: Karol Kowalski
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //   example 1: abs(4.2);
  //   returns 1: 4.2
  //   example 2: abs(-4.2);
  //   returns 2: 4.2
  //   example 3: abs(-5);
  //   returns 3: 5
  //   example 4: abs('_argos');
  //   returns 4: 0

  return Math.abs(mixed_number) || 0;
}function acos(arg) {
  //  discuss at: http://phpjs.org/functions/acos/
  // original by: Onno Marsman
  //        note: Sorry about the crippled test. Needed because precision differs accross platforms.
  //   example 1: (acos(0.3) + '').substr(0, 17);
  //   returns 1: "1.266103672779499"

  return Math.acos(arg);
}function acosh(arg) {
  //  discuss at: http://phpjs.org/functions/acosh/
  // original by: Onno Marsman
  //   example 1: acosh(8723321.4);
  //   returns 1: 16.674657798418625

  return Math.log(arg + Math.sqrt(arg * arg - 1));
}function asin(arg) {
  //  discuss at: http://phpjs.org/functions/asin/
  // original by: Onno Marsman
  //        note: Sorry about the crippled test. Needed because precision differs accross platforms.
  //   example 1: (asin(0.3) + '').substr(0, 17);
  //   returns 1: "0.304692654015397"

  return Math.asin(arg);
}function asinh(arg) {
  //  discuss at: http://phpjs.org/functions/asinh/
  // original by: Onno Marsman
  //   example 1: asinh(8723321.4);
  //   returns 1: 16.67465779841863

  return Math.log(arg + Math.sqrt(arg * arg + 1));
}function atan(arg) {
  //  discuss at: http://phpjs.org/functions/atan/
  // original by: Onno Marsman
  //   example 1: atan(8723321.4);
  //   returns 1: 1.5707962121596615

  return Math.atan(arg);
}function atan2(y, x) {
  //  discuss at: http://phpjs.org/functions/atan2/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: atan2(1, 1);
  //   returns 1: 0.7853981633974483

  return Math.atan2(y, x);
}function atanh(arg) {
  //  discuss at: http://phpjs.org/functions/atanh/
  // original by: Onno Marsman
  //   example 1: atanh(0.3);
  //   returns 1: 0.3095196042031118

  return 0.5 * Math.log((1 + arg) / (1 - arg));
}function base_convert(number, frombase, tobase) {
  //  discuss at: http://phpjs.org/functions/base_convert/
  // original by: Philippe Baumann
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //   example 1: base_convert('A37334', 16, 2);
  //   returns 1: '101000110111001100110100'

  return parseInt(number + '', frombase | 0)
    .toString(tobase | 0);
}function bindec(binary_string) {
  //  discuss at: http://phpjs.org/functions/bindec/
  // original by: Philippe Baumann
  //   example 1: bindec('110011');
  //   returns 1: 51
  //   example 2: bindec('000110011');
  //   returns 2: 51
  //   example 3: bindec('111');
  //   returns 3: 7

  binary_string = (binary_string + '')
    .replace(/[^01]/gi, '');
  return parseInt(binary_string, 2);
}function ceil(value) {
  //  discuss at: http://phpjs.org/functions/ceil/
  // original by: Onno Marsman
  //   example 1: ceil(8723321.4);
  //   returns 1: 8723322

  return Math.ceil(value);
}function cos(arg) {
  //  discuss at: http://phpjs.org/functions/cos/
  // original by: Onno Marsman
  //   example 1: Math.ceil(cos(8723321.4) * 10000000);
  //   returns 1: -1812718

  return Math.cos(arg);
}function cosh(arg) {
  //  discuss at: http://phpjs.org/functions/cosh/
  // original by: Onno Marsman
  //   example 1: cosh(-0.18127180117607017);
  //   returns 1: 1.0164747716114113

  return (Math.exp(arg) + Math.exp(-arg)) / 2;
}function decbin(number) {
  //  discuss at: http://phpjs.org/functions/decbin/
  // original by: Enrique Gonzalez
  // bugfixed by: Onno Marsman
  // improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  //    input by: pilus
  //    input by: nord_ua
  //   example 1: decbin(12);
  //   returns 1: '1100'
  //   example 2: decbin(26);
  //   returns 2: '11010'
  //   example 3: decbin('26');
  //   returns 3: '11010'

  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10)
    .toString(2);
}function dechex(number) {
  //  discuss at: http://phpjs.org/functions/dechex/
  // original by: Philippe Baumann
  // bugfixed by: Onno Marsman
  // improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  //    input by: pilus
  //   example 1: dechex(10);
  //   returns 1: 'a'
  //   example 2: dechex(47);
  //   returns 2: '2f'
  //   example 3: dechex(-1415723993);
  //   returns 3: 'ab9dc427'

  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10)
    .toString(16);
}function decoct(number) {
  //  discuss at: http://phpjs.org/functions/decoct/
  // original by: Enrique Gonzalez
  // bugfixed by: Onno Marsman
  // improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  //    input by: pilus
  //   example 1: decoct(15);
  //   returns 1: '17'
  //   example 2: decoct(264);
  //   returns 2: '410'

  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10)
    .toString(8);
}function deg2rad(angle) {
  //  discuss at: http://phpjs.org/functions/deg2rad/
  // original by: Enrique Gonzalez
  // improved by: Thomas Grainger (http://graingert.co.uk)
  //   example 1: deg2rad(45);
  //   returns 1: 0.7853981633974483

  return angle * .017453292519943295; // (angle / 180) * Math.PI;
}function exp(arg) {
  //  discuss at: http://phpjs.org/functions/exp/
  // original by: Onno Marsman
  //   example 1: exp(0.3);
  //   returns 1: 1.3498588075760032

  return Math.exp(arg);
}function expm1(x) {
  //  discuss at: http://phpjs.org/functions/expm1/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Robert Eisele (http://www.xarg.org/)
  //        note: Precision 'n' can be adjusted as desired
  //   example 1: expm1(1e-15);
  //   returns 1: 1.0000000000000007e-15

  return (x < 1e-5 && -1e-5 < x) ? x + 0.5 * x * x : Math.exp(x) - 1;
}function floor(value) {
  //  discuss at: http://phpjs.org/functions/floor/
  // original by: Onno Marsman
  //   example 1: floor(8723321.4);
  //   returns 1: 8723321

  return Math.floor(value);
}function fmod(x, y) {
  //  discuss at: http://phpjs.org/functions/fmod/
  // original by: Onno Marsman
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: fmod(5.7, 1.3);
  //   returns 1: 0.5

  var tmp, tmp2, p = 0,
    pY = 0,
    l = 0.0,
    l2 = 0.0;

  tmp = x.toExponential()
    .match(/^.\.?(.*)e(.+)$/);
  p = parseInt(tmp[2], 10) - (tmp[1] + '')
    .length;
  tmp = y.toExponential()
    .match(/^.\.?(.*)e(.+)$/);
  pY = parseInt(tmp[2], 10) - (tmp[1] + '')
    .length;

  if (pY > p) {
    p = pY;
  }

  tmp2 = (x % y);

  if (p < -100 || p > 20) {
    // toFixed will give an out of bound error so we fix it like this:
    l = Math.round(Math.log(tmp2) / Math.log(10));
    l2 = Math.pow(10, l);

    return (tmp2 / l2)
      .toFixed(l - p) * l2;
  } else {
    return parseFloat(tmp2.toFixed(-p));
  }
}function getrandmax() {
  //  discuss at: http://phpjs.org/functions/getrandmax/
  // original by: Onno Marsman
  //   example 1: getrandmax();
  //   returns 1: 2147483647

  return 2147483647;
}function hexdec(hex_string) {
  //  discuss at: http://phpjs.org/functions/hexdec/
  // original by: Philippe Baumann
  //   example 1: hexdec('that');
  //   returns 1: 10
  //   example 2: hexdec('a0');
  //   returns 2: 160

  hex_string = (hex_string + '')
    .replace(/[^a-f0-9]/gi, '');
  return parseInt(hex_string, 16);
}function hypot(x, y) {
  //  discuss at: http://phpjs.org/functions/hypot/
  // original by: Onno Marsman
  // imprived by: Robert Eisele (http://www.xarg.org/)
  //   example 1: hypot(3, 4);
  //   returns 1: 5
  //   example 2: hypot([], 'a');
  //   returns 2: null

  x = Math.abs(x);
  y = Math.abs(y);

  var t = Math.min(x, y);
  x = Math.max(x, y);
  t = t / x;

  return x * Math.sqrt(1 + t * t) || null;
}function is_finite(val) {
  //  discuss at: http://phpjs.org/functions/is_finite/
  // original by: Onno Marsman
  //   example 1: is_finite(Infinity);
  //   returns 1: false
  //   example 2: is_finite(-Infinity);
  //   returns 2: false
  //   example 3: is_finite(0);
  //   returns 3: true

  var warningType = '';

  if (val === Infinity || val === -Infinity) {
    return false;
  }

  //Some warnings for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_finite() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return true;
}function is_infinite(val) {
  //  discuss at: http://phpjs.org/functions/is_infinite/
  // original by: Onno Marsman
  //   example 1: is_infinite(Infinity);
  //   returns 1: true
  //   example 2: is_infinite(-Infinity);
  //   returns 2: true
  //   example 3: is_infinite(0);
  //   returns 3: false

  var warningType = '';

  if (val === Infinity || val === -Infinity) {
    return true;
  }

  //Some warnings for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_infinite() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return false;
}function is_nan(val) {
  //  discuss at: http://phpjs.org/functions/is_nan/
  // original by: Onno Marsman
  //    input by: Robin
  //   example 1: is_nan(NaN);
  //   returns 1: true
  //   example 2: is_nan(0);
  //   returns 2: false

  var warningType = '';

  if (typeof val === 'number' && isNaN(val)) {
    return true;
  }

  //Some errors for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_nan() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return false;
}function lcg_value() {
  //  discuss at: http://phpjs.org/functions/lcg_value/
  // original by: Onno Marsman
  //        test: skip
  //   example 1: lcg_value()
  //   returns 1: 1

  return Math.random();
}function log(arg, base) {
  //  discuss at: http://phpjs.org/functions/log/
  // original by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: log(8723321.4, 7);
  //   returns 1: 8.212871815082147

  return (typeof base === 'undefined') ?
    Math.log(arg) :
    Math.log(arg) / Math.log(base);
}function log1p(x) {
  //  discuss at: http://phpjs.org/functions/log1p/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Robert Eisele (http://www.xarg.org/)
  //        note: Precision 'n' can be adjusted as desired
  //   example 1: log1p(1e-15);
  //   returns 1: 9.999999999999995e-16

  var ret = 0,
    // degree of precision
    n = 50;
  if (x <= -1) {
    // JavaScript style would be to return Number.NEGATIVE_INFINITY
    return '-INF';
  }
  if (x < 0 || x > 1) {
    return Math.log(1 + x);
  }
  for (var i = 1; i < n; i++) {
    ret += Math.pow(-x, i) / i;
  }
  return -ret;
}function log10(arg) {
  //  discuss at: http://phpjs.org/functions/log10/
  // original by: Philip Peterson
  // improved by: Onno Marsman
  // improved by: Tod Gentille
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: log10(10);
  //   returns 1: 1
  //   example 2: log10(1);
  //   returns 2: 0

  return Math.log(arg) / 2.302585092994046; // Math.LN10
}function max() {
  //  discuss at: http://phpjs.org/functions/max/
  // original by: Onno Marsman
  //  revised by: Onno Marsman
  // improved by: Jack
  //        note: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: max(1, 3, 5, 6, 7);
  //   returns 1: 7
  //   example 2: max([2, 4, 5]);
  //   returns 2: 5
  //   example 3: max(0, 'hello');
  //   returns 3: 0
  //   example 4: max('hello', 0);
  //   returns 4: 'hello'
  //   example 5: max(-1, 'hello');
  //   returns 5: 'hello'
  //   example 6: max([2, 4, 8], [2, 5, 7]);
  //   returns 6: [2, 5, 7]

  var ar, retVal, i = 0,
    n = 0,
    argv = arguments,
    argc = argv.length,
    _obj2Array = function(obj) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
      } else {
        var ar = [];
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            ar.push(obj[i]);
          }
        }
        return ar;
      }
    }, //function _obj2Array
    _compare = function(current, next) {
      var i = 0,
        n = 0,
        tmp = 0,
        nl = 0,
        cl = 0;

      if (current === next) {
        return 0;
      } else if (typeof current === 'object') {
        if (typeof next === 'object') {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          } else if (nl < cl) {
            return -1;
          }
          for (i = 0, n = cl; i < n; ++i) {
            tmp = _compare(current[i], next[i]);
            if (tmp == 1) {
              return 1;
            } else if (tmp == -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      } else if (typeof next === 'object') {
        return 1;
      } else if (isNaN(next) && !isNaN(current)) {
        if (current == 0) {
          return 0;
        }
        return (current < 0 ? 1 : -1);
      } else if (isNaN(current) && !isNaN(next)) {
        if (next == 0) {
          return 0;
        }
        return (next > 0 ? 1 : -1);
      }

      if (next == current) {
        return 0;
      }
      return (next > current ? 1 : -1);
    }; //function _compare
  if (argc === 0) {
    throw new Error('At least one value should be passed to max()');
  } else if (argc === 1) {
    if (typeof argv[0] === 'object') {
      ar = _obj2Array(argv[0]);
    } else {
      throw new Error('Wrong parameter count for max()');
    }
    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for max()');
    }
  } else {
    ar = argv;
  }

  retVal = ar[0];
  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) == 1) {
      retVal = ar[i];
    }
  }

  return retVal;
}function min() {
  //  discuss at: http://phpjs.org/functions/min/
  // original by: Onno Marsman
  //  revised by: Onno Marsman
  // improved by: Jack
  //        note: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: min(1, 3, 5, 6, 7);
  //   returns 1: 1
  //   example 2: min([2, 4, 5]);
  //   returns 2: 2
  //   example 3: min(0, 'hello');
  //   returns 3: 0
  //   example 4: min('hello', 0);
  //   returns 4: 'hello'
  //   example 5: min(-1, 'hello');
  //   returns 5: -1
  //   example 6: min([2, 4, 8], [2, 5, 7]);
  //   returns 6: [2, 4, 8]

  var ar, retVal, i = 0,
    n = 0,
    argv = arguments,
    argc = argv.length,
    _obj2Array = function(obj) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
      }
      var ar = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          ar.push(obj[i]);
        }
      }
      return ar;
    }, //function _obj2Array
    _compare = function(current, next) {
      var i = 0,
        n = 0,
        tmp = 0,
        nl = 0,
        cl = 0;

      if (current === next) {
        return 0;
      } else if (typeof current === 'object') {
        if (typeof next === 'object') {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          } else if (nl < cl) {
            return -1;
          }
          for (i = 0, n = cl; i < n; ++i) {
            tmp = _compare(current[i], next[i]);
            if (tmp == 1) {
              return 1;
            } else if (tmp == -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      } else if (typeof next === 'object') {
        return 1;
      } else if (isNaN(next) && !isNaN(current)) {
        if (current == 0) {
          return 0;
        }
        return (current < 0 ? 1 : -1);
      } else if (isNaN(current) && !isNaN(next)) {
        if (next == 0) {
          return 0;
        }
        return (next > 0 ? 1 : -1);
      }

      if (next == current) {
        return 0;
      }
      return (next > current ? 1 : -1);
    }; //function _compare

  if (argc === 0) {
    throw new Error('At least one value should be passed to min()');
  } else if (argc === 1) {
    if (typeof argv[0] === 'object') {
      ar = _obj2Array(argv[0]);
    } else {
      throw new Error('Wrong parameter count for min()');
    }

    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for min()');
    }
  } else {
    ar = argv;
  }

  retVal = ar[0];

  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) == -1) {
      retVal = ar[i];
    }
  }

  return retVal;
}function mt_getrandmax() {
  //  discuss at: http://phpjs.org/functions/mt_getrandmax/
  // original by: Onno Marsman
  //   example 1: mt_getrandmax();
  //   returns 1: 2147483647

  return 2147483647;
}function mt_rand(min, max) {
  //  discuss at: http://phpjs.org/functions/mt_rand/
  // original by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: Kongo
  //   example 1: mt_rand(1, 1);
  //   returns 1: 1

  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
  } else {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}function octdec(oct_string) {
  //  discuss at: http://phpjs.org/functions/octdec/
  // original by: Philippe Baumann
  //   example 1: octdec('77');
  //   returns 1: 63

  oct_string = (oct_string + '')
    .replace(/[^0-7]/gi, '');
  return parseInt(oct_string, 8);
}function pi() {
  //  discuss at: http://phpjs.org/functions/pi/
  // original by: Onno Marsman
  // improved by: dude
  //   example 1: pi(8723321.4);
  //   returns 1: 3.141592653589793

  return 3.141592653589793; // Math.PI
}function pow(base, exp) {
  //  discuss at: http://phpjs.org/functions/pow/
  // original by: Onno Marsman
  //   example 1: pow(8723321.4, 7);
  //   returns 1: 3.8439091680778995e+48

  return Math.pow(base, exp);
}function rad2deg(angle) {
  //  discuss at: http://phpjs.org/functions/rad2deg/
  // original by: Enrique Gonzalez
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rad2deg(3.141592653589793);
  //   returns 1: 180

  return angle * 57.29577951308232; // angle / Math.PI * 180
}function rand(min, max) {
  //  discuss at: http://phpjs.org/functions/rand/
  // original by: Leslie Hoare
  // bugfixed by: Onno Marsman
  //        note: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
  //   example 1: rand(1, 1);
  //   returns 1: 1

  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;

  /*
  // See note above for an explanation of the following alternative code

  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: srand
  // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
  // 0x7fffffff
  var rand_seed, ctx, PHP_RAND_MAX=2147483647;

  if (!this.php_js || this.php_js.rand_seed === undefined) {
    this.srand();
  }
  rand_seed = this.php_js.rand_seed;

  var argc = arguments.length;
  if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }

  var do_rand = function (ctx) {
    return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
  };

  var php_rand = function (ctxArg) {
   // php_rand_r
    this.php_js.rand_seed = do_rand(ctxArg);
    return parseInt(this.php_js.rand_seed, 10);
  };

  var number = php_rand(rand_seed);

  if (argc === 2) {
    number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
  }
  return number;
  */
}function round(value, precision, mode) {
  //  discuss at: http://phpjs.org/functions/round/
  // original by: Philip Peterson
  //  revised by: Onno Marsman
  //  revised by: T.Wild
  //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  //    input by: Greenseed
  //    input by: meo
  //    input by: William
  //    input by: Josep Sanz (http://www.ws3.es/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //        note: Great work. Ideas for improvement:
  //        note: - code more compliant with developer guidelines
  //        note: - for implementing PHP constant arguments look at
  //        note: the pathinfo() function, it offers the greatest
  //        note: flexibility & compatibility possible
  //   example 1: round(1241757, -3);
  //   returns 1: 1242000
  //   example 2: round(3.6);
  //   returns 2: 4
  //   example 3: round(2.835, 2);
  //   returns 3: 2.84
  //   example 4: round(1.1749999999999, 2);
  //   returns 4: 1.17
  //   example 5: round(58551.799999999996, 2);
  //   returns 5: 58551.8

  var m, f, isHalf, sgn; // helper variables
  // making sure precision is integer
  precision |= 0;
  m = Math.pow(10, precision);
  value *= m;
  // sign of the number
  sgn = (value > 0) | -(value < 0);
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      // rounds .5 toward zero
      value = f + (sgn < 0);
      break;
    case 'PHP_ROUND_HALF_EVEN':
      // rouds .5 towards the next even integer
      value = f + (f % 2 * sgn);
      break;
    case 'PHP_ROUND_HALF_ODD':
      // rounds .5 towards the next odd integer
      value = f + !(f % 2);
      break;
    default:
      // rounds .5 away from zero
      value = f + (sgn > 0);
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}function sin(arg) {
  //  discuss at: http://phpjs.org/functions/sin/
  // original by: Onno Marsman
  //   example 1: Math.ceil(sin(8723321.4) * 10000000);
  //   returns 1: -9834330

  return Math.sin(arg);
}function sinh(arg) {
  //  discuss at: http://phpjs.org/functions/sinh/
  // original by: Onno Marsman
  //   example 1: sinh(-0.9834330348825909);
  //   returns 1: -1.1497971402636502

  return (Math.exp(arg) - Math.exp(-arg)) / 2;
}function sqrt(arg) {
  //  discuss at: http://phpjs.org/functions/sqrt/
  // original by: Onno Marsman
  //   example 1: sqrt(8723321.4);
  //   returns 1: 2953.5269424875746

  return Math.sqrt(arg);
}function tan(arg) {
  //  discuss at: http://phpjs.org/functions/tan/
  // original by: Onno Marsman
  //   example 1: Math.ceil(tan(8723321.4) * 10000000);
  //   returns 1: 54251849

  return Math.tan(arg);
}function tanh(arg) {
  //  discuss at: http://phpjs.org/functions/tanh/
  // original by: Onno Marsman
  // imprived by: Robert Eisele (http://www.xarg.org/)
  //   example 1: tanh(5.4251848798444815);
  //   returns 1: 0.9999612058841574

  return 1 - 2 / (Math.exp(2 * arg) + 1);
}function srand(seed) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: gettimeofday
  // -    depends on: time
  // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
  // %          note 2: In order for this to work, the commented out portion in rand() must be used instead of the default JS-based implementation
  // *     example 1: srand(13450);
  // *     returns 1: undefined
  // *     example 2: srand();
  // *     returns 2: undefined

  var s1, s2, that = this;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  // php_srand
  var lcg_seed = function() {
    try {
      var tv = that.gettimeofday();
      s1 = tv.sec ^ (~tv.usec);
    }
    catch (e) {
      s1 = 1;
    }
    s2 = Math.random(); // instead of tsrm_thread_id() or getpid()
    this.php_js.seeded = 1;
  };

  var MODMULT = function(a, b, c, m, s) {
    var q = s / a;
    s = b * (s - a * q) - c * q;
    if (s < 0) {
      s += m;
    }
    return s;
  };
  var php_combined_lcg = function() {
    if (!this.php_js.seeded) {
      lcg_seed(); // should only be run once
    }
    s1 = MODMULT(53668, 40014, 12211, 2147483563, s1);
    s2 = MODMULT(52774, 40692, 3791, 2147483399, s2);

    var z = s1 - s2;
    if (z < 1) {
      z += 2147483562;
    }
    return z * 4.656613e-10;
  };
  this.php_js.rand_seed = seed ||
      (parseInt(this.time() * Math.random(), 10) ^ parseInt(1000000.0 * php_combined_lcg(), 10)); // php_rand.h: GENERATE_SEED(); using Math.random() instead of getpid
}
