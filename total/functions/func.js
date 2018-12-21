function call_user_func(cb) {
  //  discuss at: http://phpjs.org/functions/call_user_func/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Diplom@t (http://difane.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: call_user_func('isNaN', 'a');
  //   returns 1: true

  var func;

  if (typeof cb === 'string') {
    func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = (typeof cb[0] === 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
  } else if (typeof cb === 'function') {
    func = cb;
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  var parameters = Array.prototype.slice.call(arguments, 1);
  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(
    null, parameters) : func.apply(cb[0], parameters);
}function call_user_func_array(cb, parameters) {
  //  discuss at: http://phpjs.org/functions/call_user_func_array/
  // original by: Thiago Mata (http://thiagomata.blog.com)
  //  revised by: Jon Hohle
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Diplom@t (http://difane.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: call_user_func_array('isNaN', ['a']);
  //   returns 1: true
  //   example 2: call_user_func_array('isNaN', [1]);
  //   returns 2: false

  var func;

  if (typeof cb === 'string') {
    func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = (typeof cb[0] === 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
  } else if (typeof cb === 'function') {
    func = cb;
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(
    null, parameters) : func.apply(cb[0], parameters);
}function create_function(args, code) {
  //       discuss at: http://phpjs.org/functions/create_function/
  //      original by: Johnny Mast (http://www.phpvrouwen.nl)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //        example 1: f = create_function('a, b', "return (a + b);");
  //        example 1: f(1, 2);
  //        returns 1: 3

  try {
    return Function.apply(null, args.split(',')
      .concat(code));
  } catch (e) {
    return false;
  }
}function function_exists(func_name) {
  //  discuss at: http://phpjs.org/functions/function_exists/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Steve Clay
  // improved by: Legaev Andrey
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: function_exists('isFinite');
  //   returns 1: true

  if (typeof func_name === 'string') {
    func_name = this.window[func_name];
  }
  return typeof func_name === 'function';
}function get_defined_functions() {
  //  discuss at: http://phpjs.org/functions/get_defined_functions/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: Test case 1: If get_defined_functions can find itself in the defined functions, it worked :)
  //   example 1: function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
  //   example 1: funcs = get_defined_functions();
  //   example 1: found = test_in_array(funcs, 'get_defined_functions');
  //   example 1: $result = found;
  //   returns 1: true

  var i = '',
    arr = [],
    already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'function') {
        if (!already[i]) {
          already[i] = 1;
          arr.push(i);
        }
      } else if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (typeof this.window[j] === 'function' && this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      }
    } catch (e) {
      // Some objects in Firefox throw exceptions when their properties are accessed (e.g., sessionStorage)
    }
  }

  return arr;
}