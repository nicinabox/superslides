  // Private Methods
  var initialize = function() {
    multiplier = that._findMultiplier();

    that.$el.on('click', that.options.elements.nav + " a", function(e) {
      e.preventDefault();

      that.stop();
      if ($(this).hasClass('next')) {
        that.animate('next', function() {
          that.start();
        });
      } else {
        that.animate('prev', function() {
          that.start();
        });
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

        that.css.containers();
        that.css.images();
      }, 10);
    });

    if (that.options.hashchange) {
      $(window).on('hashchange', function() {
        var hash = that._parseHash(), index;

        index = that._upcomingSlide(hash);

        if (index >= 0 && index !== that.current) {
          that.animate(index);
        }
      });
    }

    that.pagination._events();

    that.start();
    return that;
  };
