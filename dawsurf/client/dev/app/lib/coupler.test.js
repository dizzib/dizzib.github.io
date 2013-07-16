(function() {

  define(['lib/sys/log', 'lib/coupler', 'lib/profiler'], function(Log, Coupler, Profiler) {
    module('coupler');
    test('connect with invalid source event name, should throw exception', function() {
      return raises(function() {
        return Coupler.connect({
          foo: function() {}
        }, 'bar', {
          goo: function() {}
        }, 'goo');
      });
    });
    test('connect with invalid destination handler name, should throw exception', function() {
      return raises(function() {
        return Coupler.connect({
          foo: function() {}
        }, 'foo', {
          goo: function() {}
        }, 'bar');
      });
    });
    test('disconnect before any connect, should throw exception', function() {
      return raises(function() {
        return Coupler.disconnect({
          foo: function() {}
        }, 'bar', {
          goo: function() {}
        }, 'goo');
      });
    });
    test('multi connect and disconnect with multi source/handlers ', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function() {}
      };
      goo = {
        bar: function() {
          return n += 1;
        }
      };
      hoo = {
        bar: function() {
          return n += 2;
        }
      };
      Coupler.connect(foo, 'bar', goo, 'bar');
      Coupler.disconnect(foo, 'bar', goo, 'BAZ');
      foo.bar();
      equal(n, 1);
      Coupler.disconnect(foo, 'bar', goo, 'bar');
      Coupler.connect(foo, 'bar', goo, 'bar');
      Coupler.connect(foo, 'bar', hoo, 'bar');
      foo.bar();
      equal(n, 4);
      Coupler.disconnect(foo, 'bar', goo, 'bar');
      foo.bar();
      equal(n, 6);
      Log.add(foo);
      Coupler.disconnect(foo, 'bar', hoo, 'bar');
      foo.bar();
      equal(n, 6);
      return Log.add(foo);
    });
    test('1 source with 2 handlers on same event with no args', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function() {}
      };
      goo = {
        bar: function() {
          return n += 1;
        }
      };
      hoo = {
        bar: function() {
          return n += 2;
        }
      };
      Coupler.connect(foo, 'bar', goo, 'bar');
      Coupler.connect(foo, 'bar', hoo, 'bar');
      foo.bar();
      return equal(n, 3);
    });
    test('1 source with 2 handlers on same event with 2 args', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function(a, b) {}
      };
      goo = {
        bar: function(a, b) {
          return n += a + b;
        }
      };
      hoo = {
        bar: function(a, b) {
          return n += a * b;
        }
      };
      Coupler.connect(foo, 'bar', goo, 'bar');
      Coupler.connect(foo, 'bar', hoo, 'bar');
      foo.bar(1, 2);
      return equal(n, 5);
    });
    test('1 source with 2 handlers on different events with no args', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function() {},
        baz: function() {}
      };
      goo = {
        bar: function() {
          return n += 1;
        }
      };
      hoo = {
        bar: function() {
          return n += 2;
        }
      };
      Coupler.connect(foo, 'bar', goo, 'bar');
      Coupler.connect(foo, 'baz', hoo, 'bar');
      foo.bar();
      foo.baz();
      return equal(n, 3);
    });
    test('independence', function() {
      var foo, goo, hoo, joo, n;
      n = 0;
      foo = {
        bar: function() {}
      };
      goo = {
        bar: function() {}
      };
      hoo = {
        bar: function() {
          return n += 1;
        }
      };
      joo = {
        bar: function() {
          return n += 2;
        }
      };
      Coupler.connect(foo, 'bar', hoo, 'bar');
      Coupler.connect(goo, 'bar', joo, 'bar');
      foo.bar();
      goo.bar();
      return equal(n, 3);
    });
    test('independence from profiler', function() {
      var foo, goo, hoo, joo, n;
      n = 0;
      foo = {
        bar: function() {}
      };
      goo = {
        bar: function() {}
      };
      hoo = {
        bar: function() {
          return n += 1;
        }
      };
      joo = {
        bar: function() {
          return n += 2;
        }
      };
      Profiler.profile(foo);
      Profiler.profile(goo);
      Profiler.profile(hoo);
      Profiler.profile(joo);
      Coupler.connect(foo, 'bar', hoo, 'bar');
      Coupler.connect(goo, 'bar', joo, 'bar');
      foo.bar();
      goo.bar();
      return equal(n, 3);
    });
    test('interference with profiler - cannnot call method apply of undefined', function() {
      var foo, goo, n;
      n = 0;
      foo = {
        module_name: 'foo',
        bar: function() {
          return Coupler.connect(goo, 'baz', foo, 'hoo');
        },
        hoo: function(a) {
          return n = a;
        }
      };
      goo = {
        baz: function(a) {
          return a;
        }
      };
      Profiler.profile(foo);
      foo.bar();
      goo.baz(1);
      return equal(n, 1);
    });
    test('event bubbling, connect order 1', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function(a) {
          return n += a;
        }
      };
      goo = {
        baa: function(a) {
          return n += a * 2;
        }
      };
      hoo = {
        baz: function(a) {
          return n += a * 3;
        }
      };
      Coupler.connect(foo, 'bar', goo, 'baa');
      Coupler.connect(goo, 'baa', hoo, 'baz');
      foo.bar(1);
      return equal(n, 6);
    });
    return test('event bubbling, connect order 2', function() {
      var foo, goo, hoo, n;
      n = 0;
      foo = {
        bar: function(a) {
          return n += a;
        }
      };
      goo = {
        bar: function(a) {
          return n += a * 2;
        }
      };
      hoo = {
        bar: function(a) {
          return n += a * 3;
        }
      };
      Coupler.connect(goo, 'bar', hoo, 'bar');
      Coupler.connect(foo, 'bar', goo, 'bar');
      foo.bar(1);
      return equal(n, 6);
    });
  });

}).call(this);
