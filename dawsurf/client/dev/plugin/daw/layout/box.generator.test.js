(function() {

  define(['underscore', './box.generator'], function(_, f) {
    module('layout/box.generator');
    return test('generate', function() {
      var boxes, group_adds, i, j, name, ready_uid, uid, _i, _j, _len, _ref, _ref1;
      _ref = [[], [], 0], boxes = _ref[0], group_adds = _ref[1], ready_uid = _ref[2];
      f.on_box_create = function(b) {
        return boxes.push(b);
      };
      f.on_group_add = function(e) {
        return group_adds.push(e);
      };
      f.on_ready = function(e) {
        return equal(group_adds.length, 4);
      };
      f.init();
      _ref1 = ['', 'eq1', 'eq2', 'x'];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        name = _ref1[i];
        f.add_group({
          target_uid: 100,
          uid: (uid = i + 1),
          name: name
        });
        for (j = _j = 0; _j <= 1; j = ++_j) {
          f.add_param({
            target_uid: uid,
            uid: 10 * uid + j,
            name: "P" + j
          });
        }
      }
      f.generate({
        uid: 100
      });
      stop();
      return _.defer(function() {
        equal(boxes.length, 2);
        equal(boxes[0].type, 'wild');
        equal(boxes[1].type, 'tame');
        equal(boxes[1].name, 'eq');
        return _.defer(function() {
          equal(group_adds.length, 4);
          return start();
        });
      });
    });
  });

}).call(this);
