(function() {

  define(['./defragger'], function(f) {
    module('layout/cell.arranger/defragger');
    test('free cells, should return input', function() {
      var m;
      m = f.defrag([[0, 0, 0, 0]]);
      return deepEqual(m, [[0, 0, 0, 0]]);
    });
    test('5xN, should defrag', function() {
      var m;
      m = f.defrag([[-1, 1, 1, 1, 1], [1, -2, 2, -3, 3], [3, 3, 3, -4, 4], [4, 4, -5, 5, 5], [-6, 6, 6, 6, -9], [9, 9, 9, 9, 9]]);
      return deepEqual(m, [[-1, 1, 1, 1, 1], [1, -2, 2, -3, 3], [-4, 4, 3, 3, 3], [4, 4, -5, 5, 5], [-6, 6, 6, 6, -9], [9, 9, 9, 9, 9]]);
    });
    return test('8x2, with identical deltas on same row, should apply last group', function() {
      var m;
      m = f.defrag([[-1, 1, 1, -2, 2, 2, -3, 3], [3, 3, 3, 3, 3, 3, 3, 0]]);
      return deepEqual(m, [[-3, 3, -1, 1, 1, -2, 2, 2], [3, 3, 3, 3, 3, 3, 3, 0]]);
    });
  });

}).call(this);
