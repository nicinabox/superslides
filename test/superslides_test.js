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
      // $slides.on('init.slides', function() {
      //   console.log('init');
      // });
      // $slides.on('animating.slides', function() {
      //   console.log('animating');
      // });
      // $slides.on('animated.slides', function() {
      //   console.log('animated');
      // });
    },
    testDone: function() {
    },
    init: function() {
      QUnit.testStart = testSetup.testStart;
      QUnit.testDone = testSetup.testDone;
    }
  };

  $(document).ready(testSetup.init);

  module('API Events');

  asyncTest('init.slides', 1, function() {
    $slides.on('init.slides', function() {
      ok($slides.data('superslides'));
      start();
    });

    $slides.superslides();
  });

  asyncTest('started.slides', 1, function() {
    $slides.on('started.slides', function() {
      ok(true);
      start();
    });

    $slides.superslides();
  });

  asyncTest('stopped.slides', 1, function() {
    $slides.on('stopped.slides', function() {
      ok(true);
      start();
    });

    $slides.on('init.slides', function() {
      $slides.data('superslides').stop();
    });

    $slides.superslides();
  });

  asyncTest('updated.slides', 1, function() {
    $slides.on('updated.slides', function() {
      ok(true);
      start();
    });

    $slides.superslides();
    addSlide(2);
    $slides.data('superslides').update();
  });

  asyncTest('animated.slides', function() {
    addSlide(2);

    $slides.on('animated.slides', function() {
      ok(true);
      start();
    });

    $slides.superslides();
  });

  module('API methods');

  test('.size() should be 1', function() {
    $slides.superslides();
    equal($slides.data('superslides').size(), 1);
  });

  test('.size() should be 3', function() {
    addSlide(2);

    $slides.superslides();
    equal($slides.data('superslides').size(), 3);
  });

  test('.destroy() removes plugin from data', function() {
    $slides.superslides();
    $slides.data('superslides').destroy();
    ok($.isEmptyObject($.data($slides[0])), 'should not have any superslides data');
  });

  asyncTest('.current should be 0', function() {
    $slides.on('animated.slides', function() {
      equal($slides.data('superslides').current, 0);
      start();
    });

    $slides.superslides();
  });

  asyncTest('.next should be 0', function() {
    $slides.on('animated.slides', function() {
      equal($slides.data('superslides').next, 0);
      start();
    });
    $slides.superslides();
  });

  asyncTest('.next should be 1', function() {
    addSlide(2);
    var animated = 1;

    $slides.on('animated.slides', function() {
      animated += 1;

      if (animated === 2) {
        equal($slides.data('superslides').next, 1);
        start();
      }
    });

    $slides.on('init.slides', function() {
      $slides.superslides('animate');
    });

    $slides.superslides();
  });

  asyncTest('.prev should be 0', function() {
    $slides.on('init.slides', function() {
      equal($slides.data('superslides').prev, 0);
      start();
    });
    $slides.superslides();
  });

  asyncTest('.prev should be 2', function() {
    addSlide(2);

    $slides.on('init.slides', function() {
      equal($slides.data('superslides').prev, 2);
      start();
    });

    $slides.superslides();
  });

  asyncTest('.start() should assign play_id', function() {
    $slides.superslides({
      play: true
    });

    setTimeout(function() {
      ok($slides.data('superslides').play_id);
      start();
    }, 100);
  });

  test('.stop() should remove play_id', function() {
    $slides.superslides({
      play: true
    });
    $slides.data('superslides').stop();

    ok(!$slides.data('superslides').play_id);
  });

  asyncTest('.update() updates positions', 6, function() {

    $slides.on('updated.slides', function() {
      var s = $slides.data('superslides');

      equal(s.current, 0, 'current should be 0 after update');
      equal(s.next, 1, 'next should be 1 after update');
      equal(s.prev, 2, 'prev should be 2 after update');
    });

    $slides.on('init.slides', function() {
      var s = $slides.data('superslides');

      equal(s.current, 0, 'current should be 0');
      equal(s.next, 0, 'next should be 0');
      equal(s.prev, 0, 'prev should be 0');

      start();

      addSlide(2);
      $slides.superslides('update');
    });

    $slides.superslides();
  });

  asyncTest('.animate() sets slide positions', function() {
    addSlide(2);
    var animated = 0;

    $slides.on('animated.slides', function() {
      var s = $slides.data('superslides');
      animated += 1;

      if (animated === 2) {
        equal(s.current, 1, 'current should be 1');
        equal(s.next, 2, 'next should be 2');
        equal(s.prev, 0, 'prev should be 0');

        start();
      } else {
        $slides.superslides('animate');
      }
    });

    $slides.superslides();
  });

}(jQuery));
