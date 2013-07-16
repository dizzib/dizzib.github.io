(function() {

  define(['./mason'], function(f) {
    module('layout/cell.arranger');
    test('build, with small * group, should treat * as normal', function() {
      var m;
      m = f.build([1, 2, 3], [6, 3, 3], 6);
      return deepEqual(m, [[-1, 1, 1, -2, 2, 2], [1, 1, 1, -3, 3, 3]]);
    });
    test('build, with oversized * group, should split * into own partition', function() {
      var m;
      m = f.build([2, 1, 3], [3, 12, 3], 6);
      return deepEqual(m, [[-1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [-2, 2, 2, -3, 3, 3]]);
    });
    return test('build, with oversized * group, should split * into own partition', function() {
      var m;
      m = f.build([2, 1, 3], [3, 13, 3], 6);
      return deepEqual(m, [[-1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [-2, 2, 2, -3, 3, 3]]);
    });
  });

}).call(this);
