/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
// $slides = [];
(function($) {
  var testSetup = {
    testStart: function(details) {
      $slides = $('#slides');
    },
    testDone: function(details) {
      if ($('#slides').data('superslides')) {
        $('#slides').superslides('destroy');
      }
    },
    init: function() {
      QUnit.testStart = testSetup.testStart;
      QUnit.testDone = testSetup.testDone;
    }
  };

  $(document).ready(testSetup.init);

  $(function() {
    var addSlide = function(count) {
      count = count || 1;
      var clones = [],
          $li = $slides.find('li').first();

      for (var i = 0; i < count; i++) {
        clones.push($li.clone().removeClass('current'));
      }
      $li.after(clones);
    };

    module('API Events');
    asyncTest('slides.init', 1, function() {
      $slides.on('slides.init', function(e) {
        ok('true');
        start();
      });

      $slides.superslides();
    });

    asyncTest('slides.started', 1, function() {
      $slides.on('slides.started', function(e) {
        ok(true);
        start();
      });

      $slides.superslides();
    });

    asyncTest('slides.changed', 1, function() {
      $slides.on('slides.changed', function(e) {
        ok(true);
        start();
      });

      $slides.superslides();
      addSlide(2);
      $slides.superslides('update');
    });

    asyncTest('slides.animated', function() {
      $slides.on('slides.animated', function(e) {
        ok(true);
        start();
      });

      addSlide($slides);
      $slides.superslides();
    });

    module('API');
    test('.size() - 1', function() {
      $slides.superslides();
      equal($slides.superslides('size'), 1, 'should be 1');
    });

    test('.size() - 3', function() {
      addSlide(2);
      // console.log($slides.html())
      $slides.superslides();
      equal($slides.superslides('size'), 3, 'should be 3');
    });

    asyncTest('.start() - with options.play', function() {
      $slides.superslides({
        play: true
      });

      setTimeout(function() {
        ok($slides.data('superslides').play_id);
        start();
      }, 100);
    });

    test('.stop()', function() {
      $slides.superslides({
        play: true
      });
      $slides.superslides('stop');

      ok(!$slides.data('superslides').play_id);
    });

    test('.destroy()', function() {
      $slides.superslides();
      $slides.superslides('destroy');
      ok($.isEmptyObject($.data($slides[0])), 'should not have any superslides data');
    });

    asyncTest('.update()', function() {
      $slides.on('slides.changed', function() {
        equal($slides.superslides('current'), 0, 'current == 0');
        equal($slides.superslides('next'), 1, 'next == 1');
        equal($slides.superslides('prev'), 2, 'prev == 2');
        start();
      });

      $slides.superslides();
      setTimeout(function() {
        addSlide(2);
        $slides.superslides('update');
      }, 100);
    });

    asyncTest('.animate()', function() {
      addSlide(2);
      $slides.superslides();

      $slides.on('slides.animated', function(e) {
        equal($slides.superslides('current'), 1);
        equal($slides.superslides('next'), 2);
        equal($slides.superslides('prev'), 0);

        start();
      });

      $slides.superslides('animate');
    });

    test('.mobile', function() {
      $slides.superslides();
      equal($slides.superslides('mobile'), (/mobile/i).test(navigator.userAgent));
    });

    test('.current - single slide', function() {
      $slides.superslides();

      equal($slides.superslides('current'), 0);
    });

    test('.current - 3 slides', function() {
      addSlide(2);
      $slides.superslides();

      equal($slides.superslides('current'), 0);
    });

    test('.prev - 0 slides', function() {
      $slides.superslides();
      equal($slides.superslides('prev'), 0);
    });

    test('prev - 3 slides', function() {
      addSlide(2);
      $slides.superslides();
      equal($slides.superslides('prev'), 2);
    });

    test('.next - 0 slides', function() {
      $slides.superslides();
      equal($slides.superslides('next'), 0);
    });

    test('.next - 3 slides', function() {
      addSlide(2);
      $slides.superslides();
      equal($slides.superslides('next'), 1);
    });

    module('hashchange');
    asyncTest('Uses hash index on init', function() {
      addSlide(2);

      $slides.on('slides.animated', function(e) {
        var $current = $slides.find('.current');
        equal($current.index(), 2, '#2 should be slide index 2');

        start();
        window.location.hash = '';
      });

      window.location.hash = '2';
      $slides.superslides();
    });

    asyncTest('Uses hash when changed', 1, function() {
      addSlide(2);
      $slides.superslides();
      $slides.data('superslides').animating = false;

      $slides.on('slides.animated', function(e) {
        var $current = $slides.find('.current');
        equal($current.index(), 2, '#2 should be slide index 2');

        start();
        window.location.hash = '';
      });

      window.location.hash = '2';
    });

    module('');
    test('Initialize', function() {
      $slides.superslides();

      ok($slides.data('superslides'), 'store object in data attribute');

      var $control = $slides.find('.slides-container').parent();
      equal($control.attr('class'), 'slides-control', 'wrap container in control element');
    });

    asyncTest('It should start on init', function() {
      $slides.on('slides.animated', function() {
        ok(true, 'Started');
        start();
      });

      $slides.superslides();
    });

    test('Adds ".current" to first slide', function() {
      $slides.superslides();
      var $current = $slides.find('.current');
      equal($current.index(), 0);
    });


  });

}(jQuery));
