/*! Superslides - v0.5.0 - 2012-12-01
* https://github.com/nicinabox/superslides
* Copyright (c) 2012 Nic Aitch; Licensed MIT */

var Superslides, name;

Superslides = function(el, options) {
  var $children, $container, $control, $window, adjustSlidesSize, animator, findMultiplier, height, init, initialize, multiplier, next, parse, parseHash, positions, prev, setupChildren, setupContainers, that, width,
    _this = this;
  if (options == null) {
    options = {};
  }
  this.options = $.extend({
    delay: 5000,
    play: false,
    slide_speed: 'normal',
    slide_easing: 'linear',
    nav_class: 'slides-navigation',
    container_class: 'slides-container',
    pagination: false,
    hashchange: false,
    scrollable: true
  }, options);
  that = this;
  $window = $(window);
  $container = $("." + this.options.container_class);
  $children = $container.children();
  $control = $('<div>', {
    "class": 'slides-control'
  });
  multiplier = 1;
  init = false;
  width = $window.width();
  height = $window.height();
  initialize = function() {
    if (init) {
      return;
    }
    init = true;
    multiplier = findMultiplier();
    positions();
    _this.mobile = /mobile/i.test(navigator.userAgent);
    $control = $container.wrap($control);
    $container.trigger('slides.init');
    _this.start();
    return _this;
  };
  findMultiplier = function() {
    if (_this.size() === 1) {
      return 1;
    } else {
      return 3;
    }
  };
  next = function() {
    var index;
    index = _this.current + 1;
    if (index === _this.size()) {
      index = 0;
    }
    return index;
  };
  prev = function() {
    var index;
    index = _this.current - 1;
    if (index === -1) {
      index = _this.size() - 1;
    }
    return index;
  };
  parse = function(direction) {
    switch (true) {
      case /next/.test(direction):
        return next();
      case /prev/.test(direction):
        return prev();
      case /\d/.test(direction):
        return direction;
      default:
        return next();
    }
  };
  parseHash = function(hash) {
    if (hash == null) {
      hash = window.location.hash;
    }
    hash = hash.replace(/^#/, '');
    if (hash) {
      return +hash;
    }
  };
  positions = function(current) {
    _this.current = current || 0;
    _this.next = next();
    _this.prev = prev();
    return false;
  };
  setupContainers = function() {
    return $control.css({
      width: width * multiplier,
      height: height,
      left: -width
    });
  };
  setupChildren = function() {
    $children.not('.current').css({
      display: 'none',
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      left: width,
      zIndex: 0
    });
    return adjustSlidesSize($children);
  };
  adjustSlidesSize = function($el) {
    that = _this;
    return $el.each(function(i) {
      $(this).width(width).height(height);
      return $(this).css({
        left: width
      });
    });
  };
  animator = function(callback) {
    var offset, position;
    that = _this;
    position = width * 2;
    offset = -position;
    $children.removeClass('current');
    $children.eq(_this.next).addClass('current').css({
      left: position,
      display: 'block'
    });
    return $control.animate({
      useTranslate3d: _this.mobile,
      left: offset
    }, options.slide_speed, options.slide_easing, function() {
      if (typeof callback === 'function') {
        callback();
      }
      positions(_this.next);
      _this.animating = false;
      return $container.trigger('slides.animated');
    });
  };
  this.$el = $(el);
  this.update = function() {
    positions();
    return $container.trigger('slides.changed');
  };
  this.destroy = function() {
    return $(el).removeData();
  };
  this.size = function() {
    return $container.children().length;
  };
  this.stop = function() {
    clearInterval(_this.play_id);
    return delete _this.play_id;
  };
  this.start = function() {
    $window.trigger('hashchange');
    _this.animate('next', function() {
      return $container.fadeIn('fast');
    });
    if (_this.options.play) {
      if (_this.play_id) {
        _this.stop();
      }
      _this.play_id = setInterval(function() {
        return false;
      }, options.delay);
    }
    return $container.trigger('slides.started');
  };
  this.animate = function(direction, callback) {
    var index;
    if (direction == null) {
      direction = 'next';
    }
    if (_this.animating) {
      return;
    }
    _this.animating = true;
    index = parse(direction);
    if (index > _this.size()) {
      return;
    }
    if (index === direction) {
      positions(index - 1);
    }
    return animator(callback);
  };
  $window.on('hashchange', function(e) {
    var index;
    index = parseHash();
    if (index) {
      return that.animate(index);
    }
  });
  return initialize();
};

name = 'superslides';

$.fn[name] = function(option, args) {
  var $this, data, method;
  if (typeof option === "string") {
    $this = $(this);
    data = $this.data(name);
    method = data[option];
    if (typeof method === 'function') {
      method = method.call($this, args);
    }
    return method;
  }
  return this.each(function() {
    var options;
    $this = $(this);
    data = $this.data(name);
    options = typeof option === 'object' && option;
    if (!data) {
      return $this.data(name, (data = new Superslides(this, options)));
    }
  });
};
