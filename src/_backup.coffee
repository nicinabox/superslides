$window = $(window)
width = $window.width()
height = $window.height()
is_mobile = navigator.userAgent.match(/mobile/i)

# State control
first_load = true
play_interval = 0
animating = false
size = 0
multiplier = 3
$control = []
$container = []
$nav = []
$children = []

# Private methods
api =
  setup: ->
    setupContainers()
    setupChildren()

  setupContainers: ->
    $control.css
      width: width * multiplier
      height: height
      left: -width if size > 1

  setupChildren: ->
    if $.fn.superslides.options.scrollable
      $children.each ->
        $scrollable = $(this).find('.scrollable')
        unless $scrollable
          $(this).wrapInner('<div class="scrollable" />')

        $scrollable.find('img').not('.keep-original')
                    .insertBefore($scrollable)

    if size > 1
      $children.not('.current').css
        display: 'none'
        position: 'absolute'
        overflow: 'hidden'
        top: 0
        left: width
        zIndex: 0

    adjustSlidesSize $children

  loadImage: ($img, callback) ->
    $("<img>",
        src: $img.attr('src')
      ).load ->
        if callback instanceof Function
          callback(this)

  setVerticalPosition: ($img) ->
    scale_height = width / $img.data('aspect-ratio')

    if scale_height >= height
      $img.css
        top: -(scale_height - height) / 2
    else
      $img.css
        top: 0

  setHorizontalPosition: ($img) ->
    scale_width = height * $img.data('aspect-ratio')

    if scale_width >= width
      $img.css
        left: -(scale_width - width) / 2
    else
      $img.css
        left: 0

  adjustImagePosition: ($img) ->
    unless $img.data('aspect-ratio')
      loadImage $img, (image) ->
        $img.removeAttr('width').removeAttr('height')
        $img.data('aspect-ratio', image.width / image.height)
        adjustImagePosition $img
      return

    setHorizontalPosition($img)
    setVerticalPosition($img)

    $container.trigger('slides.image_adjusted')

  adjustSlidesSize: ($el) ->
    $el.each (i) ->
      $(this).width(width).height(height)

      if size > 1
        $(this).css
          left: width

      adjustImagePosition $('img', this).not('.keep-original')

    $container.trigger('slides.sized')

  addPaginationItem: (i) ->
    $pagination = $(".slides-pagination")
    unless i >= 0
      i = size - 1 # size is not zero indexed

    $pagination.append $("<a>",
      href: "#" + i
    )

  start: ->
    if size > 1
      if location.hash
        index = location.hash.replace(/^#/, '')
      else
        index = (if first_load then 0 else "next")

      animate index
      play()
    else
      $container.fadeIn('fast')
      $(".#{$.fn.superslides.options.nav_class}").hide()

  stop: ->
    clearInterval play_interval

  play: ->
    if $.fn.superslides.options.play
      stop() if play_interval
      play_interval = setInterval ->
        animate (if first_load then 0 else "next")
      , $.fn.superslides.options.delay

  update: ->
    $children = $container.children()
    $.fn.superslides.api.size = size = $children.length

    setupChildren()
    addPaginationItem()

    $container.trigger('slides.updated')

  append: ($el) ->
    $container.append($el)
    update()

  animate: (direction) ->
    return if animating || # Mid slide
              direction >= size # Out of range


    animating = true
    prev = this.current ||
           direction - 1 ||
           0

    switch direction
      when 'next'
        position = width * 2
        direction = -position
        next = this.current + 1
        next = 0 if size == next
      when 'prev'
        position = direction = 0
        next = this.current - 1
        next = size - 1 if next == -1
      else
        next = +direction
        if isNaN(next)
          next = prev = 0
          animating = false

        if next > prev
          position = width * 2
          direction = -position
        else
          position = direction = 0

    return false if direction == this.current

    this.current = next
    $children.removeClass('current')
             .eq(this.current).css
                left: position
                display: 'block'

    $control.animate(
      useTranslate3d: (if is_mobile then true else false)
      left: direction
    , $.fn.superslides.options.slide_speed
    , $.fn.superslides.options.slide_easing
    , =>
      # reset control position
      $control.css
        left: -width

      # reset and show next
      $children.eq(next).css
        left: width
        zIndex: 2

      # reset previous slide
      $children.eq(prev).css
        left: width
        display: 'none'
        zIndex: 0

      $children.eq(this.current).addClass('current')

      if first_load
        $container.fadeIn('fast')
        $container.trigger('slides.initialized')
        first_load = false

      animating = false
      $container.trigger('slides.animated', [this.current, next, prev])
    )
    this.current

$.fn.superslides = (option) ->
  if typeof options == "string"
    api = $.fn.superslides.api
    method = options

    # Convert arguments to real array
    args = Array.prototype.slice.call(arguments)
    args.splice(0, 1)

    api[method].apply(this, args)
  else
    # Defaults
    options = $.fn.superslides.options = $.extend $.fn.superslides.options, options

    # Setup
    $(".#{options.container_class}", this).wrap('<div class="slides-control" />')

    # Cache elements
    $control = $('.slides-control', this)
    $container = $(".#{options.container_class}")
    $nav = $(".#{options.nav_class}")
    $children = $container.children()

    $.fn.superslides.api.size = size = $children.length
    multiplier = (if size == 1 then 1 else 3)

    this.each ->
      setup()

      # Event bindings
      $(window).resize (e) ->
        width = $window.width()
        height = $window.height()

        adjustSlidesSize $children

        $control.width(width * multiplier)
                .height(height)

        if size > 1
          $control.css
            left: -width

      $(document).on 'click', ".#{options.nav_class} a", (e) ->
        e.preventDefault()
        stop()
        if $(this).hasClass('next')
          animate 'next'
        else
          animate 'prev'

      if options.pagination
        $window.on "slides.initialized", (e) =>
          $(this).append($("<nav>", { class: 'slides-pagination'}))

          $children.each (i) ->
            addPaginationItem(i)

        .on "slides.animated", (e, current, next, prev) ->
          $pagination = $(".slides-pagination")
          $(".active", $pagination).removeClass "active"
          $("a", $pagination).eq(current).addClass "active"

        .on "click", ".slides-pagination a", (e) ->
          e.preventDefault() unless options.hashchange
          index = this.hash.replace(/^#/, '')
          animate index

        .on 'hashchange', (e) ->
          index = location.hash.replace(/^#/, '')
          stop()
          animate index

      # Kick it off
      start()