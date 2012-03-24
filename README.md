# Superslides 0.2.1

Superslides is a full screen slider for jQuery heavily influenced by Nathan Searles' [SlidesJS](https://github.com/nathansearles/slides/). It's designed to be as flexible as possible, while maintaining a reasonable code base and good browser compatibility.

# Usage
[Check out the demo](http://nicinabox.github.com/superslides/) for a complete example. Basic usage is as follows. See options below for things you can change. 

    $('#slides').superslides(options_hash)

# Options

Currently, Superslides has a few configurable options: auto play with a delay, slide transition speed, and slide easing ([jQueryUI](http://jqueryui.com/) or the [jQuery easing plugin](http://gsgd.co.uk/sandbox/jquery/easing/) required).

Listed as `option: default_value`  

    delay: 5000
    play: false
    slide_speed: 'normal'
    slide_easing: 'linear'
    nav_class: 'slides-navigation'
    
# Callbacks

You may need to hook in to certain events, so I've included a few callback functions for convenience.

Listed in the order they are called:

    adjust_slides_size_callback
    adjust_image_position_callback
    animate_callback

# Markup

Markup is pretty straightforward. At the very least you'll need a `ul` with a container. Inside each `li` you're pretty much home free. I've included a completely optional `.container`.

### A note on scaling images

Be sure to include the height and width attributes of the image in it's original size! These attributes will be removed when the slider is initialized, but they are need to quickly and simply calculate the original image dimensions.

    <div id="slides">
      <ul>
        <li>
          <img src="http://flickholdr.com/1000/800" width="1000" height="800" alt="">
          <div class="container">
            Slide one
          </div>
        </li>
        <li>
          <img src="http://flickholdr.com/1000/800/space" width="1000" height="800" alt="">
          <div class="container">
            Slide two
          </div>
        </li>
        <li>
          <img src="http://flickholdr.com/1000/800/tech" width="1000" height="800" alt="">
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

# CSS

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
    #slides ul {
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
    }
    #slides ul li {
      margin: 0;
      padding: 0;
      float: left;
      position: relative;
      background: none;
    }
    #slides ul li.current {
      display: block;
      z-index: 1;
    }
    #slides ul li img {
      max-width: none;
      min-width: 100%;
      min-height: 100%;
      position: absolute;
    }
    #slides ul li .container {
      width: 988px;
      margin: 0 auto;
      position: relative;
      top: 38%;
      background: none;
    }

# Contributing

If you'd like to contribute by fixing bugs, adding features, or otherwise, you should know that Superslides is written in [Coffeescript](http://coffeescript.org/) with [Jasmine](http://pivotal.github.com/jasmine/) and [Jasmine Headless Webkit](http://johnbintz.github.com/jasmine-headless-webkit/). Write a test for your feature and submit a pull request :)

# Known Bugs

* Possible cross-browser bugs (untested)