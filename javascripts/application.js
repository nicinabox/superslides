$(document).ready(function() {
  $('#slides').superslides({
    play: true,
    slide_easing: 'easeInOutCubic',
    slide_speed: 800,
    pagination: true
  });

  // Update verion based on github tags
  var url = 'https://api.github.com/repos/nicinabox/superslides/git/refs/tags';
  $.getJSON(url, function(data, textStatus, xhr) {
    var version = data.pop().ref.split('/').pop();
    $('.version').html(version);
  });

});