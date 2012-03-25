###
  Superslides 0.2.2
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
    container: 'slides-container'
  , options
  
  $(".#{options.container}", this).wrap('<div class="slides-control" />')
    
  $this = $(this)
  $control = $('.slides-control', $this)
  $container = $(".#{options.container}")
  $children = $container.children()
  $nav = $(".#{options.nav_class}")
  size = $children.length
  width = window.innerWidth || document.body.clientWidth
  height = window.innerHeight || document.body.clientHeight
  current = 0
  prev = 0
  next = 0
  first_load = true
  interval = 0
  animating = false
  
  start = () ->
    animate 0
    if options.play
      interval = setInterval ->
        direction = (if first_load then 0 else "next")
        animate direction
      , options.delay

  stop = () ->
    clearInterval interval

  adjust_image_position = ($el) ->
    $img = $('img', $el)
    
    if $img.attr('height')
      $img.data('original-height', $img.height()).removeAttr('height')

    if $img.attr('width')
      $img.data('original-width', $img.width()).removeAttr('width')

    if height < $img.data('original-height')
      $img.css
        top: -($img.data('original-height') - height)/2

    if width < $img.data('original-width')
      $img.css
        left: -($img.data('original-width') - width)/2
    else
      $img.css
        left: 0
        
    $this.trigger('slides.image_adjusted')

  adjust_slides_size = ($el) ->
    $el.each (i) ->
      $(this).width(width).height(height).css
        left: width
      adjust_image_position $(this)

    $this.trigger('slides.sized')

  animate = (direction) ->
    unless animating
      prev = current
      animating = true
      switch direction
        when 'next'
          position = width*2
          direction = -width*2
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
      
      $control.animate
        left: -position
        avoidTransforms: false
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
    start()

    $(window).resize (e) ->
      width = window.innerWidth || document.body.clientWidth
      height = window.innerHeight || document.body.clientHeight
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