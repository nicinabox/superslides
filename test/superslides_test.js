/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {
  var testSetup = {
    testStart: function(data) {
      $slides = $('#slides');
      $slides.superslides();
    },
    init: function() {
      QUnit.testStart = testSetup.testStart;
    }
  };

  $(document).ready(testSetup.init);

  $(function() {
    var addSlide = function($slides) {
      var $li = $slides.find('li').first();
      var $clone = $li.clone().removeClass('current');
      $li.after($clone);
    };
    var rebuild = function($slides, options) {
      $slides.superslides('destroy');
      $slides.superslides(options);
    };

    test('Initialize', function() {
      ok($slides.data('superslides'), 'store object in data attribute');

      var $control = $slides.find('.slides-container').parent();
      equal($control.attr('class'), 'slides-control', 'wrap container in control element');
    });

    test('It should start on init', function() {
      expect(1);
      $slides.on('slides.started', function() {
        ok(true, 'Started');
      });

      rebuild($slides);
    });

    test('update()', function() {
      addSlide($slides);
      equal($slides.superslides('current'), 0, 'current == 0');
      equal($slides.superslides('next'), 1, 'next == 1');
      equal($slides.superslides('prev'), 1, 'prev == 1');
    });

    test('Starts on window hash index', function() {
      addSlide($slides);
      location.hash = '#1';
      rebuild($slides);

      var $current = $slides.find('.current');
      equal($current.index(), 1);
    });

    test('Adds ".current" to current slide', function() {
      var $current = $slides.find('.current');
      equal($current.index(), 0);

    });

    module('API', {
      setup: function() {
        $slides.superslides('stop');
      },
      teardown: function() {
      }
    });
    test('.size()', function() {
      var size = $slides.superslides('size');
      equal(size, 1, 'should be 1');
    });

    test('.start() - with options.play', function() {
      rebuild($slides, {
        play: true
      });

      ok($slides.data('superslides').play_id);
    });

    test('.stop()', function() {
      ok(!$slides.data('superslides').play_id);
    });

    test('.destroy()', function() {
      $slides.superslides('destroy');
      ok(!$slides.data('superslides'), 'should not have data superslides');
    });

    // test('.animate()', function() {
    // });

    test('.current', function() {
      equal($slides.superslides('current'), 0, 'current == 0');
    });

    test('.prev', function() {
      equal($slides.superslides('prev'), 0, 'prev == 0');
    });

    test('.next', function() {
      equal($slides.superslides('next'), 0, 'next == 0');
    });

    module('API Events');
    test('slides.init', function() {
      expect(1);
      $slides.on('slides.init', function(e) {
        ok('true');
      });

      rebuild($slides);
    });

    test('slides.started', function() {
      expect(1);
      $slides.on('slides.started', function(e) {
        ok('true');
      });

      rebuild($slides);
    });

    test('slides.changed', function() {
      expect(1);
      $slides.on('slides.changed', function(e) {
        ok('true');
      });

      addSlide($slides);
    });

  });

}(jQuery));
