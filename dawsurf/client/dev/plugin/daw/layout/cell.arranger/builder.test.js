(function() {

  define(['./builder'], function(f) {
    module('layout/cell.arranger/builder');
    test('1 lane with 4 groups, should build without defrag', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2, 3, 8], [1, 5, 5, 8]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, -2, 2, 2], [2, 2, -3, 3], [3, 3, 3, 0], [-8, 8, 8, 8], [8, 8, 8, 8]]
        }
      ]);
    });
    test('1 lane with 4 groups, should build with defrag', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2, 3, 4], [1, 5, 3, 8]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, -2, 2, 2], [2, 2, 0, 0], [-3, 3, 3, 0], [-4, 4, 4, 4], [4, 4, 4, 4]]
        }
      ]);
    });
    test('1 lane with 4 groups, should build with defrag', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2, 3, 4], [1, 5, 4, 7]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, -2, 2, 2], [2, 2, 0, 0], [-3, 3, 3, 3], [-4, 4, 4, 4], [4, 4, 4, 0]]
        }
      ]);
    });
    test('1 lane with major dogleg, should build with dogleg removed', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2], [2, 8]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, 1, 0, 0], [-2, 2, 2, 2], [2, 2, 2, 2]]
        }
      ]);
    });
    test('1 lane with minor dogleg, should build with minor dogleg present', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2], [2, 9]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, 1, -2, 2], [2, 2, 2, 2], [2, 2, 2, 0]]
        }
      ]);
    });
    test('2 lanes with 2 groups, should distribute evenly', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }, {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2], [3, 2]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, 1, 1, 0]]
        }, {
          x_size: 4,
          matrix: [[-2, 2, 0, 0]]
        }
      ]);
    });
    return test('2 lanes with 4 groups, should distribute evenly', function() {
      var lanes;
      lanes = f.build([
        {
          x_size: 4,
          matrix: [[]]
        }, {
          x_size: 4,
          matrix: [[]]
        }
      ], [1, 2, 3, 4], [5, 4, 4, 4]);
      return deepEqual(lanes, [
        {
          x_size: 4,
          matrix: [[-1, 1, 1, 1], [1, 0, 0, 0], [-4, 4, 4, 4]]
        }, {
          x_size: 4,
          matrix: [[-2, 2, 2, 2], [-3, 3, 3, 3]]
        }
      ]);
    });
  });

}).call(this);
