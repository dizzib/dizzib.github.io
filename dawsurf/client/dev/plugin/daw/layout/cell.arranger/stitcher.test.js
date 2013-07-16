(function() {

  define(['./stitcher'], function(f) {
    module('layout/cell.arranger/stitcher');
    return test('2 lanes, should create 8x3 matrix', function() {
      var m;
      m = f.stitch([
        {
          x_size: 5,
          matrix: [[-1, 1, 1, 1, 1], [1, -4, 4, 4, 4], [4, 4, 0, 0, 0]]
        }, {
          x_size: 3,
          matrix: [[-2, 2, 2], [-3, 3, 0], [0, 0, 0]]
        }
      ]);
      return deepEqual(m, [[-1, 1, 1, 1, 1, -2, 2, 2], [1, -4, 4, 4, 4, -3, 3, 0], [4, 4, 0, 0, 0, 0, 0, 0]]);
    });
  });

}).call(this);
