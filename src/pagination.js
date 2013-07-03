Superslides.prototype.pagination = {
  _setCurrent: function(i) {
    if (!this.$pagination) { return; }

    var $pagination_children = this.$pagination.children();

    $pagination_children.removeClass('current');
    $pagination_children.eq(i)
      .addClass('current');
  },
  _addItem: function(i) {
    var slide_number = i + 1,
        href = slide_number,
        $slide = this.$container.children().eq(i),
        slide_id = $slide.attr('id');

    if (slide_id) {
      href = slide_id;
    }

    var $item = $("<a>", {
      'href': "#" + href,
      'text': href
    });

    $item.appendTo(this.$pagination);
  },
  _setup: function() {
    if (!this.options.pagination || this.size() === 1) { return; }

    var $pagination = $("<nav>", {
      'class': this.options.elements.pagination.replace(/^\./, '')
    });

    this.$pagination = $pagination.appendTo(this.$el);

    for (var i = 0; i < this.size(); i++) {
      this.pagination._addItem(i);
    }
  },
  _events: function() {
    var that = this;
    if (!this.options.hashchange) {
      this.$el.on('click', that.options.elements.pagination + ' a', function(e) {
        e.preventDefault();
        var hash  = that._parseHash(this.hash),
            index = that._upcomingSlide(hash - 1);
        if (index !== that.current) {
          that.animate(index);
        }
      });
    }
  }
};
