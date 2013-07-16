(function() {

  define(['./balancer'], function(f) {
    module('layout/cell.arranger/balancer');
    test('balanced, should not insert free rows', function() {
      var lanes;
      lanes = f.balance([
        {
          x_size: 2,
          matrix: [[-1, 1]]
        }, {
          x_size: 2,
          matrix: [[-2, 2]]
        }
      ]);
      return deepEqual(lanes, [
        {
          x_size: 2,
          matrix: [[-1, 1]]
        }, {
          x_size: 2,
          matrix: [[-2, 2]]
        }
      ]);
    });
    return test('unbalanced, should insert free rows', function() {
      var lanes;
      lanes = f.balance([
        {
          x_size: 2,
          matrix: [[-1, 1], [1, -4], [4, 0]]
        }, {
          x_size: 2,
          matrix: [[-2, 2]]
        }
      ]);
      return deepEqual(lanes, [
        {
          x_size: 2,
          matrix: [[-1, 1], [1, -4], [4, 0]]
        }, {
          x_size: 2,
          matrix: [[-2, 2], [0, 0], [0, 0]]
        }
      ]);
    });
  });

}).call(this);
