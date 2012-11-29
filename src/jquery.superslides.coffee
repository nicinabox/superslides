###
  Superslides 0.4.3
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

window.Superslides = (el, options) ->
  api =
    size: ->
      $(".#{options.container_class}").children().length
    start: ->
      start()
    stop: ->
      stop()
    play: ->
      play()
    append: ($el) ->
      append($el)
    animate: (direction) ->
      stop()
      animate(direction)
    next: ->
      animate('next')
    prev: ->
      animate('prev')
    test: ->
      'test'
  api

# Plugin
$.fn.superslides = (option) ->
  if typeof option is "string"
    $this = $(this)
    data = $this.data("superslides")
    return data[option].call $this

  @each ->
    options = $.extend($.fn.superslides.options, option)
    $this = $(this)
    data = $this.data("superslides")
    $this.data "superslides", (data = new Superslides(this, options)) unless data


  # if typeof options == "string"
  #   api = $.fn.superslides.api
  #   method = options

  #   # Convert arguments to real array
  #   args = Array.prototype.slice.call(arguments)
  #   args.splice(0, 1)

  #   api[method].apply(this, args)
  # else
  #   # Defaults
  #   options = $.fn.superslides.options = $.extend $.fn.superslides.options, options

  #   # Setup
  #   $(".#{options.container_class}", this).wrap('<div class="slides-control" />')

  #   # Cache elements
  #   $control = $('.slides-control', this)
  #   $container = $(".#{options.container_class}")
  #   $nav = $(".#{options.nav_class}")
  #   $children = $container.children()

  #   $.fn.superslides.api.size = size = $children.length
  #   multiplier = (if size == 1 then 1 else 3)

  #   this.each ->
  #     setup()

  #     # Event bindings
  #     $(window).resize (e) ->
  #       width = $window.width()
  #       height = $window.height()

  #       adjustSlidesSize $children

  #       $control.width(width * multiplier)
  #               .height(height)

  #       if size > 1
  #         $control.css
  #           left: -width

  #     $(document).on 'click', ".#{options.nav_class} a", (e) ->
  #       e.preventDefault()
  #       stop()
  #       if $(this).hasClass('next')
  #         animate 'next'
  #       else
  #         animate 'prev'

  #     if options.pagination
  #       $window.on "slides.initialized", (e) =>
  #         $(this).append($("<nav>", { class: 'slides-pagination'}))

  #         $children.each (i) ->
  #           addPaginationItem(i)

  #       .on "slides.animated", (e, current, next, prev) ->
  #         $pagination = $(".slides-pagination")
  #         $(".active", $pagination).removeClass "active"
  #         $("a", $pagination).eq(current).addClass "active"

  #       .on "click", ".slides-pagination a", (e) ->
  #         e.preventDefault() unless options.hashchange
  #         index = this.hash.replace(/^#/, '')
  #         animate index

  #       .on 'hashchange', (e) ->
  #         index = location.hash.replace(/^#/, '')
  #         stop()
  #         animate index

  #     # Kick it off
  #     start()

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