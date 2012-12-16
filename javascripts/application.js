$(document).ready(function() {
  $(document).on('init.slides', function() {
    $('.loading-container').fadeOut(function() {
      $(this).remove();
    });
  });

  $('#slides').superslides({
    slide_easing: 'easeInOutCubic',
    slide_speed: 800,
    pagination: true,
    hashchange: true,
    scrollable: true
  });


  // Update verion based on github tags
  var url = 'https://api.github.com/repos/nicinabox/superslides/git/refs/tags';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(json) {
      var data          = json.data,
          version       = data.pop().ref.split('/').pop(),
          regex_version = /\d\.\d\.\d?/,
          download_link = $('#download').attr('href');

      $('.version').html(version);
      $('#download').attr('href', download_link.replace(regex_version, version));

    }
  });

  $(document).on('click', '#download', function(e) {
    window.location.hash = "#download";
    _gauges.push(['track']);
  });
});