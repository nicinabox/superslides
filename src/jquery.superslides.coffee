plugin = 'superslides'
$      = jQuery

Superslides = (el, options = {}) ->
  @options = $.extend
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    pagination: true
    hashchange: false
    scrollable: true
    classes:
      preserve: 'preserve'
      nav: 'slides-navigation'
      container: 'slides-container'
      pagination: 'slides-pagination'
  , options

  that        = this
  $window     = $(window)
  @el         = $(el)
  $container  = $(".#{@options.classes.container}", el)
  $children   = $container.children()
  $pagination = $("<nav>", class: @options.classes.pagination)
  $control    = $('<div>', class: 'slides-control')
  multiplier  = 1
  init        = false
  width       = $window.width()
  height      = $window.height()
  prefixes    = ['webkit', 'moz', 'ms', 'o']

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
