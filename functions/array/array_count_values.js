function array_count_values(array) {
  //  discuss at: http://phpjs.org/functions/array_count_values/
  // original by: Ates Goral (http://magnetiq.com)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: sankai
  //    input by: Shingo
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
  //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
  //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
  //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
  //   example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
  //   returns 3: {42:1, "fubar":1}

  var tmp_arr = {},
    key = '',
    t = '';

  var __getType = function(obj) {
    // Objects are php associative arrays.
    var t = typeof obj;
    t = t.toLowerCase();
    if (t === 'object') {
      t = 'array';
    }
    return t;
  };

  var __countValue = function(tmp_arr, value) {
    switch (typeof value) {
    case 'number':
      if (Math.floor(value) !== value) {
        return;
      }
      // Fall-through
    case 'string':
      if (value in tmp_arr && tmp_arr.hasOwnProperty(value)) {
        ++tmp_arr[value];
      } else {
        tmp_arr[value] = 1;
      }
    }
  };

  t = __getType(array);
  if (t === 'array') {
    for (key in array) {
      if (array.hasOwnProperty(key)) {
        __countValue.call(this, tmp_arr, array[key]);
      }
    }
  }

  return tmp_arr;
}