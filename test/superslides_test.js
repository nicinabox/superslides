/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {
  var testSetup = {
    testStart: function(data) {
      $slides = $('#slides');
      $slides.superslides({
        play: true
      });
    },
    init: function() {
      QUnit.testStart = testSetup.testStart;
      QUnit.config.reorder = false;
    }
  };

  $(document).ready(testSetup.init);

  $(function() {
    var addSlide = function($slides) {
      $li = $slides.find('li').first();
      $clone = $li.clone();
      $li.after($clone);
    };

    test('Initialize and store object in data attribute', function() {
      ok($slides.data('superslides'));
    });

    test('update()', function() {
      addSlide($slides);
      equal($slides.superslides('current'), 0, 'current == 0');
      equal($slides.superslides('next'), 1, 'next == 1');
      equal($slides.superslides('prev'), 1, 'prev == 1');
    });

    module('API', {
      setup: function() {
        $slides.superslides('stop');
      },
      teardown: function() {
      }
    });
    test('.size()', function() {
      size = $slides.superslides('size');
      equal(size, 1, 'should be 1');
    });

    test('.start()', function() {
      $slides.superslides('start');
      ok($slides.data('superslides').play_id);
    });

    test('.stop()', function() {
      ok(!$slides.data('superslides').play_id);
    });

    test('.current', function() {
      equal($slides.superslides('current'), 0, 'current == 0');
    });

    test('.prev', function() {
      equal($slides.superslides('prev'), 0, 'prev == 0');
    });

    test('.next', function() {
      equal($slides.superslides('next'), 0, 'next == 0');
    });

    module('Events');
    test('slides.updated', function() {
      expect(1);
      $slides.on('slides.updated', function(e) {
        ok('true');
      });

      addSlide($slides);
    });
  });

}(jQuery));
