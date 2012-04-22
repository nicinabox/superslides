var parameterize = function(str) {
  return str.toLowerCase().replace(/['\.,]/g, '').replace(/\s/g, '-')
}

$(document).ready(function() {
  $('#slides').superslides({
    play: true,
    slide_easing: 'easeInOutCubic',
    slide_speed: 800
  })
  .on('slides.animated', function(e) {
    title = parameterize($('.current h1').text())
    History.pushState({ page: title }, null, title);
    _gauges.push(['track']);
  });
});