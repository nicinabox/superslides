###
  Superslides
  https://github.com/nicinabox/superslides
  Copyright (c) 2013 Nic Aitch; Licensed MIT
###

plugin = 'superslides'
$      = jQuery

Superslides = (el, options = {}) ->
  @options = $.extend
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    pagination: true
    hashchange: false
    texthash: false
    scrollable: true
    classes:
      preserve: 'preserve'
      nav: 'slides-navigation'
      container: 'slides-container'
      pagination: 'slides-pagination'
  , options

  that        = this
  $window     = $(window)
  @el         = $(el)
  $container  = $(".#{@options.classes.container}", el)
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

    setupCss()
    setupContainers()
    toggleNav()
    addPagination()

    @start()
    this

  setupCss = =>
    $('body').css
      margin: 0

    @el.css
      position: 'relative'
      overflowX: 'hidden'
      width: '100%'

    $control.css
      position: 'relative'
      transform: 'translate3d(0)'

    $container.css
      display: 'none'
      margin: '0'
      padding: '0'
      listStyle: 'none'
      position: 'relative'

    setupImageCSS()

  setupImageCSS = =>
    $container.find('img').not(".#{@options.classes.preserve}").css
      "-webkit-backface-visibility": 'hidden'
      "-ms-interpolation-mode": 'bicubic'
      "position": 'absolute'
      "left": '0'
      "top": '0'
      "z-index": '-1'

  setupContainers = =>
    $('body').css
      margin: 0
      overflow: 'hidden'

    @el.css
      height: height

    $control.css
      width: width * multiplier
      left: -width

    if @options.scrollable
      $children.each ->
        return if $('.scrollable', this).length

        $(this).wrapInner('<div class="scrollable" />');
        $(this).find('img').not(".#{_this.options.classes.preserve}")
               .insertBefore($('.scrollable', this));

  setupChildren = =>
    if $children.is('img')
      $children.wrap('<div>')
      $children = $container.children()

    $container.children().css
      display: 'none'
      position: 'absolute'
      overflow: 'hidden'
      top: 0
      left: width
      zIndex: 0

    adjustSlidesSize $children

  toggleNav = =>
    if @size() > 1
      $(".#{@options.classes.nav}").show()
    else
      $(".#{@options.classes.nav}").hide()

  getTextHash = (i) =>
  	return $children.eq(i).data('href')

  setupNextPrev = =>
    $(".#{@options.classes.nav} a").each ->
      if $(this).hasClass('next')
        this.hash = if that.options.texthash then getTextHash(that.next) else that.next
      else
        this.hash = if that.options.texthash then getTextHash(that.prev) else that.prev

  addPaginationItem = (i) =>
    unless i >= 0
      i = @size() - 1 # size is not zero indexed

    if @options.texthash
      i = getTextHash(i)

    $pagination.append $("<a>",
      href: "##{i}"
      class: "current" if @current == $pagination.children().length
    )

  addPagination = =>
    return if !@options.pagination or @size() == 1

    if $(el).find(".#{@options.classes.pagination}").length
      next_index = $pagination.children().last().index() + 1
      array      = $container.children()
      array      = array.slice(next_index)
    else
      next_index  = 0
      array       = new Array(@size() - next_index)
      $pagination = $pagination.appendTo(@el)

    $.each array, (i) ->
      addPaginationItem(i + next_index)

  loadImage = ($img, callback) =>
    $("<img>",
        src: "#{$img.attr('src')}?#{new Date().getTime()}"
      ).load ->
        callback(this) if typeof callback == 'function'

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

    if (width / height) >= $img.data('aspect-ratio')
      $img.css
        height: "auto"
        width: "100%"
    else
      $img.css
        height: "100%"
        width: "auto"

    setHorizontalPosition($img)
    setVerticalPosition($img)

  adjustSlidesSize = ($el) =>
    $el.each (i) ->
      $(this).width(width).height(height)

      $(this).css
        left: width

      adjustImagePosition $('img', this).not(".#{that.options.classes.preserve}")

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

  getPosByHash = (hash) =>
    position = null
    $children.each (i) ->
      if $(@).data('href') == hash
        position = i
        return
    return position

  parseHash = (hash = window.location.hash) =>
    hash = hash.replace(/^#/, '')
    if hash
      return if that.options.texthash then +getPosByHash(hash) else +hash

  positions = (current = -1) =>
    if init && @current >= 0
      current = @current if current < 0

    @current = current
    @next    = next()
    @prev    = prev()
    false

  animator = (direction, callback) =>
    upcoming_slide = upcomingSlide(direction)
    return if upcoming_slide > @size() - 1

    position       = width * 2
    offset         = -position
    outgoing_slide = @current

    if direction == 'prev' or
       direction < outgoing_slide
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

      if @size() > 1
        $control.css
          left: -width

        $children.eq(upcoming_slide).css
          left: width
          zIndex: 2

        # reset last slide
        if outgoing_slide >= 0
          $children.eq(outgoing_slide).css
            left: width
            display: 'none'
            zIndex: 0

      if @options.hashchange
        window.location.hash = if @options.texthash then getTextHash(@current) else @current

      callback() if typeof callback == 'function'
      setupNextPrev()
      @animating = false

      if init
        $container.trigger('animated.slides')
      else
        init = true
        $('body').css('overflow', 'visible')
        $container.fadeIn('fast')
        $container.trigger('init.slides')

  # Public
  @$el = $(el)

  @animate = (direction = 'next', callback) =>
    return if @animating
    @animating = true

    animator(direction, callback)

  @update = =>
    $children = $container.children()
    adjustSlidesSize($children)
    setupChildren()
    setupImageCSS()
    $children.eq(@current).css(
      display: 'block'
    )

    positions(@current)
    addPagination()
    toggleNav()

    $container.trigger('updated.slides')

  @destroy = =>
    $(el).removeData()

  @size = =>
    $container.children().length

  @stop = =>
    clearInterval @play_id
    delete @play_id
    $container.trigger('stopped.slides')

  @start = =>
    setupChildren()
    $window.trigger 'hashchange' if @options.hashchange

    @animate 'next'

    if @options.play
      @stop() if @play_id

      @play_id = setInterval =>
        @animate 'next'
      , @options.play

    $container.trigger('started.slides')

  # Events
  $window
  .on 'hashchange', (e) =>
    index = parseHash()
    if index >= 0 && index != @current
      @animate index

  .on 'resize', (e) ->
    width = $window.width()
    height = $window.height()

    setupContainers()
    adjustSlidesSize $children
    $('body').css
      overflow: 'visible'


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