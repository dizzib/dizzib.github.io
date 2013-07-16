(function() {

  define(['./laner'], function(f) {
    var run, run_hi;
    module('layout/cell.arranger/laner');
    run = function(x_size, expect_x_sizes, lane_width_lo, lane_width_hi) {
      var i, l, lanes, n, _i, _len, _ref, _results;
      if (lane_width_lo == null) {
        lane_width_lo = 3;
      }
      if (lane_width_hi == null) {
        lane_width_hi = 5;
      }
      ok(true, "x_size = " + x_size + ", expect_x_sizes=" + expect_x_sizes);
      lanes = f.create((function() {
        var _i, _results;
        _results = [];
        for (n = _i = 1; _i <= 20; n = ++_i) {
          _results.push(8);
        }
        return _results;
      })(), x_size);
      equal(lanes.length, expect_x_sizes.length);
      _results = [];
      for (i = _i = 0, _len = lanes.length; _i < _len; i = ++_i) {
        l = lanes[i];
        if (x_size > 5) {
          ok((lane_width_lo <= (_ref = l.x_size) && _ref <= lane_width_hi), 'check valid lane width');
        }
        _results.push(equal(l.x_size, expect_x_sizes[i]));
      }
      return _results;
    };
    run_hi = function(x_size, expect_x_sizes) {
      return run(x_size, expect_x_sizes, 4, 6);
    };
    test('vary by cols, with low x_size, should create evenly distributed lanes of width 3, 4 or 5 (ideally 4)', function() {
      run(1, [1]);
      run(2, [2]);
      run(3, [3]);
      run(4, [4]);
      run(5, [5]);
      run(6, [3, 3]);
      run(7, [4, 3]);
      run(8, [4, 4]);
      run(9, [3, 3, 3]);
      run(10, [5, 5]);
      run(11, [4, 3, 4]);
      run(12, [4, 4, 4]);
      run(13, [4, 5, 4]);
      run(14, [5, 4, 5]);
      run(15, [5, 5, 5]);
      run(16, [4, 4, 4, 4]);
      return run(17, [4, 4, 5, 4]);
    });
    test('vary by cols, with high x_size, should create evenly distributed lanes of width 4, 5 or 6 (ideally 5)', function() {
      return run_hi(32, [4, 4, 4, 4, 4, 4, 4, 4]);
    });
    return test('low volume, should create single lane', function() {
      var lanes;
      lanes = f.create([1, 2], 8);
      equal(lanes.length, 1);
      return equal(lanes[0].x_size, 8);
    });
  });

}).call(this);
