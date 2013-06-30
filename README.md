# Superslides

Superslides is a full screen, hardware accelerated slider for jQuery. I wasn't happy with the state of full screen sliders, so naturally I built my own.

## Usage

[Check out the demo](http://nicinabox.github.com/superslides/) for an interactive example or the examples folder for individual cases. Use like your standard jQuery plugin:

```javascript
$('#slides').superslides()
```
## Options

`play`: `0` [number] Milliseconds before progressing to next slide automatically. Use a falsey value to disable.

`animation`: `'slide'` [string] slide or fade. This matches animations defined by fx engine.

`animation_speed`: `'normal'` [string] Animation speed.

`animation_easing`: `'linear'` [string] Animation easing.

`inherit_width_from`: `window` [object] or [string] Accepts window or element selector. Use to constrain slider to an element's width.

`inherit_height_from`: `window` [object] or [string] Accepts window or element selector. Use to constrain slider to an element's height.

`pagination`: `true` [boolean] Generate pagination. Add an id to your slide to use custom pagination that slide.

`hashchange`: `false` [boolean] Enable hashchange support in url.

`elements` [object] A hash of element classes used in generated html.

### Elements

The following are element classes accessible under the `elements` object.

`preserve`: `'.preserve'` [string] Add this class to images in your content that you don't want to be resized like the background images.

`nav`: `'.slides-navigation'` [string] Class surrounding next/previous buttons.

`container`: `'.slides-container'` [string] Container class that must be present with original markup.

`pagination`: `'.slides-pagination'` [string] Pagination class added to pagination container.

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
$('#slides').superslides('current')
$('#slides').superslides('next') // go to next slide
$('#slides').superslides('prev') // go to previous slide
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

## Hardware Acceleration

Superslides is compatible with the [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/) plugin. Simply include it before this plugin and it will automatically smooth out transitions using CSS instead of JavaScript.

## Contributing

Check contributing.md.

## Changelog

[Changelog](https://github.com/nicinabox/superslides/blob/0.5-stable/changelog.md)
