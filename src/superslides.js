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
      animation_speed: 'normal',
      animation_easing: 'linear',
      animation: 'slide',
      inherit_width_from: window,
      inherit_height_from: window,
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

    var that       = this,
        multiplier = 1;

    this.$el        = $(el);
    this.$control   = $('<div>', { "class": 'slides-control' });
    this.$container = this.$el.find("." + this.options.classes.container);
    this.animation  = this.fx[this.options.animation].bind(this);

    // Private Methods
    var initialize = function() {
      multiplier = that.findMultiplier();
      that.findPositions();

      that.$control = that.$container.wrap(that.$control).parent('.slides-control');

      setupCss();
      setupContainers();

      that.start();

      that.init = true;
      return that;
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

      that.$control.css({
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

    return initialize();
  };

  Superslides.prototype = {
    mobile: (/mobile/i).test(navigator.userAgent),
    width: $(window).width(),
    height: $(window).height(),

    findMultiplier: function() {
      return this.size() === 1 ? 1 : 3;
    },

    upcomingSlide: function(direction) {
      if ((/next/).test(direction)) {
        return this.nextInDom();

      } else if ((/prev/).test(direction)) {
        return this.prevInDom();

      } else if ((/\d/).test(direction)) {
        return direction;

      } else {
        return false;
      }
    },

    findPositions: function(current, thisRef) {
      thisRef = thisRef || this;

      if (current === undefined) {
        current = -1;
      }

      thisRef.current = current;
      thisRef.next    = thisRef.nextInDom();
      thisRef.prev    = thisRef.prevInDom();
    },

    nextInDom: function() {
      var index = this.current + 1;

      if (index === this.size()) {
        index = 0;
      }

      return index;
    },

    prevInDom: function() {
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
      this.$el.trigger('updated.slides');
    },

    stop: function() {
      clearInterval(this.play_id);
      delete this.play_id;

      this.$el.trigger('stopped.slides');
    },

    start: function() {
      var that = this;

      this.animate();

      if (this.options.play) {
        if (this.play_id) {
          this.stop();
        }

        this.play_id = setInterval(function() {
          that.animate();
        }, this.options.play);
      }

      this.$el.trigger('started.slides');
    },

    animate: function(direction, userCallback) {
      var that = this,
          orientation = {};

      if (this.animating) {
        return;
      }

      this.animating = true;

      if (!direction) {
        direction = 'next';
      }

      orientation.upcoming_slide = this.upcomingSlide(direction);

      if (orientation.upcoming_slide >= this.size()) {
        return;
      }

      orientation.outgoing_slide    = this.current;
      orientation.upcoming_position = this.width * 2;
      orientation.offset            = -orientation.upcoming_position;

      if (direction === 'prev' || direction < orientation.outgoing_slide) {
        orientation.upcoming_position = 0;
        orientation.offset            = 0;
      }

      this.animation(orientation, function() {
        that.findPositions(orientation.upcoming_slide, that);

        if (typeof userCallback === 'function') {
          userCallback();
        }

        that.animating = false;
        if (that.init) {
          that.$el.trigger('animated.slides');
        }
      });
    }
  };

  Superslides.prototype.fx = {
    slide: function(orientation, callback) {
      console.log(this);
      this.$control.animate({
        left: orientation.offset
      },
      this.options.animation_speed,
      this.options.animation_easing,
      callback);
      // callback();
    }
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

  // Prototype's .bind method
  if (!Function.prototype.bind) { // check if native implementation available
    Function.prototype.bind = function(){
      var fn = this, args = Array.prototype.slice.call(arguments),
          object = args.shift();
      return function(){
        return fn.apply(object,
          args.concat(Array.prototype.slice.call(arguments)));
      };
    };
  }


})(this, jQuery);