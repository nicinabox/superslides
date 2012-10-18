###
  Superslides 0.4.1
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

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
$control = ''
$container = ''
$nav = ''
$children = ''

# Private methods
load_image = ($img, callback) ->
    $("<img>",
      src: $img.attr('src')
    ).load ->
      if typeof callback == 'function'
        callback(this)
      this

adjust_image_position = ($img) ->
  unless $img.data('original-height') && $img.data('original-width')
    load_image $img, (image) ->
      $img.data('original-height', image.height).removeAttr('height')
      $img.data('original-width', image.width).removeAttr('width')
      $img.data('aspect-ratio', image.width / image.height)
      adjust_image_position $img
    return

  scale_width = height * $img.data('aspect-ratio')

  console.log height, width, scale_width

  # Horizontal centering
  if width < $img.data('original-width')
    $img.css
      left: -($img.data('original-width') - width) / 2
  else
    $img.css
      left: 0

  if scale_width > width
    $img.css
      left: -(scale_width - width) / 2

  # Vertical centering
  if height < $img.data('original-height')
    $img.css
      top: -($img.data('original-height') - height) / 2

  if $img.data('original-height') && $img.data('original-width')
    $container.trigger('slides.image_adjusted')

adjust_slides_size = ($el) ->
  $el.each (i) ->
    $(this).width(width).height(height)

    if size > 1
      $(this).css
        left: width

    adjust_image_position $('img', this).not('.keep-original')

  $container.trigger('slides.sized')

start = ->
  if size > 1
    if location.hash
      index = location.hash.replace(/^#/, '')
    else
      index = (if first_load then 0 else "next")

    animate index
    play()

stop = ->
  clearInterval play_interval

play = ->
  if $.fn.superslides.options.play
    stop() if play_interval
    play_interval = setInterval ->
      animate (if first_load then 0 else "next")
    , $.fn.superslides.options.delay

animate = (direction) ->
  self = this
  self.current = (if self.current >= 0 then self.current else null)
  unless animating || direction >= size || +direction == self.current
    prev = self.current || +direction - 1 || 0
    animating = true
    switch direction
      when 'next'
        position = width * 2
        direction = -position
        next = self.current + 1
        next = 0 if size == next
      when 'prev'
        position = direction = 0
        next = self.current - 1
        next = size - 1 if next == -1
      else
        next = +direction
        if next > prev
          position = width * 2
          direction = -position
        else
          position = direction = 0

    self.current = next
    $children.removeClass('current')

    $children.eq(self.current).css
      left: position
      display: 'block'

    $control.animate(
      useTranslate3d: (if is_mobile then true else false)
      left: direction
    , $.fn.superslides.options.slide_speed
    , $.fn.superslides.options.slide_easing
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

      $children.eq(self.current).addClass('current')

      if first_load
        $container.fadeIn('fast')
        $container.trigger('slides.initialized')
        first_load = false

      animating = false
      $container.trigger('slides.animated', [self.current, next, prev])
    )
    self.current


# Plugin
$.fn.superslides = (options) ->
  if typeof options == 'string'
    api = $.fn.superslides.api
    method = options

    # Convert arguments to real array
    args = Array.prototype.slice.call(arguments)
    args.splice(0, 1)

    api[method].call(this, args.join(', '))
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

    size = $children.length
    multiplier = (if size == 1 then 1 else 3)

    this.each ->
      if options.scrollable
        $children.wrapInner('<div class="scrollable" />')
        $children.each ->
          $scrollable = $(this).find('.scrollable')
          $scrollable.find('img').not('.keep-original')
                      .insertBefore($scrollable)

      $control.css
        position: 'relative'

      if size > 1
        $control.css
          width: width * multiplier
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
        width = $window.width()
        height = $window.height()

        adjust_slides_size $children

        $control.width(width * multiplier).css
          height: height

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
        el = this
        $(document).on "slides.initialized", (e) ->
          $(el).append($("<nav>", { class: 'slides-pagination'}))
          $(".slides-container", el).children().each (i) ->
            $(".slides-pagination").append $("<a>",
              href: "#" + i
            )
        .on "slides.animated", (e, current, next, prev) ->
          $pagination = $(".slides-pagination")
          $(".active", $pagination).removeClass "active"
          $("a", $pagination).eq(current).addClass "active"
        .on "click", ".slides-pagination a", (e) ->
          e.preventDefault() unless options.hashchange
          index = this.hash.replace(/^#/, '')
          animate index

        $window.on 'hashchange', (e) ->
          index = location.hash.replace(/^#/, '')
          stop()
          animate index

      # Kick it off
      start()

# Options
$.fn.superslides.options =
  delay: 5000
  play: false
  slide_speed: 'normal'
  slide_easing: 'linear'
  nav_class: 'slides-navigation'
  container_class: 'slides-container'
  pagination: false
  hashchange: false
  scrollable: true

# Public API methods
$.fn.superslides.api =
  start: ->
    start()
  stop: ->
    stop()
  play: ->
    play()
  animate: (direction) ->
    stop()
    animate(direction)
  next: ->
    animate('next')
  prev: ->
    animate('prev')