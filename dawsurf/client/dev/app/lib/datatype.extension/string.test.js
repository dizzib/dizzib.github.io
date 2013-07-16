(function() {

  define(['lib/datatype.extension/string'], function() {
    module('datatype.extension/string');
    test('condense', function() {
      return equal('   foo    bar  '.condense(), 'foobar');
    });
    test('trim_l/r/lr', function() {
      equal('  foo'.trim_l(), 'foo');
      equal('foo  '.trim_r(), 'foo');
      return equal('  foo  '.trim_lr(), 'foo');
    });
    return test('starts/ends/contains', function() {
      ok('foobar'.starts('foo'));
      ok(!'foobar'.starts('goo'));
      ok('foobar'.ends('bar'));
      ok(!'foobar'.ends('foo'));
      ok('foobar'.contains('oob'));
      return ok(!'foobar'.contains('goo'));
    });
  });

}).call(this);
