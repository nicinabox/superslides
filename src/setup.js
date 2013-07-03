// Private Methods
var initialize = function() {
  multiplier = that._findMultiplier();
  that._findPositions();

  that.$control = that.$container.wrap($control).parent('.slides-control');

  that.width  = that._findWidth();
  that.height = that._findHeight();

  setupCss();
  setupChildren();
  setupContainers();
  setupImages();
  that.pagination._setup();

  that.$el.on('click', that.options.elements.nav + " a", function(e) {
    e.preventDefault();

    that.stop();
    if ($(this).hasClass('next')) {
      that.animate('next');
    } else {
      that.animate('prev');
    }
  });

  $(document).on('keyup', function(e) {
    if (e.keyCode === 37) {
      that.animate('prev');
    }
    if (e.keyCode === 39) {
      that.animate('next');
    }
  });

  $(window).on('resize', function() {
    setTimeout(function() {
      var $children = that.$container.children();

      that.width  = that._findWidth();
      that.height = that._findHeight();

      $children.css({
        width: that.width,
        left: that.width
      });

      setupContainers();
      setupImages();
    }, 200);
  });

  $(window).on('hashchange', function() {
    var hash = that._parseHash(), index;

    if (hash && !isNaN(hash)) {
      // Minus 1 here because we don't want the url
      // to be zero-indexed
      index = that._upcomingSlide(hash - 1);

    } else {
      index = that._upcomingSlide(hash);
    }

    if (index >= 0 && index !== that.current) {
      that.animate(index);
    }
  });

  that.pagination._events();

  that.start();
  return that;
};

var setupCss = function() {
  $('body').css({
    margin: 0
  });

  that.$el.css({
    position: 'relative',
    overflow: 'hidden',
    width: '100%'
  });

  that.$control.css({
    position: 'relative',
    transform: 'translate3d(0)',
    height: '100%'
  });

  that.$container.css({
    display: 'none',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    position: 'relative',
    height: '100%'
  });

  that.$container.find('img').not(that.options.elements.preserve).css({
    "-webkit-backface-visibility": 'hidden',
    "-ms-interpolation-mode": 'bicubic',
    "position": 'absolute',
    "left": '0',
    "top": '0',
    "z-index": '-1',
    "max-width": 'none'
  }).removeAttr('width').removeAttr('height');

  if (that.size() === 1) {
    that.$el.find(that.options.elements.nav).hide();
  }
};

var setupChildren = function() {
  var $children = that.$container.children();

  if ($children.is('img')) {
    $children.wrap('<div>');

    // move id attribute
    $children.each(function() {
      var id = $(this).attr('id');
      $(this).removeAttr('id');
      $(this).parent().attr('id', id);
    });

    $children = that.$container.children();
  }

  $children.css({
    position: 'absolute',
    overflow: 'hidden',
    display: 'none',
    height: '100%',
    width: that.width,
    left: that.width * 2,
    top: 0,
    zIndex: 0
  });
};

var setupImages = function() {
  var $images = that.$container.find('img')
                  .not(that.options.elements.preserve);

  $images.each(function() {
    var thisImg = this;
    var img = new Image();
    img.onload = function() {
      var image_aspect_ratio = that.image._aspectRatio(this);

      that.image._scale(thisImg, image_aspect_ratio);
      that.image._center(thisImg, image_aspect_ratio);
    };
    img.src = this.src;
  });
};

var setupContainers = function() {
  $('body').css({
    margin: 0
  });

  that.$el.css({
    height: that.height
  });

  that.$control.css({
    width: that.width * multiplier,
    left: -that.width
  });
};
