function uksort(inputArr, sorter) {
  //  discuss at: http://phpjs.org/functions/uksort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: The examples are correct, this is a new way
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 1: data = uksort(data, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
  //   example 1: $result = data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}

  var tmp_arr = {},
    keys = [],
    i = 0,
    k = '',
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this.window[sorter];
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  // Sort key names
  try {
    if (sorter) {
      keys.sort(sorter);
    } else {
      keys.sort();
    }
  } catch (e) {
    return false;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmp_arr[k] = inputArr[k];
    if (strictForIn) {
      delete inputArr[k];
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i];
    }
  }
  return strictForIn || populateArr;
}