function uasort(inputArr, sorter) {
  //  discuss at: http://phpjs.org/functions/uasort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //   example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 1: fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
  //   example 1: $result = fruits;
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  var valArr = [],
    tempKeyVal, tempValue, ret, k = '',
    i = 0,
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function(a, b) {
    return sorter(a[1], b[1]);
  });

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}