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

  $container = $(".#{@options.container_class}")

  # Private
  next = =>
    index = @current + 1
    index = 0 if index == @size()
    index

  prev = =>
    index = @current - 1
    index = @size() - 1 if index == -1
    index

  parse = (direction) =>
    switch true
      when /next/.test(direction)
        next()

      when /prev/.test(direction)
        prev()

      when /\d/.test(direction)
        direction

      else #bogus
        0

  update = =>
    positions()
    $container.trigger('slides.updated')

  positions = =>
    @current = 0
    @next = next()
    @prev = prev()

  # Public
  @destroy = =>
    $(el).removeData('superslides')

  @size = =>
    $container.children().length

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

  positions()

  # Events
  $(el).on 'DOMSubtreeModified', (e) ->
    update()

  this

# Plugin
name = 'superslides'
$.fn[name] = (option, args) ->
  if typeof option is "string"
    $this = $(this)
    data = $this.data(name)

    method = data[option]
    if typeof method == 'function'
      method = method.call($this, args)
    return method

  @each ->
    $this = $(this)
    data = $this.data(name)
    options = typeof option == 'object' && option

    $this.data name, (data = new Superslides(this, options)) unless data