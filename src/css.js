var css = {
  containers: function() {
    if (that.init) {
      that.$el.css({
        height: that.height
      });

      that.$control.css({
        width: that.width * multiplier,
        left: -that.width
      });

      that.$container.css({

      });
    } else {
      $('body').css({
        margin: 0
      });

      that.$el.css({
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: that.height
      });

      that.$control.css({
        position: 'relative',
        transform: 'translate3d(0)',
        height: '100%',
        width: that.width * multiplier,
        left: -that.width
      });

      that.$container.css({
        display: 'none',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        position: 'relative',
        height: '100%'
      });
    }

    if (that.size() === 1) {
      that.$el.find(that.options.elements.nav).hide();
    }
  },
  images: function() {
    var $images = that.$container.find('img')
                                 .not(that.options.elements.preserve)

    $images.removeAttr('width').removeAttr('height')
      .css({
        "-webkit-backface-visibility": 'hidden',
        "-ms-interpolation-mode": 'bicubic',
        "position": 'absolute',
        "left": '0',
        "top": '0',
        "z-index": '-1',
        "max-width": 'none'
      });

    $images.each(function() {
      var thisImg = this,
          image_aspect_ratio = that.image._aspectRatio(this);

      if (!$.data(thisImg, 'processed')) {
        var img = new Image();
        img.onload = function() {

          that.image._scale(thisImg, image_aspect_ratio);
          that.image._center(thisImg, image_aspect_ratio);
          $.data(thisImg, 'processed', true);
        };
        img.src = this.src;

      } else {
        that.image._scale(thisImg, image_aspect_ratio);
        that.image._center(thisImg, image_aspect_ratio);
      }
    });
  },
  children: function() {
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
  }
}
