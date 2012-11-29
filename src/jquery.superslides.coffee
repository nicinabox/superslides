###
  Superslides 0.5-wip
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

Superslides = (el, options = {}) ->
  @options = $.extend
    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    container_class: 'slides-container'
    pagination: false
    hashchange: false
    scrollable: true
  , options

  # Private
  parse = (direction) ->
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
  @curr    = 0
  @next    = @curr + 1
  @prev    = @curr - 1

  @size = =>
    $(".#{@options.container_class}").children().length

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

  this

# Plugin
name = 'superslides'
$.fn[name] = (option, args) ->
  if typeof option is "string"
    $this = $(this)
    data = $this.data(name)
    return data[option].call($this, args)

  @each ->
    $this = $(this)
    data = $this.data(name)
    options = typeof option == 'object' && option

    $this.data name, (data = new Superslides(this, options)) unless data