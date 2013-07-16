(function() {

  define(['./device.partitioner'], function(f) {
    module('layout/device.partitioner');
    test('partition, with disparate same-size groups, should return wild partition', function() {
      var parts;
      parts = f.partition(['a', 'b', 'c', 'd'], [1, 1, 1, 1]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['a', 'b', 'c', 'd']
        }
      ]);
    });
    test('partition, with contiguous unique-size groups, should return wild partition', function() {
      var parts;
      parts = f.partition(['1-', '2-', '3-', '4-'], [1, 2, 3, 4]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['1-', '2-', '3-', '4-']
        }
      ]);
    });
    test('partition, with contiguous collapsed (size = 1) groups, should return wild partition', function() {
      var parts;
      parts = f.partition(['1-', '2-', '3-', '4-'], [1, 1, 1, 1]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['1-', '2-', '3-', '4-']
        }
      ]);
    });
    test('partition, with contiguous expanded (size > 1) groups, should return tame partition', function() {
      var parts;
      parts = f.partition(['Eq1', 'Eq2', 'Eq3', 'Eq4'], [2, 2, 2, 2]);
      return deepEqual(parts, [
        {
          type: 'tame',
          name: 'Eq',
          group_names: ['Eq1', 'Eq2', 'Eq3', 'Eq4']
        }
      ]);
    });
    test('partition, with contiguous collapsed/expanded groups, should return wild and tame partitions', function() {
      var parts;
      parts = f.partition(['Eq1', 'Eq2', 'Eq3', 'Eq4'], [1, 2, 2, 1]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['Eq1', 'Eq4']
        }, {
          type: 'tame',
          name: 'Eq',
          group_names: ['Eq2', 'Eq3']
        }
      ]);
    });
    test('partition, with many disparate and contiguous groups, should return wild and tame partitions', function() {
      var parts;
      parts = f.partition(['A', 'B', 'C', 'd', 'Eq1-', 'Eq2-', 'Eq3-', 'Eq4-', 'Eq5-', 'Eq10-', 'SpkLeft', 'SpkRight', 'C1', 'C2', 'e', 'f'], [1, 2, 3, 4, 5, 5, 5, 5, 6, 5, 7, 7, 8, 8, 9, 10]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['A', 'B', 'C', 'd', 'Eq5-', 'e', 'f']
        }, {
          type: 'tame',
          name: 'Eq-',
          group_names: ['Eq1-', 'Eq2-', 'Eq3-', 'Eq4-', 'Eq10-']
        }, {
          type: 'tame',
          name: 'Spk',
          group_names: ['SpkLeft', 'SpkRight']
        }, {
          type: 'tame',
          name: 'C',
          group_names: ['C1', 'C2']
        }
      ]);
    });
    test('partition, bug where VST:AmpegSVX Amp B-15R and Amp BA-500 are not at the top', function() {
      var parts;
      parts = f.partition(['*', 'Amp B-15R', 'Amp BA-500 Band', 'Ampeg SCP-O', 'Analog', 'Stomp'], [16, 10, 10, 6, 15, 2]);
      return deepEqual(parts, [
        {
          type: 'wild',
          group_names: ['*', 'Amp B-15R', 'Amp BA-500 Band', 'Ampeg SCP-O', 'Analog', 'Stomp']
        }
      ]);
    });
    test('partition, where names have multiple groups of digits, should find tame partitions', function() {
      var parts;
      parts = f.partition(['Keyb1 Glide1Y', 'Keyb1 Glide2Y'], [2, 2]);
      return deepEqual(parts, [
        {
          type: 'tame',
          name: 'Keyb1 GlideY',
          group_names: ['Keyb1 Glide1Y', 'Keyb1 Glide2Y']
        }
      ]);
    });
    test('partition, where tame partition name would be empty, should derive from group names', function() {
      var parts;
      parts = f.partition(['left', 'right'], [2, 2]);
      return deepEqual(parts, [
        {
          type: 'tame',
          name: 'left/right',
          group_names: ['left', 'right']
        }
      ]);
    });
    return test('partition, where tame partition name would be empty, should derive from group names', function() {
      var parts;
      parts = f.partition(['1', '2', '3', '4'], [2, 2, 2, 2]);
      return deepEqual(parts, [
        {
          type: 'tame',
          name: '1/2/3/4',
          group_names: ['1', '2', '3', '4']
        }
      ]);
    });
  });

}).call(this);
