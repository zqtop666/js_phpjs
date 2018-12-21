function doubleval(mixed_var) {
  //  discuss at: http://phpjs.org/functions/doubleval/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: floatval
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: doubleval(186);
  //   returns 1: 186.00

  return this.floatval(mixed_var);
}function empty(mixed_var) {
  //  discuss at: http://phpjs.org/functions/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman
  //    input by: LH
  //    input by: Stoyan Kyosev (http://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafal Kukawski
  //   example 1: empty(null);
  //   returns 1: true
  //   example 2: empty(undefined);
  //   returns 2: true
  //   example 3: empty([]);
  //   returns 3: true
  //   example 4: empty({});
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } });
  //   returns 5: false

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === 'object') {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}function floatval(mixed_var) {
  //  discuss at: http://phpjs.org/functions/floatval/
  // original by: Michael White (http://getsprink.com)
  //        note: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
  //   example 1: floatval('150.03_page-section');
  //   returns 1: 150.03
  //   example 2: floatval('page: 3');
  //   example 2: floatval('-50 + 8');
  //   returns 2: 0
  //   returns 2: -50

  return (parseFloat(mixed_var) || 0);
}function gettype(mixed_var) {
  //  discuss at: http://phpjs.org/functions/gettype/
  // original by: Paulo Freitas
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Douglas Crockford (http://javascript.crockford.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: KELAN
  //  depends on: is_float
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: gettype(1);
  //   returns 1: 'integer'
  //   example 2: gettype(undefined);
  //   returns 2: 'undefined'
  //   example 3: gettype({0: 'Kevin van Zonneveld'});
  //   returns 3: 'object'
  //   example 4: gettype('foo');
  //   returns 4: 'string'
  //   example 5: gettype({0: function () {return false;}});
  //   returns 5: 'object'
  //   example 6: gettype({0: 'test', length: 1, splice: function () {}});
  //   example 6: gettype(['test']);
  //   returns 6: 'object'
  //   returns 6: 'array'

  var s = typeof mixed_var,
    name;
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (s === 'object') {
    if (mixed_var !== null) {
      // From: http://javascript.crockford.com/remedial.html
      if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var
        .splice === 'function') {
        s = 'array';
      } else if (mixed_var.constructor && getFuncName(mixed_var.constructor)) {
        name = getFuncName(mixed_var.constructor);
        if (name === 'Date') {
          // not in PHP
          s = 'date';
        } else if (name === 'RegExp') {
          // not in PHP
          s = 'regexp';
        } else if (name === 'PHPJS_Resource') {
          // Check against our own resource constructor
          s = 'resource';
        }
      }
    } else {
      s = 'null';
    }
  } else if (s === 'number') {
    s = this.is_float(mixed_var) ? 'double' : 'integer';
  }
  return s;
}function intval(mixed_var, base) {
  //  discuss at: http://phpjs.org/functions/intval/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: stensi
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Rafał Kukawski (http://kukawski.pl)
  //    input by: Matteo
  //   example 1: intval('Kevin van Zonneveld');
  //   returns 1: 0
  //   example 2: intval(4.2);
  //   returns 2: 4
  //   example 3: intval(42, 8);
  //   returns 3: 42
  //   example 4: intval('09');
  //   returns 4: 9
  //   example 5: intval('1e', 16);
  //   returns 5: 30

  var tmp;

  var type = typeof mixed_var;

  if (type === 'boolean') {
    return +mixed_var;
  } else if (type === 'string') {
    tmp = parseInt(mixed_var, base || 10);
    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
  } else if (type === 'number' && isFinite(mixed_var)) {
    return mixed_var | 0;
  } else {
    return 0;
  }
}function is_array(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_array/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Legaev Andrey
  // improved by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Nathan Sepulveda
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Cord
  // bugfixed by: Manish
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //        note: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
  //        note: return true in this function (except for objects which inherit properties, being thus used as objects),
  //        note: unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays
  //        note: will return true
  //   example 1: is_array(['Kevin', 'van', 'Zonneveld']);
  //   returns 1: true
  //   example 2: is_array('Kevin van Zonneveld');
  //   returns 2: false
  //   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  //   returns 3: true
  //   example 4: is_array(function tmp_a(){this.name = 'Kevin'});
  //   returns 4: false

  var ini,
    _getFuncName = function(fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/)
        .exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    };
  _isArray = function(mixed_var) {
    // return Object.prototype.toString.call(mixed_var) === '[object Array]';
    // The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
    // Null, Not an object, no length property so couldn't be an Array (or String)
    if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
      return false;
    }
    var len = mixed_var.length;
    mixed_var[mixed_var.length] = 'bogus';
    // The only way I can think of to get around this (or where there would be trouble) would be to have an object defined
    // with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom
    // setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives
    // and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
    if (len !== mixed_var.length) {
      // We know it's an array since length auto-changed with the addition of a
      // numeric property at its length end, so safely get rid of our bogus element
      mixed_var.length -= 1;
      return true;
    }
    // Get rid of the property we added onto a non-array object; only possible
    // side-effect is if the user adds back the property later, it will iterate
    // this property in the older order placement in IE (an order which should not
    // be depended on anyways)
    delete mixed_var[mixed_var.length];
    return false;
  };

  if (!mixed_var || typeof mixed_var !== 'object') {
    return false;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT

  ini = this.php_js.ini['phpjs.objectsAsArrays'];

  return _isArray(mixed_var) ||
    // Allow returning true unless user has called
    // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
    ((!ini || (// if it's not set to 0 and it's not 'off', check for objects as arrays
      (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
        'off')))) && (
      Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) ===
      'Object' // Most likely a literal and intended as assoc. array
    ));
}function is_binary(vr) {
  //  discuss at: http://phpjs.org/functions/is_binary/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: is_binary('This could be binary as far as JavaScript knows...');
  //   returns 1: true

  return typeof vr === 'string'; // If it is a string of any kind, it could be binary
}function is_bool(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_bool/
  // original by: Onno Marsman
  // improved by: CoursesWeb (http://www.coursesweb.net/)
  //   example 1: is_bool(false);
  //   returns 1: true
  //   example 2: is_bool(0);
  //   returns 2: false

  return (mixed_var === true || mixed_var === false); // Faster (in FF) than type checking
}function is_buffer(vr) {
  //  discuss at: http://phpjs.org/functions/is_buffer/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: is_buffer('This could be binary or a regular string as far as JavaScript knows...');
  //   returns 1: true

  return typeof vr === 'string';
}function is_callable(v, syntax_only, callable_name) {
  //  discuss at: http://phpjs.org/functions/is_callable/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: François
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
  //        note: When used on an object, depends on a constructor property being kept on the object prototype
  //        test: skip
  //   example 1: is_callable('is_callable');
  //   returns 1: true
  //   example 2: is_callable('bogusFunction', true);
  //   returns 2: true // gives true because does not do strict checking
  //   example 3: function SomeClass () {}
  //   example 3: SomeClass.prototype.someMethod = function (){};
  //   example 3: var testObj = new SomeClass();
  //   example 3: is_callable([testObj, 'someMethod'], true, 'myVar');
  //   example 3: $result = myVar;
  //   returns 3: 'SomeClass::someMethod'
  //   example 4: is_callable(function () {});
  //   returns 4: true

  var name = '',
    obj = {},
    method = '';
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (typeof v === 'string') {
    obj = this.window;
    method = v;
    name = v;
  } else if (typeof v === 'function') {
    return true;
  } else if (Object.prototype.toString.call(v) === '[object Array]' &&
    v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
    obj = v[0];
    method = v[1];
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
  } else {
    return false;
  }
  if (syntax_only || typeof obj[method] === 'function') {
    if (callable_name) {
      this.window[callable_name] = name;
    }
    return true;
  }
  return false;
}function is_double(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_double/
  // original by: Paulo Freitas
  //  depends on: is_float
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_double(186.31);
  //   returns 1: true

  return this.is_float(mixed_var);
}function is_float(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_float/
  // original by: Paulo Freitas
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_float(186.31);
  //   returns 1: true

  return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
}function is_int(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_int/
  // original by: Alex
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
}function is_integer(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_integer/
  // original by: Paulo Freitas
  //  depends on: is_int
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_integer(186.31);
  //   returns 1: false
  //   example 2: is_integer(12);
  //   returns 2: true

  return this.is_int(mixed_var);
}function is_long(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_long/
  // original by: Paulo Freitas
  //  depends on: is_float
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_long(186.31);
  //   returns 1: true

  return this.is_float(mixed_var);
}function is_null(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_null/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: is_null('23');
  //   returns 1: false
  //   example 2: is_null(null);
  //   returns 2: true

  return (mixed_var === null);
}function is_numeric(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_numeric/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: David
  // improved by: taith
  // bugfixed by: Tim de Koning
  // bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Denis Chenu (http://shnoulle.net)
  //   example 1: is_numeric(186.31);
  //   returns 1: true
  //   example 2: is_numeric('Kevin van Zonneveld');
  //   returns 2: false
  //   example 3: is_numeric(' +186.31e2');
  //   returns 3: true
  //   example 4: is_numeric('');
  //   returns 4: false
  //   example 5: is_numeric([]);
  //   returns 5: false
  //   example 6: is_numeric('1 ');
  //   returns 6: false

  var whitespace =
    " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  return (typeof mixed_var === 'number' || (typeof mixed_var === 'string' && whitespace.indexOf(mixed_var.slice(-1)) ===
    -
    1)) && mixed_var !== '' && !isNaN(mixed_var);
}function is_object(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_object/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Legaev Andrey
  // improved by: Michael White (http://getsprink.com)
  //   example 1: is_object('23');
  //   returns 1: false
  //   example 2: is_object({foo: 'bar'});
  //   returns 2: true
  //   example 3: is_object(null);
  //   returns 3: false

  if (Object.prototype.toString.call(mixed_var) === '[object Array]') {
    return false;
  }
  return mixed_var !== null && typeof mixed_var === 'object';
}function is_real(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_real/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: is_float
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_real(186.31);
  //   returns 1: true

  return this.is_float(mixed_var);
}function is_resource(handle) {
  //  discuss at: http://phpjs.org/functions/is_resource/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Luis Salazar (http://www.freaky-media.com/)
  //   example 1: is_resource('a');
  //   returns 1: false

  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !==
    'PHPJS_Resource');
}function is_scalar(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_scalar/
  // original by: Paulo Freitas
  //   example 1: is_scalar(186.31);
  //   returns 1: true
  //   example 2: is_scalar({0: 'Kevin van Zonneveld'});
  //   returns 2: false

  return (/boolean|number|string/)
    .test(typeof mixed_var);
}function is_string(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_string/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: is_string('23');
  //   returns 1: true
  //   example 2: is_string(23.5);
  //   returns 2: false

  return (typeof mixed_var === 'string');
}function is_unicode(vr) {
  //  discuss at: http://phpjs.org/functions/is_unicode/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Almost all strings in JavaScript should be Unicode
  //   example 1: is_unicode('We the peoples of the United Nations...!');
  //   returns 1: true

  if (typeof vr !== 'string') {
    return false;
  }

  // If surrogates occur outside of high-low pairs, then this is not Unicode
  var arr = [],
    any = '([\s\S])',
    highSurrogate = '[\uD800-\uDBFF]',
    lowSurrogate = '[\uDC00-\uDFFF]',
    highSurrogateBeforeAny = new RegExp(highSurrogate + any, 'g'),
    lowSurrogateAfterAny = new RegExp(any + lowSurrogate, 'g'),
    singleLowSurrogate = new RegExp('^' + lowSurrogate + '$'),
    singleHighSurrogate = new RegExp('^' + highSurrogate + '$');

  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleLowSurrogate)) {
      // If high not followed by low surrogate
      return false;
    }
  }
  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleHighSurrogate)) {
      // If low not preceded by high surrogate
      return false;
    }
  }
  return true;
}function isset() {
  //  discuss at: http://phpjs.org/functions/isset/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: FremyCompany
  // improved by: Onno Marsman
  // improved by: Rafał Kukawski
  //   example 1: isset( undefined, true);
  //   returns 1: false
  //   example 2: isset( 'Kevin van Zonneveld' );
  //   returns 2: true

  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
}function print_r(array, return_val) {
  //  discuss at: http://phpjs.org/functions/print_r/
  // original by: Michael White (http://getsprink.com)
  // improved by: Ben Bryan
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //  depends on: echo
  //   example 1: print_r(1, true);
  //   returns 1: 1

  var output = '',
    pad_char = ' ',
    pad_val = 4,
    d = this.window.document,
    getFuncName = function(fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/)
        .exec(fn);
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

    if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
      'PHPJS_Resource') {
      str += 'Array\n' + base_pad + '(\n';
      for (var key in obj) {
        if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
          str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
        } else {
          str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
        }
      }
      str += base_pad + ')\n';
    } else if (obj === null || obj === undefined) {
      str = '';
    } else {
      // for our "resource" class
      str = obj.toString();
    }

    return str;
  };

  output = formatArray(array, 0, pad_val, pad_char);

  if (return_val !== true) {
    if (d.body) {
      this.echo(output);
    } else {
      try {
        // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
        d = XULDocument;
        this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
      } catch (e) {
        // Outputting as plain text may work in some plain XML
        this.echo(output);
      }
    }
    return true;
  }
  return output;
}function serialize(mixed_value) {
  //  discuss at: http://phpjs.org/functions/serialize/
  // original by: Arpad Ray (mailto:arpad@php.net)
  // improved by: Dino
  // improved by: Le Torbi (http://www.letorbi.de/)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // bugfixed by: Andrej Pavlovic
  // bugfixed by: Garagoth
  // bugfixed by: Russell Walker (http://www.nbill.co.uk/)
  // bugfixed by: Jamie Beck (http://www.terabit.ca/)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // bugfixed by: Ben (http://benblume.co.uk/)
  // bugfixed by: Codestar (http://codestarlive.com/)
  //    input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
  //    input by: Martin (http://www.erlenwiese.de/)
  //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
  //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
  //   example 1: serialize(['Kevin', 'van', 'Zonneveld']);
  //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  //   example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
  //   returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'

  var val, key, okey,
    ktype = '',
    vals = '',
    count = 0,
    _utf8Size = function(str) {
      var size = 0,
        i = 0,
        l = str.length,
        code = '';
      for (i = 0; i < l; i++) {
        code = str.charCodeAt(i);
        if (code < 0x0080) {
          size += 1;
        } else if (code < 0x0800) {
          size += 2;
        } else {
          size += 3;
        }
      }
      return size;
    },
    _getType = function(inp) {
      var match, key, cons, types, type = typeof inp;

      if (type === 'object' && !inp) {
        return 'null';
      }

      if (type === 'object') {
        if (!inp.constructor) {
          return 'object';
        }
        cons = inp.constructor.toString();
        match = cons.match(/(\w+)\(/);
        if (match) {
          cons = match[1].toLowerCase();
        }
        types = ['boolean', 'number', 'string', 'array'];
        for (key in types) {
          if (cons === types[key]) {
            type = types[key];
            break;
          }
        }
      }
      return type;
    },
    type = _getType(mixed_value);

  switch (type) {
  case 'function':
    val = '';
    break;
  case 'boolean':
    val = 'b:' + (mixed_value ? '1' : '0');
    break;
  case 'number':
    val = (Math.round(mixed_value) === mixed_value ? 'i' : 'd') + ':' + mixed_value;
    break;
  case 'string':
    val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
    break;
  case 'array':
  case 'object':
    val = 'a';
    /*
        if (type === 'object') {
          var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
          if (objname == undefined) {
            return;
          }
          objname[1] = this.serialize(objname[1]);
          val = 'O' + objname[1].substring(1, objname[1].length - 1);
        }
        */

    for (key in mixed_value) {
      if (mixed_value.hasOwnProperty(key)) {
        ktype = _getType(mixed_value[key]);
        if (ktype === 'function') {
          continue;
        }

        okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
        vals += this.serialize(okey) + this.serialize(mixed_value[key]);
        count++;
      }
    }
    val += ':' + count + ':{' + vals + '}';
    break;
  case 'undefined':
    // Fall-through
  default:
    // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
    val = 'N';
    break;
  }
  if (type !== 'object' && type !== 'array') {
    val += ';';
  }
  return val;
}
function settype(vr, type) {
  //  discuss at: http://phpjs.org/functions/settype/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //        note: Credits to Crockford also
  //        note: only works on global variables, and "vr" must be passed in as a string
  //   example 1: foo = '5bar';
  //   example 1: settype('foo', 'integer');
  //   example 1: $result = foo
  //   returns 1: 5
  //   example 2: foo = true;
  //   example 2: settype('foo', 'string');
  //   example 2: $result = foo
  //   returns 2: '1'

  var is_array = function(arr) {
    return typeof arr === 'object' && typeof arr.length === 'number' && !(arr.propertyIsEnumerable('length')) &&
      typeof arr.splice === 'function';
  };
  var v, mtch, i, obj;
  v = this[vr] ? this[vr] : vr;

  try {
    switch (type) {
    case 'boolean':
      if (is_array(v) && v.length === 0) {
        this[vr] = false;
      } else if (v === '0') {
        this[vr] = false;
      } else if (typeof v === 'object' && !is_array(v)) {
        var lgth = false;
        for (i in v) {
          lgth = true;
        }
        this[vr] = lgth;
      } else {
        this[vr] = !!v;
      }
      break;
    case 'integer':
      if (typeof v === 'number') {
        this[vr] = parseInt(v, 10);
      } else if (typeof v === 'string') {
        mtch = v.match(/^([+\-]?)(\d+)/);
        if (!mtch) {
          this[vr] = 0;
        } else {
          this[vr] = parseInt(v, 10);
        }
      } else if (v === true) {
        this[vr] = 1;
      } else if (v === false || v === null) {
        this[vr] = 0;
      } else if (is_array(v) && v.length === 0) {
        this[vr] = 0;
      } else if (typeof v === 'object') {
        this[vr] = 1;
      }

      break;
    case 'float':
      if (typeof v === 'string') {
        mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
        if (!mtch) {
          this[vr] = 0;
        } else {
          this[vr] = parseFloat(v, 10);
        }
      } else if (v === true) {
        this[vr] = 1;
      } else if (v === false || v === null) {
        this[vr] = 0;
      } else if (is_array(v) && v.length === 0) {
        this[vr] = 0;
      } else if (typeof v === 'object') {
        this[vr] = 1;
      }
      break;
    case 'string':
      if (v === null || v === false) {
        this[vr] = '';
      } else if (is_array(v)) {
        this[vr] = 'Array';
      } else if (typeof v === 'object') {
        this[vr] = 'Object';
      } else if (v === true) {
        this[vr] = '1';
      } else {
        this[vr] += '';
      } // numbers (and functions?)
      break;
    case 'array':
      if (v === null) {
        this[vr] = [];
      } else if (typeof v !== 'object') {
        this[vr] = [v];
      }
      break;
    case 'object':
      if (v === null) {
        this[vr] = {};
      } else if (is_array(v)) {
        for (i = 0, obj = {}; i < v.length; i++) {
          obj[i] = v;
        }
        this[vr] = obj;
      } else if (typeof v !== 'object') {
        this[vr] = {
          scalar : v
        };
      }
      break;
    case 'null':
      delete this[vr];
      break;
    }
    return true;
  } catch (e) {
    return false;
  }
}function strval(str) {
  //  discuss at: http://phpjs.org/functions/strval/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  depends on: gettype
  //   example 1: strval({red: 1, green: 2, blue: 3, white: 4});
  //   returns 1: 'Object'

  var type = '';

  if (str === null) {
    return '';
  }

  type = this.gettype(str);

  // Comment out the entire switch if you want JS-like
  // behavior instead of PHP behavior
  switch (type) {
  case 'boolean':
    if (str === true) {
      return '1';
    }
    return '';
  case 'array':
    return 'Array';
  case 'object':
    return 'Object';
  }

  return str;
}function unserialize(data) {
  //  discuss at: http://phpjs.org/functions/unserialize/
  // original by: Arpad Ray (mailto:arpad@php.net)
  // improved by: Pedro Tainha (http://www.pedrotainha.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Chris
  // improved by: James
  // improved by: Le Torbi
  // improved by: Eli Skeggs
  // bugfixed by: dptr1988
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  revised by: d3x
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: Martin (http://www.erlenwiese.de/)
  //    input by: kilops
  //    input by: Jaroslaw Czarniak
  //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
  //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
  //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
  //   returns 1: ['Kevin', 'van', 'Zonneveld']
  //   example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
  //   returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}

  var that = this,
    utf8Overhead = function(chr) {
      // http://phpjs.org/functions/unserialize:571#comment_95906
      var code = chr.charCodeAt(0);
      if (  code < 0x0080 
            || 0x00A0 <= code && code <= 0x00FF 
            || [338,339,352,353,376,402,8211,8212,8216,8217,8218,8220,8221,8222,8224,8225,8226,8230,8240,8364,8482].indexOf(code)!=-1) 
      {
        return 0;
      }
      if (code < 0x0800) {
        return 1;
      }
      return 2;
    };
  error = function(type, msg, filename, line) {
    throw new that.window[type](msg, filename, line);
  };
  read_until = function(data, offset, stopchr) {
    var i = 2,
      buf = [],
      chr = data.slice(offset, offset + 1);

    while (chr != stopchr) {
      if ((i + offset) > data.length) {
        error('Error', 'Invalid');
      }
      buf.push(chr);
      chr = data.slice(offset + (i - 1), offset + i);
      i += 1;
    }
    return [buf.length, buf.join('')];
  };
  read_chrs = function(data, offset, length) {
    var i, chr, buf;

    buf = [];
    for (i = 0; i < length; i++) {
      chr = data.slice(offset + (i - 1), offset + i);
      buf.push(chr);
      length -= utf8Overhead(chr);
    }
    return [buf.length, buf.join('')];
  };
  _unserialize = function(data, offset) {
    var dtype, dataoffset, keyandchrs, keys, contig,
      length, array, readdata, readData, ccount,
      stringlength, i, key, kprops, kchrs, vprops,
      vchrs, value, chrs = 0,
      typeconvert = function(x) {
        return x;
      };

    if (!offset) {
      offset = 0;
    }
    dtype = (data.slice(offset, offset + 1))
      .toLowerCase();

    dataoffset = offset + 2;

    switch (dtype) {
    case 'i':
      typeconvert = function(x) {
        return parseInt(x, 10);
      };
      readData = read_until(data, dataoffset, ';');
      chrs = readData[0];
      readdata = readData[1];
      dataoffset += chrs + 1;
      break;
    case 'b':
      typeconvert = function(x) {
        return parseInt(x, 10) !== 0;
      };
      readData = read_until(data, dataoffset, ';');
      chrs = readData[0];
      readdata = readData[1];
      dataoffset += chrs + 1;
      break;
    case 'd':
      typeconvert = function(x) {
        return parseFloat(x);
      };
      readData = read_until(data, dataoffset, ';');
      chrs = readData[0];
      readdata = readData[1];
      dataoffset += chrs + 1;
      break;
    case 'n':
      readdata = null;
      break;
    case 's':
      ccount = read_until(data, dataoffset, ':');
      chrs = ccount[0];
      stringlength = ccount[1];
      dataoffset += chrs + 2;

      readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
      chrs = readData[0];
      readdata = readData[1];
      dataoffset += chrs + 2;
      if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
        error('SyntaxError', 'String length mismatch');
      }
      break;
    case 'a':
      readdata = {};

      keyandchrs = read_until(data, dataoffset, ':');
      chrs = keyandchrs[0];
      keys = keyandchrs[1];
      dataoffset += chrs + 2;

      length = parseInt(keys, 10);
      contig = true;

      for (i = 0; i < length; i++) {
        kprops = _unserialize(data, dataoffset);
        kchrs = kprops[1];
        key = kprops[2];
        dataoffset += kchrs;

        vprops = _unserialize(data, dataoffset);
        vchrs = vprops[1];
        value = vprops[2];
        dataoffset += vchrs;

        if (key !== i)
          contig = false;

        readdata[key] = value;
      }

      if (contig) {
        array = new Array(length);
        for (i = 0; i < length; i++)
          array[i] = readdata[i];
        readdata = array;
      }

      dataoffset += 1;
      break;
    default:
      error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
      break;
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)];
  };

  return _unserialize((data + ''), 0)[2];
}
function var_dump() {
  //  discuss at: http://phpjs.org/functions/var_dump/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Zahlii
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  depends on: echo
  //        note: For returning a string, use var_export() with the second argument set to true
  //        test: skip
  //   example 1: var_dump(1);
  //   returns 1: 'int(1)'

  var output = '',
    pad_char = ' ',
    pad_val = 4,
    lgth = 0,
    i = 0;

  var _getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  var _repeat_char = function(len, pad_char) {
    var str = '';
    for (var i = 0; i < len; i++) {
      str += pad_char;
    }
    return str;
  };
  var _getInnerVal = function(val, thick_pad) {
    var ret = '';
    if (val === null) {
      ret = 'NULL';
    } else if (typeof val === 'boolean') {
      ret = 'bool(' + val + ')';
    } else if (typeof val === 'string') {
      ret = 'string(' + val.length + ') "' + val + '"';
    } else if (typeof val === 'number') {
      if (parseFloat(val) == parseInt(val, 10)) {
        ret = 'int(' + val + ')';
      } else {
        ret = 'float(' + val + ')';
      }
    }
    // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
    else if (typeof val === 'undefined') {
      ret = 'undefined';
    } else if (typeof val === 'function') {
      var funcLines = val.toString()
        .split('\n');
      ret = '';
      for (var i = 0, fll = funcLines.length; i < fll; i++) {
        ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
      }
    } else if (val instanceof Date) {
      ret = 'Date(' + val + ')';
    } else if (val instanceof RegExp) {
      ret = 'RegExp(' + val + ')';
    } else if (val.nodeName) {
      // Different than PHP's DOMElement
      switch (val.nodeType) {
      case 1:
        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') {
          // Undefined namespace could be plain XML, but namespaceURI not widely supported
          ret = 'HTMLElement("' + val.nodeName + '")';
        } else {
          ret = 'XML Element("' + val.nodeName + '")';
        }
        break;
      case 2:
        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
        break;
      case 3:
        ret = 'TEXT_NODE(' + val.nodeValue + ')';
        break;
      case 4:
        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
        break;
      case 5:
        ret = 'ENTITY_REFERENCE_NODE';
        break;
      case 6:
        ret = 'ENTITY_NODE';
        break;
      case 7:
        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
        break;
      case 8:
        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
        break;
      case 9:
        ret = 'DOCUMENT_NODE';
        break;
      case 10:
        ret = 'DOCUMENT_TYPE_NODE';
        break;
      case 11:
        ret = 'DOCUMENT_FRAGMENT_NODE';
        break;
      case 12:
        ret = 'NOTATION_NODE';
        break;
      }
    }
    return ret;
  };

  var _formatArray = function(obj, cur_depth, pad_val, pad_char) {
    var someProp = '';
    if (cur_depth > 0) {
      cur_depth++;
    }

    var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
    var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
    var str = '';
    var val = '';

    if (typeof obj === 'object' && obj !== null) {
      if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
        return obj.var_dump();
      }
      lgth = 0;
      for (someProp in obj) {
        lgth++;
      }
      str += 'array(' + lgth + ') {\n';
      for (var key in obj) {
        var objVal = obj[key];
        if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) &&
          !
          objVal.nodeName) {
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val,
            pad_char);
        } else {
          val = _getInnerVal(objVal, thick_pad);
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
        }
      }
      str += base_pad + '}\n';
    } else {
      str = _getInnerVal(obj, thick_pad);
    }
    return str;
  };

  output = _formatArray(arguments[0], 0, pad_val, pad_char);
  for (i = 1; i < arguments.length; i++) {
    output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
  }

  this.echo(output);
}function var_export(mixed_expression, bool_return) {
  //  discuss at: http://phpjs.org/functions/var_export/
  // original by: Philip Peterson
  // improved by: johnrembo
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: Brian Tafoya (http://www.premasolutions.com/)
  //    input by: Hans Henrik (http://hanshenrik.tk/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  depends on: echo
  //   example 1: var_export(null);
  //   returns 1: null
  //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
  //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
  //   example 3: data = 'Kevin';
  //   example 3: var_export(data, true);
  //   returns 3: "'Kevin'"

  var retstr = '',
    iret = '',
    value,
    cnt = 0,
    x = [],
    i = 0,
    funcParts = [],
    // We use the last argument (not part of PHP) to pass in
    // our indentation level
    idtLevel = arguments[2] || 2,
    innerIndent = '',
    outerIndent = '',
    getFuncName = function(fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/)
        .exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    };
  _makeIndent = function(idtLevel) {
    return (new Array(idtLevel + 1))
      .join(' ');
  };
  __getType = function(inp) {
    var i = 0,
      match, types, cons, type = typeof inp;
    if (type === 'object' && (inp && inp.constructor) &&
      getFuncName(inp.constructor) === 'PHPJS_Resource') {
      return 'resource';
    }
    if (type === 'function') {
      return 'function';
    }
    if (type === 'object' && !inp) {
      // Should this be just null?
      return 'null';
    }
    if (type === 'object') {
      if (!inp.constructor) {
        return 'object';
      }
      cons = inp.constructor.toString();
      match = cons.match(/(\w+)\(/);
      if (match) {
        cons = match[1].toLowerCase();
      }
      types = ['boolean', 'number', 'string', 'array'];
      for (i = 0; i < types.length; i++) {
        if (cons === types[i]) {
          type = types[i];
          break;
        }
      }
    }
    return type;
  };
  type = __getType(mixed_expression);

  if (type === null) {
    retstr = 'NULL';
  } else if (type === 'array' || type === 'object') {
    outerIndent = _makeIndent(idtLevel - 2);
    innerIndent = _makeIndent(idtLevel);
    for (i in mixed_expression) {
      value = this.var_export(mixed_expression[i], 1, idtLevel + 2);
      value = typeof value === 'string' ? value.replace(/</g, '&lt;')
        .
      replace(/>/g, '&gt;'): value;
      x[cnt++] = innerIndent + i + ' => ' +
        (__getType(mixed_expression[i]) === 'array' ?
          '\n' : '') + value;
    }
    iret = x.join(',\n');
    retstr = outerIndent + 'array (\n' + iret + '\n' + outerIndent + ')';
  } else if (type === 'function') {
    funcParts = mixed_expression.toString()
      .
    match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcParts[1] + "', '" +
      funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
  } else if (type === 'resource') {
    // Resources treated as null for var_export
    retstr = 'NULL';
  } else {
    retstr = typeof mixed_expression !== 'string' ? mixed_expression :
      "'" + mixed_expression.replace(/(["'])/g, '\\$1')
      .
    replace(/\0/g, '\\0') + "'";
  }

  if (!bool_return) {
    this.echo(retstr);
    return null;
  }

  return retstr;
}