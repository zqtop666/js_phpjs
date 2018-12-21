function cosh(arg) {
  //  discuss at: http://phpjs.org/functions/cosh/
  // original by: Onno Marsman
  //   example 1: cosh(-0.18127180117607017);
  //   returns 1: 1.0164747716114113

  return (Math.exp(arg) + Math.exp(-arg)) / 2;
}