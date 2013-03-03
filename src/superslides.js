/*
 * superslides
 * https://github.com/nicinabox/superslides
 *
 * Copyright (c) 2013 Nic Aitch
 * Licensed under the MIT license.
 */

(function(window, $) {

  var Superslides, plugin = 'superslides';

  Superslides = function(el, options) {
    this.options = $.extend({
      play: false,
      slide_speed: 'normal',
      slide_easing: 'linear',
      animation: 'slide',
      pagination: true,
      hashchange: false,
      scrollable: true,
      classes: {
        preserve: 'preserve',
        nav: 'slides-navigation',
        container: 'slides-container',
        pagination: 'slides-pagination'
      }
    }, options);

    var that        = this,
        $window     = $(window),
        $control    = $('<div>', { "class": 'slides-control' }),
        // $pagination = $("<nav>", { "class": this.options.classes.pagination }),
        multiplier  = 1,
        init        = false,
        width       = $window.width(),
        height      = $window.height();

    this.$el        = $(el);
    this.$container = this.$el.find("." + this.options.classes.container);

    var initialize = function() {
      if (init) { return; }

      multiplier = findMultiplier();
      that.findPositions();

      $control = that.$container.wrap($control).parent('.slides-control');

      setupCss();
      setupContainers();
      toggleNav();
      // addPagination();

      that.start();

      return that;
    };

    var findMultiplier = function() {
      // return this.size() === 1 ? 1 : 3;
    };

    var setupCss = function() {
      $('body').css({
        margin: 0
      });

      that.$el.css({
        position: 'relative',
        overflowX: 'hidden',
        width: '100%'
      });

      $control.css({
        position: 'relative',
        transform: 'translate3d(0)'
      });

      that.$container.css({
        display: 'none',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        position: 'relative'
      });

      that.$container.find('img').not("." + that.options.classes.preserve).css({
        "-webkit-backface-visibility": 'hidden',
        "-ms-interpolation-mode": 'bicubic',
        "position": 'absolute',
        "left": '0',
        "top": '0',
        "z-index": '-1'
      });
    };

    var setupContainers = function() {
      $('body').css({
        margin: 0,
        overflow: 'hidden'
      });

      that.$el.css({
        height: height
      });

      $control.css({
        width: width * multiplier,
        left: -width
      });

      // if (that.options.scrollable) {
      //   that.$children.each(function() {
      //     if ($('.scrollable', that).length) { return; }

      //     $(that).wrapInner('<div class="scrollable" />');
      //     return $(that).find('img').not("." + that.options.classes.preserve)
      //       .insertBefore($('.scrollable', that));
      //   });
      // }
    };

    var toggleNav = function() {
      // if (this.size() > 1) {
      //   $("." + this.options.classes.nav).show();
      // } else {
      //   $("." + this.options.classes.nav).hide();
      // }
    };

    initialize();
  };

  Superslides.prototype = {
    mobile: (/mobile/i).test(navigator.userAgent),

    findPositions: function(current) {
      if (!current) {
        current = 0;
      }

      this.current = current;
      this.next    = this.findNext();
      this.prev    = this.findPrev();
    },

    findNext: function() {
      var index = this.current + 1;

      if (index === this.size()) {
        index = 0;
      }

      return index;
    },

    findPrev: function() {
      var index = this.current - 1;

      if (index < 0) {
        index = this.size() - 1;
      }

      return index;
    },

    size: function() {
      return this.$container.children().length;
    },

    destroy: function() {
      return this.$el.removeData();
    },

    update: function() {
      this.findPositions(this.current);

      // addPagination();
      // toggleNav();

      this.$el.trigger('updated.slides');
    },

    stop: function() {
      clearInterval(this.play_id);
      delete this.play_id;

      this.$el.trigger('stopped.slides');
    },

    start: function() {
      // setupChildren();

      // if (this.options.hashchange) {
      //   $window.trigger('hashchange');
      // }

      // this.animate('next');

      if (this.options.play) {
        if (this.play_id) {
          this.stop();
        }

        this.play_id = setInterval(function() {
          // this.animate('next');
        }, this.options.play);
      }

      this.$el.trigger('started.slides');
    }
  };

  Superslides.prototype.fx = {

  };

  // jQuery plugin definition
  $.fn[plugin] = function (options) {
    return this.each(function() {
      if (!$.data(this, plugin)) {
        $.data(this, plugin, new Superslides(this, options));
        $(this).trigger('init.slides');
      }
    });
  };

})(this, jQuery);