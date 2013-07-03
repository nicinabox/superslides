Superslides.prototype.image = {
  _centerY: function(image) {
    var $img = $(image);

    $img.css({
      top: (this.height - $img.height()) / 2
    });
  },
  _centerX: function(image) {
    var $img = $(image);

    $img.css({
      left: (this.width - $img.width()) / 2
    });
  },
  _center: function(image) {
    this.image._centerX(image);
    this.image._centerY(image);
  },
  _aspectRatio: function(image) {
    if (!image.naturalHeight && !image.naturalWidth) {
      var img = new Image();
      img.src = image.src;
      image.naturalHeight = img.height;
      image.naturalWidth = img.width;
    }

    return image.naturalHeight / image.naturalWidth;
  },
  _scale: function(image, image_aspect_ratio) {
    image_aspect_ratio = image_aspect_ratio || this.image._aspectRatio(image);

    var container_aspect_ratio = this.height / this.width,
        $img = $(image);

    if (container_aspect_ratio > image_aspect_ratio) {
      $img.css({
        height: this.height,
        width: this.height / image_aspect_ratio
      });

    } else {
      $img.css({
        height: this.width * image_aspect_ratio,
        width: this.width
      });
    }
  }
};
