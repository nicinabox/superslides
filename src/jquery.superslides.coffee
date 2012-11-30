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

  init = false
  $container = $(".#{@options.container_class}")
  $control   = $('<div>', class: 'slides-control')

  # Private
  initialize = =>
    return if init
    init = true

    $container.wrap($control)
    $container.trigger('slides.init')

    @mobile = navigator.userAgent.match(/mobile/i)
    @start()

    this

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

  parseHash = (hash) =>
    hash ||= window.location.hash
    hash.replace(/^#/, '')

  update = =>
    positions()
    $container.trigger('slides.changed')

  positions = =>
    @current ||= 0
    @next = next()
    @prev = prev()
    false

  # Public
  @destroy = =>
    $(el).removeData()

  @size = =>
    $container.children().length

  @stop = =>
    clearInterval @play_id
    delete @play_id

  @start = =>
    @animate 'next'

    if options.play
      @stop() if @play_id

      @play_id = setInterval =>
        # @animate 'next'
        false
      , options.delay

    $(el).trigger('slides.started')

  @animate = (direction) =>
    parseHash() || parse(direction)

    $container.find('.current').removeClass('current')
    $container.children().eq(@next).addClass('current')

  positions()

  # Events
  $(el).on 'DOMSubtreeModified', (e) ->
    update()

  initialize()

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