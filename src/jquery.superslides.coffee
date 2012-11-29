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
