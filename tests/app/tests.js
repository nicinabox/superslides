var $slider;
$(function() {
  var appendSlider = function() {
    var html = _.template($('#slides-template').html());
    $('#qunit-fixture').html(html);
  };
  appendSlider();
  $slider = $('#slides').superslides({
    play: true
  });

  test('It initializes', function() {
    ok($slider.data('superslides'));
  });

  module('API', {
    setup: function() {
      $slider.superslides('stop');
    },
    teardown: function() {
    }
  });
  test('.size()', function() {
    size = $slider.superslides('size');
    equal(size, 1, 'should be 1');
  });

  test('.start()', function() {
    $slider.superslides('start');
    ok($slider.data('superslides').play_id);
  });

  test('.stop()', function() {
    ok(!$slider.data('superslides').play_id);
  });

  test('.animate("next")', function() {
    $slider.superslides('animate', 'next');
  });
  test('.animate("prev")', function() {
    $slider.superslides('animate', 'prev');
  });
  test('.animate(1)', function() {
    $slider.superslides('animate', 1);
  });
  test('.animate("bogus")', function() {
    $slider.superslides('animate', 'bogus');
  });
});