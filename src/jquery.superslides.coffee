###
  Superslides 0.2.4
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

$ = jQuery
$.fn.superslides = (options) ->
  options = $.extend
    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    container_class: 'slides-container'
  , options

  $(".#{options.container_class}", this).wrap('<div class="slides-control" />')

  $this = this
  $control = $('.slides-control', $this)
  $container = $(".#{options.container_class}")
  $children = $container.children()
  $nav = $(".#{options.nav_class}")
  size = $children.length
  width = window.innerWidth || document.documentElement.clientWidth
  height = window.innerHeight || document.documentElement.clientHeight
  current = 0
  prev = 0
  next = 0
  first_load = true
  play_interval = 0
  animating = false
  is_mobile = navigator.userAgent.match(/ipad|iphone/i)

  start = ->
    animate (if first_load then 0 else "next")
    play()

  stop = ->
    clearInterval play_interval

  play = ->
    if options.play
      stop() if play_interval
      play_interval = setInterval ->
        animate (if first_load then 0 else "next")
      , options.delay

  load_image = ($img, callback) ->
    image = new Image()
    $img.load ->
      if typeof callback == 'function'
        callback(this)
      this

  adjust_image_position = ($img) ->
    unless $img.data('original-height') && $img.data('original-width')
      load_image $img, (image) ->
        $img.data('original-height', image.height).removeAttr('height')
        $img.data('original-width', image.width).removeAttr('width')
        adjust_image_position $img

    if height < $img.data('original-height')
      $img.css
        top: -($img.data('original-height') - height)/2

    if width < $img.data('original-width')
      $img.css
        left: -($img.data('original-width') - width)/2
    else
      $img.css
        left: 0
    if $img.data('original-height') && $img.data('original-width')
      $this.trigger('slides.image_adjusted')

  adjust_slides_size = ($el) ->
    $el.each (i) ->
      $(this).width(width).height(height).css
        left: width
      adjust_image_position $('img', this)

    $this.trigger('slides.sized')

  animate = (direction) ->
    unless animating
      prev = current
      animating = true
      switch direction
        when 'next'
          position = width*2
          direction = -position
          next = current + 1
          next = 0 if size == next
        when 'prev'
          position = 0
          direction = 0
          next = current - 1
          next = size-1 if next == -1
        else
          prev = -1
          next = direction

      current = next
      $children.removeClass('current')

      $children.eq(current).css
        left: position
        display: 'block'

      $control.animate(
        useTranslate3d: (if is_mobile then true else false)
        left: direction
      , options.slide_speed
      , options.slide_easing
      , ->
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

        $children.eq(current).addClass('current')

        if first_load
          $container.fadeIn('fast')
          $this.trigger('slides.initialized')
          first_load = false

        animating = false
        $this.trigger('slides.animated')
      )

  this.each ->
    $control.css
      position: 'relative'
      width: width * 3
      height: height
      left: -width

    $container.hide()

    $children.css
      display: 'none'
      position: 'absolute'
      overflow: 'hidden'
      top: 0
      left: width
      zIndex: 0

    adjust_slides_size $children

    # Event bindings
    $(window).resize (e) ->
      width = window.innerWidth || document.documentElement.clientWidth
      height = window.innerHeight || document.documentElement.clientHeight
      adjust_slides_size $children
      $control.width(width*3).css
        left: -width
        height: height

    $('a', $nav).click (e) ->
      e.preventDefault()
      stop()
      if $(this).hasClass('next')
        animate 'next'
      else
        animate 'prev'

    $this.on 'slides.start', (e) ->
      start()

    $this.on 'slides.stop', (e) ->
      stop()

    $this.on 'slides.play', (e) ->
      play()

    $this.on 'slides.next', (e) ->
      stop()
      animate 'next'

    $this.on 'slides.prev', (e) ->
      stop()
      animate 'prev'

    # Start playing
    $this.trigger('slides.start')