# Superslides

Superslides is a full screen, hardware accelerated slider for jQuery. I wasn't happy with the state of full screen sliders, so naturally I built my own.

## Usage

[Check out the demo](http://nicinabox.github.com/superslides/) for an interactive example or the examples folder for individual cases. Use like your standard jQuery plugin:

```javascript
$('#slides').superslides()
```
## Options

<table>
  <tr>
    <th>Option</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>play</td>
    <td>0</td>
    <td>[number] Milliseconds before progressing to next slide automatically. Use a falsey value to disable.</td>
  </tr>
  <tr>
    <td>animation</td>
    <td>'slide'</td>
    <td>[string] slide or fade. This matches animations defined by fx engine.</td>
  </tr>
  <tr>
    <td>animation_speed</td>
    <td>'normal'</td>
    <td>[string] Animation speed.</td>
  </tr>
  <tr>
    <td>animation_easing</td>
    <td>'linear'</td>
    <td>[string] Animation easing.</td>
  </tr>
  <tr>
    <td>inherit_width_from</td>
    <td>window</td>
    <td>[object] or [string] Accepts window or element selector. Use to constrain slider to an element's width.</td>
  </tr>
  <tr>
    <td>inherit_height_from</td>
    <td>window</td>
    <td>[object] or [string] Accepts window or element selector. Use to constrain slider to an element's height.</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>true</td>
    <td>[boolean] Generate pagination. Add an id to your slide to use custom pagination on that slide.</td>
  </tr>
  <tr>
    <td>hashchange</td>
    <td>false</td>
    <td>[boolean] Enable hashchange support in url.</td>
  </tr>
  <tr>
    <td>elements</td>
    <td>(see Elements below)</td>
    <td>[object] A hash of element classes used in generated html.</td>
  </tr>
</table>

### Elements

The following are element classes accessible under the `elements` object.

<table>
  <tr>
    <td>preserve</td>
    <td>'.preserve'</td>
    <td>[string] Add this class to images in your content that you don't want to be resized like the background images.</td>
  </tr>
  <tr>
    <td>nav</td>
    <td>'.slides-navigation'</td>
    <td>[string] Class surrounding next/previous buttons.</td>
  </tr>
  <tr>
    <td>container</td>
    <td>'.slides-container'</td>
    <td>[string] Container class that must be present with original markup.</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>'.slides-pagination'</td>
    <td>[string] Pagination class added to pagination container.</td>
  </tr>
</table>

## Events

Superslides triggers a few events that you can bind to.

    started.slides
    init.slides
    animating.slides // Before slide animation begins
    animated.slides  // After slide animation ends
    updated.slides

## API

``` javascript
$('#slides').superslides('start')
$('#slides').superslides('stop')
$('#slides').superslides('animate' [, index|'next'|'prev'])
$('#slides').superslides('size')
$('#slides').superslides('destroy')
$('#slides').superslides('current') // get current slide index
$('#slides').superslides('next')    // get next slide index
$('#slides').superslides('prev')    // get previous slide index
```

If adding slides after initialization (a la ajax), be sure to call `update`.

## Styling

All styling required for functionality is handled in the JavaScript. Additional and optional styling is provided in `dist/stylesheets/superslides.css`

## Markup

Markup is pretty straightforward. At minimum it looks something like this:
``` html
<div id="slides">
  <div class="slides-container">
    <img src="http://flickholdr.com/1000/800" alt="">
    <img src="http://flickholdr.com/1000/800" alt="">
  </div>
</div>
```

You could even use a UL as the `slides-container`
``` html
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
```

## Custom Animations

I realize that you might want to do something unique in your application. That's why I've added the ability to extend the existing animations with your own. See `examples/custom-fx.html`.

```javascript
$.fn.superslides.fx = $.extend({
  flip: function(orientation, complete) {
    console.log(orientation);
    complete();
  }
}, $.fn.superslides.fx);
```

## Hardware Acceleration

Superslides is compatible with the [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/) plugin. Simply include it before this plugin and it will automatically smooth out transitions using CSS instead of JavaScript.

## Contributing

Check contributing.md.

## Changelog

[Changelog](https://github.com/nicinabox/superslides/blob/0.5-stable/changelog.md)
