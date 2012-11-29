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
});