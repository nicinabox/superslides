###
  Superslides 0.4.3
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
###

window.Superslides = (el, options) ->
  @size = =>
    $(".#{options.container_class}").children().length
  @stop = =>
    clearInterval @play_id
    delete @play_id
  @start = =>
    if options.play
      @stop() if @play_id

      @play_id = setInterval ->
        false
      , options.delay
  this

# Plugin
$.fn.superslides = (option) ->
  if typeof option is "string"
    $this = $(this)
    data = $this.data("superslides")
    return data[option].call $this

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
