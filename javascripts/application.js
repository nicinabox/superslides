var env = {
  development: (function () {
    return window.location.hostname == 'localhost';
  })(),
  production: (function() {
    return window.location.hostname == 'nicinabox.github.com';
  })()
};

$(document).ready(function() {
  $('#slides').superslides({
    play: true,
    slide_easing: 'easeInOutCubic',
    slide_speed: 800,
    pagination: true,
    hashchange: true
  });

  // Update verion based on github tags
  var url = 'https://api.github.com/repos/nicinabox/superslides/git/refs/tags';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(json) {
      data = json.data;
      var version = data.pop().ref.split('/').pop();
      $('.version').html(version);
    }
  });

  $(document).on('click', '#download', function(e) {
    window.location.hash = "#download";
    _gauges.push(['track']);
    e.preventDefault();
  });
});