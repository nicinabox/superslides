/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

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
      $slides.superslides();

      $slides.on('init.slides', function(e) {
        ok(true);
        start();
      });

    });

    asyncTest('started.slides', 1, function() {
      $slides.on('started.slides', function(e) {
        ok(true);
        start();
      });

      $slides.superslides();
    });

    asyncTest('stopped.slides', 1, function() {
      $slides.on('stopped.slides', function(e) {
        ok(true);
        start();
      });

      $slides.on('init.slides', function(e) {
        $slides.superslides('stop');
      });

      $slides.superslides();
    });

    asyncTest('updated.slides', 1, function() {
      $slides.on('updated.slides', function(e) {
        ok(true);
        start();
      });

      $slides.superslides();
      addSlide(2);
      $slides.superslides('update');
    });

    asyncTest('animated.slides', function() {
      addSlide(2);
      $slides.superslides();
      $slides.data('superslides').animating = false;

      $slides.on('animated.slides', function(e) {
        ok(true);
        start();
      });

      $slides.superslides('animate');
    });

    module('API');
    test('.size() should be 1', function() {
      $slides.superslides();
      equal($slides.superslides('size'), 1);
    });

    test('.size() should be 3', function() {
      addSlide(2);
      $slides.superslides();
      equal($slides.superslides('size'), 3);
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
      $slides.on('updated.slides', function() {
        var $pagination = $slides.find('.slides-pagination');
        var $navigation = $slides.find('.slides-navigation');

        equal($slides.superslides('current'), 0, 'current == 0');
        equal($slides.superslides('next'), 1, 'next == 1');
        equal($slides.superslides('prev'), 2, 'prev == 2');

        equal($pagination.children().length, 3, 'updates pagination');
        equal($pagination.children('.current').index(), 0, 'sets active pagination item');

        ok($navigation.is(':visible'), 'navigation is visible');

        start();
      });

      $slides.superslides();
      $slides.on('init.slides', function() {
        addSlide(2);
        $slides.superslides('update');
      });
    });

    asyncTest('.animate()', function() {
      addSlide(2);

      $slides.on('animated.slides', function(e) {
        equal($slides.superslides('current'), 1);
        equal($slides.superslides('next'), 2);
        equal($slides.superslides('prev'), 0);

        start();
      });

      $slides.on('init.slides', function() {
        $slides.superslides('animate');
      });

      $slides.superslides();

    });

    test('.mobile', function() {
      $slides.superslides();
      equal($slides.superslides('mobile'), (/mobile/i).test(navigator.userAgent));
    });

    asyncTest('.current - 3 slides', function() {
      addSlide(2);
      $slides.superslides();

      $slides.on('init.slides', function() {
        equal($slides.superslides('current'), 0);
        start();
      });
    });

    test('.prev - 0 slides', function() {
      $slides.superslides();
      equal($slides.superslides('prev'), 0);
    });

    asyncTest('prev - 3 slides', function() {
      addSlide(2);
      $slides.superslides();

      $slides.on('init.slides', function() {
        equal($slides.superslides('prev'), 2);
        start();
      });

    });

    test('.next - 0 slides', function() {
      $slides.superslides();
      equal($slides.superslides('next'), 0);
    });

    asyncTest('.next - 3 slides', function() {
      addSlide(2);
      $slides.superslides();

      $slides.on('init.slides', function() {
        equal($slides.superslides('next'), 1);
        start();
      });
    });

    module('hashchange');
    asyncTest('Uses hash index on init', function() {
      addSlide(2);

      $slides.on('init.slides', function(e) {
        var current = $slides.superslides('current');
        equal(current, 2, '#2 should be slide index 2');

        start();
        window.location.hash = '';
      });

      window.location.hash = '2';
      $slides.superslides({
        hashchange: true
      });
    });

    asyncTest('Uses hash when changed', 1, function() {
      addSlide(2);
      $slides.superslides({
        hashchange: true
      });
      $slides.data('superslides').animating = false;

      $slides.on('animated.slides', function(e) {
        var current = $slides.superslides('current');
        equal(current, 2, '#2 should be slide index 2');

        start();
        window.location.hash = '';
      });

      window.location.hash = '2';
    });

    asyncTest('It updates the window hash on animate', 1, function() {
      addSlide(2);

      $slides.on('animated.slides', function() {
        equal(window.location.hash, '#1', 'hash should be #1');
        start();
        window.location.hash = '';
      });

      $slides.on('init.slides', function() {
        $slides.superslides('animate', 1);
      });

      $slides.superslides({
        hashchange: true
      });
    });

    module('Single slide');
    test('Pagination does not display', function() {
      $slides.superslides();
      var $pagination = $slides.find('.slides-pagination');
      equal($pagination.length, 0);
    });

    test('Navigation does not display', function() {
      $slides.superslides();
      var $nav = $slides.find('.slides-navigation');
      ok(!$nav.is(':visible'));
    });

    asyncTest('.current', function() {
      $slides.superslides();

      $slides.on('init.slides', function() {
        equal($slides.superslides('current'), 0);
        start();
      });
    });

    module('');
    test('Initialize', function() {
      $slides.superslides();

      ok($slides.data('superslides'), 'store object in data attribute');

      var $control = $slides.find('.slides-container').parent();
      equal($control.attr('class'), 'slides-control', 'wrap container in control element');
    });

    asyncTest('It should start on init', function() {
      $slides.on('started.slides', function() {
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

    test('it shows navigation', function() {
      addSlide(2);
      $slides.superslides();
      var $nav = $slides.find('.slides-navigation');
      ok($nav.is(':visible'));
    });

  });

}(jQuery));
