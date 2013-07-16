(function() {

  define(['lib/guardian'], function(G) {
    module('guardian');
    test('assert with true, should pass', function() {
      return ok(G.assert(function() {
        return 1 === 1;
      }));
    });
    test('assert with fn return, should pass with fn return value', function() {
      return equal(2, G.assert(function() {
        return 1 + 1;
      }));
    });
    test('assert with false, should fail', function() {
      return raises(function() {
        return G.assert(function() {
          return 1 === 2;
        });
      });
    });
    return test('assert with null, should fail', function() {
      return raises(function() {
        return G.assert(function() {
          return null;
        });
      });
    });
  });

}).call(this);
