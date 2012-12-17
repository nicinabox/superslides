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

  module('API');
  test('.size()', function() {
    size = $slider.superslides('size');
    equal(size, 1, 'should be 1');
  });

  test('.play()', function() {
    $slider.superslides('play');
    ok($slider.data('superslides').play_id);
  });

  test('.stop()', function() {
    $slider.superslides('stop');
    ok(!$slider.data('superslides').play_id);
  });
});