(function() {

  define(['jquery', './gutter', 'plugin/element/tracks', 'plugin/model/setting/is-super-scroll'], function($, f, Tracks, IsSuperScroll) {
    var prep_scenario, prep_sel, run_test, setup, test_collapse, test_expand, test_move, test_move_after, test_move_before;
    module('element/gutter');
    IsSuperScroll.value = function() {
      return false;
    };
    setup = function(html) {
      $('body > #tracks').remove();
      Tracks.init({
        $desk: $('body')
      });
      return $('#tracks').append(html);
    };
    prep_scenario = function(x) {
      return x.replace(/\G/g, '.gutter-o>.gutter-i').replace(/(\d)/g, '#$1.track');
    };
    prep_sel = function(x) {
      x = x.replace(/G0/g, '.gutter-o:has(.gutter-i:empty())');
      x = x.replace(/(\d)/g, '#$1.track');
      return x.replace(/G\((.+?)\)/g, '.gutter-o:has(.gutter-i:has($1))');
    };
    run_test = function(scenario, fn, get_fnarg, sel_expect) {
      setup($.zen(prep_scenario(scenario)));
      fn(get_fnarg());
      return equal($("" + (prep_sel(sel_expect))).length, 1);
    };
    test_collapse = function(scenario, tid, sel_expect) {
      return run_test(scenario, f.collapse, (function() {
        return {
          $track: $("#" + tid)
        };
      }), sel_expect);
    };
    test('collapse, with t, should move into new g', function() {
      return test_collapse('0', 0, 'G(0)');
    });
    test('collapse, with t;g should prepend to g', function() {
      return test_collapse('0+G>1', 0, 'G(0+1)');
    });
    test('collapse, with g;t should append to g', function() {
      return test_collapse('(G>1)+2', 2, 'G(1+2)');
    });
    test('collapse, with g0;t;g1 should append to g0 merged with g1', function() {
      return test_collapse('(G>1)+2+(G>3)', 2, 'G(1+2+3)');
    });
    test_expand = function(scenario, tid, sel_expect) {
      return run_test(scenario, f._expand_track, (function() {
        return {
          $track: $("#" + tid)
        };
      }), sel_expect);
    };
    test('_expand_track, with g(1), should expand to t', function() {
      test_expand('G>0', 0, '0');
      equal($('.gutter-i').length, 0);
      return equal($('.gutter-o').length, 0);
    });
    test('_expand_track, with t;g(1), should expand to t;g(0);t', function() {
      return test_expand('0+G>1', 1, '0+G0+1');
    });
    test('_expand_track, with g(1);t, should expand to t;g(0);t', function() {
      return test_expand('(G>0)+1', 0, '0+G0+1');
    });
    test('_expand_track, with g(3), should expand to g(1),t,g(1)', function() {
      return test_expand('G>0+1+2', 1, 'G(0)+1+G(2)');
    });
    test('_expand_track, with t;g(3), should expand to t;g;t;g(2)', function() {
      return test_expand('0+G>1+2+3', 1, '0+G0+1+G(2+3)');
    });
    test('_expand_track, with t;g(3), should expand to t;g(2);t', function() {
      return test_expand('0+G>1+2+3', 3, '0+G(1+2)+3');
    });
    test_move = function(track_id, target_id, target_placement, sel_expect) {
      return run_test('(G>0+1)+2+(G>3+4)+5', f.move, (function() {
        return {
          $track: $("#" + track_id),
          $target: $("#" + target_id),
          target_placement: "" + target_placement
        };
      }), sel_expect);
    };
    test_move_before = function(track_id, target_id, sel_expect) {
      return test_move(track_id, target_id, 'Before', sel_expect);
    };
    test('move, gutter subject before gutter target, should move in gutter', function() {
      return test_move_before(3, 1, 'G(0+3+1)+2+G(4)+5');
    });
    test('move, gutter subject before track target, should move into gutter left of track', function() {
      return test_move_before(3, 2, 'G(0+1+3)+2+G(4)+5');
    });
    test('move, track subject before gutter target, should merge and split gutters', function() {
      return test_move_before(2, 4, 'G(0+1+3)+2+G(4)+5');
    });
    test('move, track subject before track target, should move with new null gutter before track', function() {
      return test_move_before(2, 5, 'G(0+1+3+4)+2+G0+5');
    });
    test_move_after = function(track_id, target_id, sel_expect) {
      return test_move(track_id, target_id, 'After', sel_expect);
    };
    test('move, gutter subject after gutter target, should move in gutter', function() {
      return test_move_after(3, 1, 'G(0+1+3)+2+G(4)+5');
    });
    test('move, gutter subject after track target, should move into gutter right of track', function() {
      return test_move_after(1, 2, 'G(0)+2+G(1+3+4)+5');
    });
    test('move, track subject after gutter target, should merge and split gutters', function() {
      return test_move_after(2, 3, 'G(0+1+3)+2+G(4)+5');
    });
    test('move, track subject after track target, should move with new null gutter before track', function() {
      return test_move_after(2, 5, 'G(0+1+3+4)+5+G0+2');
    });
    return test('remove, with g0;g1, should merge g0 and g1', function() {
      return run_test('(G>0)+(G>2)', f.remove, (function() {
        return {
          $track: $("#1")
        };
      }), 'G(0+2)');
    });
  });

}).call(this);
