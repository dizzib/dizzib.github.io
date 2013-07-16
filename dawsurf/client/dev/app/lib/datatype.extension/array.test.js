(function() {

  define(['lib/datatype.extension/array'], function() {
    module('datatype.extension/array');
    test('insert', function() {
      deepEqual([1, 2].insert('foo', 0), ['foo', 1, 2]);
      deepEqual([1, 2].insert('foo', 1), [1, 'foo', 2]);
      return deepEqual([1, 2].insert('foo', 2), [1, 2, 'foo']);
    });
    return test('remove', function() {
      deepEqual(['foo', 2].remove('foo'), [2]);
      return deepEqual(['foo', 2].remove(2), ['foo']);
    });
  });

}).call(this);
