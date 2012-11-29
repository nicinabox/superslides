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
    test('It initializes', function() {
      ok($slides.data('superslides'));
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

    // test('.animate("next")', function() {
    //   $slides.superslides('animate', 'next');
    // });
    // test('.animate("prev")', function() {
    //   $slides.superslides('animate', 'prev');
    // });
    // test('.animate(1)', function() {
    //   $slides.superslides('animate', 1);
    // });
    // test('.animate("bogus")', function() {
    //   $slides.superslides('animate', 'bogus');
    // });
  });

}(jQuery));
