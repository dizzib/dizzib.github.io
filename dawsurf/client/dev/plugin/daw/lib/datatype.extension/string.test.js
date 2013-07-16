(function() {

  define(['./string'], function() {
    module('lib/datatype.extension/string');
    test('fracture', function() {
      var test;
      test = function(s, out) {
        return equal(s.fracture(), out.replace(/;/g, '&#8203;'));
      };
      test('1/2/3/4', '1/;2/;3/;4');
      test('2', '2');
      test('group-101 1', 'group-;101 1');
      test('fooBar gooBaz', 'foo;Bar goo;Baz');
      test('bandwidth', 'band;width');
      test('enabled', 'enab;led');
      test('feedbackx', 'feed;back;x');
      test('feedBackX', 'feed;Back;X');
      test('frequency', 'freq;uency');
      test('lowpassHz', 'low;pass;Hz');
      test('left/right', 'left/;right');
      test('MASTER', 'MAS;TER');
      test('Master', 'Mas;ter');
      test('Overdrive', 'Over;drive');
      test('Pattern', 'Pat;tern');
      test('PreviewF', 'Pre;view;F');
      test('Quality', 'Qual;ity');
      test('Release', 'Rel;ease');
      test('Resolution', 'Resol;ution');
      test('Rev1', 'Rev;1');
      test('Speaker', 'Spea;ker');
      test('Synthesizer', 'Synth;esizer');
      test('Usemidi', 'Use;midi');
      test('Voicing', 'Voic;ing');
      return test('Waveform', 'Wave;form');
    });
    return test('lenclass', function() {
      equal(''.lenclass(), 'len-min');
      equal('1234'.lenclass(), 'len-min');
      equal('12345'.lenclass(), 'len-min');
      equal('123456'.lenclass(), 'len-6');
      equal('123456789A'.lenclass(), 'len-10');
      equal('123456789ABCDE'.lenclass(), 'len-14');
      return equal('123456789ABCDEF'.lenclass(), 'len-max');
    });
  });

}).call(this);
