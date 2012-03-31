# Superslides 0.2.4

Superslides is a full screen slider for jQuery heavily influenced by Nathan Searles' [SlidesJS](https://github.com/nathansearles/slides/). It's designed to be as flexible as possible, while maintaining a reasonable code base and good browser compatibility.

It is 2kb minified (4.5kb uncompressed).

## Usage
[Check out the demo](http://nicinabox.github.com/superslides/) for a complete example. Basic usage is as follows. See options below for things you can change.

    $('#slides').superslides(options_hash)

## Options

Currently, Superslides has a few configurable options: auto play with a delay, slide transition speed, and slide easing ([jQueryUI](http://jqueryui.com/) or the [jQuery easing plugin](http://gsgd.co.uk/sandbox/jquery/easing/) required).

Listed as `option: default_value`

    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    container_class: 'slides-container'

## Events

Superslides triggers a few events that you can bind to (listed in the order they are fired):

    slides.initialized
    slides.animated

When the window is resized and on first load before `slides.initialized`:

    slides.image_adjusted
    slides.sized

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

Notes on the differences between *play* and *start*:

*Play* will slide only after the delay time. *Start* will slide first, then start playing (eg, slide, then continue sliding after the delay time--5 seconds by default)

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

## CSS

Not _all_ of these styles are required, but most of them are. They've been written with much of the styling removed, and only the basic structural elements left in place. That said, it's likely you may need to tweak to your needs.

    #slides {
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    #slides .slides-navigation {
      width: 988px;
      margin: 0 auto;
      position: relative;
      z-index: 3;
      top: -50%;
    }
    #slides img {
      max-width: none;
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      -ms-interpolation-mode: bicubic;
      -webkit-backface-visibility: hidden;
    }
    #slides .slides-navigation a {
      position: absolute;
      display: block;
    }
    #slides .slides-navigation a.prev {
      left: 0;
    }
    #slides .slides-navigation a.next {
      right: 0;
    }

## Hardware Acceleration

Superslides is compatible with the [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/) plugin. Simply include it before this plugin and it will automatically smooth out transitions using CSS instead of JavaScript.

## Contributing

If you'd like to contribute by fixing bugs, adding features, or otherwise, you should know that Superslides is written in [Coffeescript](http://coffeescript.org/) with [Jasmine](http://pivotal.github.com/jasmine/) and [Jasmine Headless Webkit](http://johnbintz.github.com/jasmine-headless-webkit/). Write a test for your feature and submit a pull request :)

## Known Bugs & Caveats

* IE 7 & 8 don't scale the image nicely due to min/max-width. You can remedy this with a polyfill.

## MIT License

Copyright (C) 2012 Nic Haynes (aka, Nic Aitch)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.