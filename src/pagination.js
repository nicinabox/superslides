var pagination = {
  _setCurrent: function(i) {
    if (!that.$pagination) { return; }

    var $pagination_children = that.$pagination.children();

    $pagination_children.removeClass('current');
    $pagination_children.eq(i)
      .addClass('current');
  },
  _addItem: function(i) {
    var slide_number = i + 1,
        href = slide_number,
        $slide = that.$container.children().eq(i),
        slide_id = $slide.attr('id');

    if (slide_id) {
      href = slide_id;
    }

    if (that.size() > 1){ 
      that.$pagination.css({display: 'block'});
    } else {
      that.$pagination.css({display: 'none'});
    }; 

    var $item = $("<a>", {
      'href': "#" + href,
      'text': href
    });

    $item.appendTo(that.$pagination);
  },
  _setup: function() {
    if (!that.options.pagination) { return; }

    if (that.$pagination){
      that.$pagination.empty();
    } else {
      var $pagination = $("<nav>", {
        'class': that.options.elements.pagination.replace(/^\./, '')
      });
      that.$pagination = $pagination.appendTo(that.$el);
    }

    if (that.size() <= 1){ that.$pagination.css({ display: 'none' }); };

    for (var i = 0; i < that.size(); i++) {
      that.pagination._addItem(i);
    }
  },
  _events: function() {
    that.$el.on('click', that.options.elements.pagination + ' a', function(e) {
      e.preventDefault();

      var hash  = that._parseHash(this.hash), index;
      index = that._upcomingSlide(hash, true);

      if (index !== that.current) {
        that.animate(index, function() {
          that.start();
        });
      }
    });
  }
};
