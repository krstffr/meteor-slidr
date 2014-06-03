# slidr

A super simple slideshow thing for Meteor. Here's how you use it:

1. Install it. `mrt install slidr`
1. Create a wrapper DOM element for your slideshow.
1. Place some slides inside it with a specific slide-class (you're free to name this class however you like).
1. Place two next/prev elements inside the wrapper. 
  - They should have a class (again, choose whatever you think works).
  - They also a `data-next-or-prev="prev"` or `data-next-or-prev="next"` data attribite. Whatever you place inside those data attributes will be the jQuery method which will be called. So if you're using some fancy `prevOrLast()` or `nextOrFirst()` methods, just put them here.
1. Now you're ready to setup your slideshow!
1. In a meteor.rendered() method, put the initiation of the slideshow like this:

```javascript

  var slideShowOptions = {
    // These are required
    wrapper: wrapperSelector,
    slideSelector: slideSelector,
    controlsSelector: nextPrevSelector,
    // These are optional
    fadeSpeed: 250, // Will make the slides fadeIn( fadeSpeed ) instead of just show()
    timer: 6500, // The time in ms between automatic slide toggles. If you don't pass this the slides will only be changed manually.
    timerMethod: 'customNextOrFirst' // If you don't want to use the default nextOrFirst() method pass your own method here
  };

  var slideShow = new slidr( slideShowOptions );

```

**Now you should have a slideshow!**

## Some random stuff

- **This package will add two methods to jquery: jQuery.fn.nextOrFirst() and jQuery.fn.prevOrLast()!** If you've defined your own versions of those methods, this will break them. Probably.
- Any errors you might encounter should be reported to the console.
- If you only have one slide in your slideshow, the controls will be hidden and it will basically be just the slide.
- If you don't pass optionst.timer, the slideshow will only switch slides when the user clicks the control buttons.
