(function() {
  var __slice = [].slice;

  define(['underscore', 'lib/sys/log', 'lib/profiler'], function(_, Log, lp) {
    module('profiler');
    Log.add = _.wrap(Log.add, function() {
      var args, fn;
      fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return Log.out += "" + (fn.apply(null, args));
    });
    test('2 x profile object, should profile only once', function() {
      var bar;
      bar = {
        module_name: 'mybar',
        foo: function(a, b, c) {
          return a + b;
        },
        goo: function(a, b, c) {
          return a * b;
        },
        hoo: 'baz'
      };
      lp.profile(bar);
      lp.profile(bar);
      Log.out = '';
      equal(bar.foo(3, 5, {}), 8);
      equal(bar.goo(3, 5, {}), 15);
      equal(Log.out.match(/mybar\.foo -->/g).length, 1);
      equal(Log.out.match(/mybar\.foo <--/g).length, 1);
      equal(Log.out.match(/mybar\.goo -->/g).length, 1);
      equal(Log.out.match(/mybar\.goo <--/g).length, 1);
      return equal(Log.out.match(/3,5/g).length, 2);
    });
    return test('2 x profile class, should profile only once', function() {
      var Bar, bar, _ref;
      bar = new (Bar = (function() {

        function Bar() {}

        Bar.prototype.foo = function(a, b, c) {
          return a + b;
        };

        Bar.prototype.goo = 'baz';

        return Bar;

      })());
      lp.profile(bar);
      lp.profile(bar);
      Log.out = '';
      equal(bar.foo(2, 3, {}), 5);
      equal(Log.out.match(/Bar\.foo -->/g).length, 1);
      equal(Log.out.match(/Bar\.foo <--/g).length, 1);
      return equal((_ref = Log.out.match(/2,3/g)) != null ? _ref.length : void 0, 1);
    });
  });

}).call(this);
