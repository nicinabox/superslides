  this.css = css;
  this.image = image;
  this.pagination = pagination;
  this.fx = fx;
  this.animation = this.fx[this.options.animation];

  this.$control = this.$container.wrap($control).parent('.slides-control');

  that._findPositions();
  that.width  = that._findWidth();
  that.height = that._findHeight();

  this.css.children();
  this.css.containers();
  this.css.images();
  this.pagination._setup();

  return initialize();
};
