###
  Superslides 0.5-wip
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

Superslides = (el, options) ->
  # Private
  parse = (direction) ->
    console.log this
    switch true
      when /next/.test(direction)
        'next'

      when /prev/.test(direction)
        'prev'

      when /\d/.test(direction)
        direction

      else #bogus
        0


  # Public
  @curr = 0
  @next = @curr + 1
  @prev = @curr - 1

  @size = =>
    $(".#{options.container_class}").children().length

  @stop = =>
    clearInterval @play_id
    delete @play_id

  @start = =>
    if options.play
      @stop() if @play_id

      @play_id = setInterval =>
        false
      , options.delay

  @animate = (direction) =>
    direction = parse(direction)
    console.log direction
  this

# Plugin
$.fn.superslides = (option, args) ->
  if typeof option is "string"
    $this = $(this)
    data = $this.data("superslides")
    return data[option].call $this, args

  options = $.extend
    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    container_class: 'slides-container'
    pagination: false
    hashchange: false
    scrollable: true
  , option

  @each ->
    $this = $(this)
    data = $this.data("superslides")
    $this.data "superslides", (data = new Superslides(this, options)) unless data
