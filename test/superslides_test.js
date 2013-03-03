(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  var $slides;

  var addSlide = function(count) {
    count = count || 1;
    var clones = [],
        $li = $slides.find('li').first();

    for (var i = 0; i < count; i++) {
      clones.push($li.clone().removeClass('current'));
    }
    $li.after(clones);
  };

  var testSetup = {
    testStart: function() {
      $slides = $('#slides');
    },
    testDone: function() {
      // if ($('#slides').data('superslides')) {
      //   $('#slides').superslides('destroy');
      // }
    },
    init: function() {
      QUnit.testStart = testSetup.testStart;
      QUnit.testDone = testSetup.testDone;
    }
  };

  $(document).ready(testSetup.init);

  module('API');

  test('.size() should be 1', function() {
    $slides.superslides();
    equal($slides.data('superslides').size(), 1);
  });

  test('.size() should be 3', function() {
    addSlide(2);

    $slides.superslides();
    equal($slides.data('superslides').size(), 3);
  });

  test('.destroy()', function() {
    $slides.superslides();
    $slides.data('superslides').destroy();
    ok($.isEmptyObject($.data($slides[0])), 'should not have any superslides data');
  });

  test('.mobile', function() {
    $slides.superslides();
    equal($slides.data('superslides').mobile, (/mobile/i).test(navigator.userAgent));
  });

  test('.current should be 0', function() {
    $slides.superslides();
    equal($slides.data('superslides').current, 0);
  });

  test('.next should be 0', function() {
    $slides.superslides();
    equal($slides.data('superslides').next, 0);
  });

  test('.next should be 1', function() {
    addSlide(2);

    $slides.superslides();
    equal($slides.data('superslides').next, 1);
  });

  test('.prev should be 0', function() {
    $slides.superslides();
    equal($slides.data('superslides').prev, 0);
  });

  test('.prev should be 1', function() {
    addSlide(2);

    $slides.superslides();
    equal($slides.data('superslides').prev, 2);
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

}(jQuery));
