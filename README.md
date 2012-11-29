# Superslides 0.4.3 - [changelog](https://github.com/nicinabox/superslides/blob/master/changelog.md)

Superslides is a full screen slider for jQuery heavily influenced by Nathan Searles' [SlidesJS](https://github.com/nathansearles/slides/). It's designed to be as flexible as possible, while maintaining a reasonable code base and good browser compatibility.

It's 4.3kb minified (9.4kb uncompressed).

## Usage
[Check out the demo](http://nicinabox.github.com/superslides/) for a complete example. Basic usage is as follows. See options below for things you can change.

    $('#slides').superslides(options_hash)

## Options

There are a few configurable options (these are the defaults):

    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    container_class: 'slides-container'
    pagination: true
    hashchange: true

## Events

Superslides triggers a few events that you can bind to (listed in the order they are fired):

    slides.initialized
    slides.animated

When the window is resized and on first load before `slides.initialized`:

    slides.image_adjusted
    slides.sized

An additional event is fired when an item is appended to the slider.

    slides.updated

Binding to events:

    $('body').on('slides.initialized', '#slides', function(){
      console.log('Superslides initialized')
    })

You can also control the slider by triggering the respective events:

    $('#slides').trigger('slides.start')
    $('#slides').trigger('slides.stop')
    $('#slides').trigger('slides.play')
    $('#slides').trigger('slides.next')
    $('#slides').trigger('slides.prev')

Alternatively, use the API to control the slider

    $('#slides').superslides('start')
    $('#slides').superslides('stop')
    $('#slides').superslides('play')
    $('#slides').superslides('prev')
    $('#slides').superslides('next')
    $('#slides').superslides('animate', 3) // where 3 is a slide number
    $('#slides').superslides('append', $jqueryObj)

Notes on the differences between *play* and *start*:

*Play* will slide only after the delay time. *Start* will slide first, then start playing (i.e., slide, then continue sliding after the delay time--5 seconds by default)

## Markup

Markup is pretty straightforward. At minimum it looks like this:

    <div id="slides">
      <div class="slides-container">
        <img src="http://flickholdr.com/1000/800" alt="">
        <img src="http://flickholdr.com/1000/800" alt="">
      </div>
    </div>

You could even use a UL as the `slides-container`

    <div id="slides">
      <ul class="slides-container">
        <li>
          <img src="http://flickholdr.com/1000/800" alt="">
          <div class="container">
            Slide one
          </div>
        </li>
        <li>
          <img src="http://flickholdr.com/1000/800/space" alt="">
          <div class="container">
            Slide two
          </div>
        </li>
        <li>
          <img src="http://flickholdr.com/1000/800/tech" alt="">
          <div class="container">
            Slide three
          </div>
        </li>
      </ul>
      <nav class="slides-navigation">
        <a href="#" class="next">Next</a>
        <a href="#" class="prev">Previous</a>
      </nav>
    </div>

## Hardware Acceleration

Superslides is compatible with the [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/) plugin. Simply include it before this plugin and it will automatically smooth out transitions using CSS instead of JavaScript.

## Contributing

If you'd like to contribute by fixing bugs, adding features, or otherwise, you should know that Superslides is written in [Coffeescript](http://coffeescript.org/). Please modify files in src/ (dist/ is generated). Use demo/ to test your changes.

## Known Bugs & Caveats

* IE 7 & 8 don't scale the image nicely due to min/max-width. You can remedy this with a polyfill.