# Changelog

### 0.6.1 - July 9, 2013

* Continue playing even after clicking navigation

### 0.6.0 - July 8, 2013

* Drop Coffeescript, port to vanilla Javascript
* Change src organization
* Change image positioning to match `background-size: cover`
* Add custom pagination
* Add ability for slider to be constrained by an element
* Add more examples
* Add fade effect
* Add fx engine
* Add support for arrow keys
* Fix double image load
* Fix pagination, navigation when using multiple instances
* Fix tests
* Fix update method

### 0.5.2 - Jan 20, 2013

* Fix image scale bug when using images larger than viewport
* Fix img:first-child using preserve class
* Fix loading last slide directly

### 0.5.0 - Dec 17, 2012

* Ground up rebuild
* Test with QUnit
* New control API
* New events
* Fix current/next/prev bug
* Fix multiple instances
* Fix jQuery noconflict
* Fix hashchange bugs
* Fix misc bugs, overall performance and stability
* Majorly slimmed required css

### 0.4.3 - Dec 2, 2012

* Refactors
* Fix flicker in Safari
* Fix hash bug on load
* Include size in API

### 0.4.2 - Oct 20, 2012

* Add append API method

### 0.4.1 - Oct 18, 2012

* Fix squished images on mobile
* Fix image offset on mobile
* Add support for non-fullscreen images
* Add support for scrollable content

### 0.4 - Aug 11, 2012

* Major refactor
* Add control API
* Add pagination
* Add hashchange support
* CSS is now included in the bulid

### 0.3.1 - July 19, 2012

* Fix slides if only 1 present
* Update mobile detection

### 0.3.0  - April 1, 2012
* Add play, next, prev event hooks
* Image sizes are calculated automatically (and asyncronously)
* Enable 3DTransform for mobile
* Add MIT License
* Fix IE height/width calculation
* Fix `slides.image_adjusted` being triggered too soon

### 0.2.3  - March 25, 2012
* Fix left offset bug
* UL no longer required
* Add support for [jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/)
* Add start, stop event hooks

### 0.2.1  - March 24, 2012
* Drop callbacks for events
* Add build folder with compiled (and minified js)

### 0.2.0    - March 20, 2012
* Fix slide bug if multiple clicks
* Fix slide offset bug
* Fix image size calculation + scaling
* Fix height bug
* Fix major window resize bug
