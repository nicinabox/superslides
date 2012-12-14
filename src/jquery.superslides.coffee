Superslides = (el, options = {}) ->
  @options = $.extend
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    pagination: true
    hashchange: false
    scrollable: true
    classes:
      nav: 'slides-navigation'
      container: 'slides-container'
      pagination: 'slides-pagination'
  , options

  that        = this
  $window     = $(window)
  $container  = $(".#{@options.classes.container}")
  $children   = $container.children()
  $pagination = $("<nav>", class: @options.classes.pagination)
  $control    = $('<div>', class: 'slides-control')
  multiplier  = 1
  init        = false
  width       = $window.width()
  height      = $window.height()

  # Private
  initialize = =>
    return if init

    multiplier = findMultiplier()
    positions()
    @mobile = (/mobile/i).test(navigator.userAgent)

    $control = $container.wrap($control).parent('.slides-control')

    setupContainers()
    addPagination()

    @start()
    this

  setupContainers = ->
    # Center control
    $control.css
      width: width * multiplier
      height: height
      left: -width

  setupChildren = =>
    $children.css
      display: 'none'
      position: 'absolute'
      overflow: 'hidden'
      top: 0
      left: width
      zIndex: 0

    adjustSlidesSize $children

  setupNextPrev = =>
    $(".#{@options.classes.nav} a").each ->
      if $(this).hasClass('next')
        this.hash = that.next
      else
        this.hash = that.prev

  addPagination = =>
    return unless @options.pagination
    $(el).append($pagination)

    $children.each (i) ->
      addPaginationItem(i)

  addPaginationItem = (i) =>
    unless i >= 0
      i = @size() - 1 # size is not zero indexed

    $pagination.append $("<a>",
      href: "##{i}"
    )

  loadImage = ($img, callback) =>
    $("<img>",
        src: $img.attr('src')
      ).load ->
        if callback instanceof Function
          callback(this)

  setVerticalPosition = ($img) ->
    scale_height = width / $img.data('aspect-ratio')

    if scale_height >= height
      $img.css
        top: -(scale_height - height) / 2
    else
      $img.css
        top: 0

  setHorizontalPosition = ($img) ->
    scale_width = height * $img.data('aspect-ratio')

    if scale_width >= width
      $img.css
        left: -(scale_width - width) / 2
    else
      $img.css
        left: 0

  adjustImagePosition = ($img) =>
    unless $img.data('aspect-ratio')
      loadImage $img, (image) ->
        $img.removeAttr('width').removeAttr('height')
        $img.data('aspect-ratio', image.width / image.height)
        adjustImagePosition $img
      return

    setHorizontalPosition($img)
    setVerticalPosition($img)

  adjustSlidesSize = ($el) =>
    $el.each (i) ->
      $(this).width(width).height(height)

      $(this).css
        left: width

      adjustImagePosition $('img', this).not('.keep-original')

  findMultiplier = =>
    if @size() == 1 then 1 else 3

  next = =>
    index = @current + 1
    index = 0 if (index == @size())
    index

  prev = =>
    index = @current - 1
    index = @size() - 1 if index < 0
    index

  upcomingSlide = (direction) =>
    switch true
      when /next/.test(direction)
        next()

      when /prev/.test(direction)
        prev()

      when /\d/.test(direction)
        direction

      else #bogus
        false

  parseHash = (hash = window.location.hash) =>
    hash = hash.replace(/^#/, '')
    +hash if hash

  positions = (current = -1) =>
    if init && @current >= 0
      current = @current if current < 0

    @current = current
    @next    = next()
    @prev    = prev()
    false

  animator = (upcoming_slide, callback) =>
    position       = width * 2
    offset         = -position
    outgoing_slide = @current

    if upcoming_slide == @prev
      position = 0
      offset   = 0

    upcoming_position = position

    $children
      .removeClass('current')
      .eq(upcoming_slide)
        .addClass('current')
        .css
          left: upcoming_position
          display: 'block'

    $pagination.children()
      .removeClass('current')
      .eq(upcoming_slide)
        .addClass('current')

    $control.animate
      useTranslate3d: @mobile
      left: offset
    , @options.slide_speed
    , @options.slide_easing
    , =>
      positions(upcoming_slide)

      $control.css
        left: -width

      $children.eq(upcoming_slide).css
        left: width
        zIndex: 2

      # reset last slide
      $children.eq(outgoing_slide).css
        left: width
        display: 'none'
        zIndex: 0

      callback() if typeof callback == 'function'
      setupNextPrev()
      @animating = false

      if init
        $container.trigger('animated.slides')
      else
        init = true
        $container.fadeIn('fast')
        $container.trigger('init.slides')

  # Public
  @$el = $(el)

  @animate = (direction = 'next', callback) =>
    return if @animating
    @animating = true

    upcoming_slide = upcomingSlide(direction)
    return if upcoming_slide >= @size()

    animator(upcoming_slide, callback)

  @update = =>
    positions(@current)
    $container.trigger('updated.slides')

  @destroy = =>
    $(el).removeData()

  @size = =>
    $container.children().length

  @stop = =>
    clearInterval @play_id
    delete @play_id

  @start = =>
    setupChildren()
    $window.trigger 'hashchange' if @options.hashchange

    @animate 'next'

    if @options.play
      @stop() if @play_id

      @play_id = setInterval =>
        @animate 'next'
        false
      , @options.play

    $container.trigger('started.slides')

  # Events
  $window
  .on 'hashchange', (e) =>
    index = parseHash()
    if index >= 0
      @animate index

  .on 'resize', (e) ->
    width = $window.width()
    height = $window.height()

    setupContainers()
    adjustSlidesSize $children


  $(document)
  .on 'click', ".#{@options.classes.nav} a", (e) ->
    e.preventDefault() unless that.options.hashchange

    that.stop()
    if $(this).hasClass('next')
      that.animate 'next'
    else
      that.animate 'prev'

  .on 'click', ".#{@options.classes.pagination} a", (e) ->
    unless that.options.hashchange
      e.preventDefault()
      index = parseHash(this.hash)
      that.animate index

  initialize()

# Plugin
plugin = 'superslides'
$.fn[plugin] = (option, args) ->
  result = []
  @each ->
    $this   = $(this)
    data    = $this.data(plugin)
    options = typeof option == 'object' && option

    result = $this.data plugin, (data = new Superslides(this, options)) unless data

    if typeof option == "string"
      result = data[option]
      if typeof result == 'function'
        result = result.call(this, args)

  result