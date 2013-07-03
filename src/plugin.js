// jQuery plugin definition

$.fn[plugin] = function (options) {
  return this.each(function() {
    if (!$.data(this, plugin)) {
      $.data(this, plugin, new Superslides(this, options));
      $(this).trigger('init.slides');
    }
  });
};
