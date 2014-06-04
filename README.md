# slidr

A super simple slideshow thing for Meteor. Here's how you use it:

1. Install it. `mrt install slidr`
1. Create a wrapper DOM element for your slideshow.
1. Place some slides inside it with a specific slide-class (you're free to name this class however you like).
1. **Optional:** Place two next/prev elements inside the wrapper. 
  - They should have a class (again, choose whatever you think works).
  - They also a `data-next-or-prev="prev"` or `data-next-or-prev="next"` data attribite. Whatever you place inside those data attributes will be the jQuery method which will be called. So if you're using some fancy `prevOrLast()` or `nextOrFirst()` methods, just put them here.
1. Now you're ready to setup your slideshow!
1. In a meteor.rendered() method, put the initiation of the slideshow like this:

```javascript

  var slideShowOptions = {
    // These are required
    wrapper: wrapperSelector,
    slideSelector: slideSelector,
    // These are optional
    controlsSelector: nextPrevButotnsSelector,
    // Will make the slides fadeIn( fadeSpeed ) instead of just show()
    fadeSpeed: 250,
    // The time in ms between automatic slide toggles. If you don't pass this the slides will only be changed manually.
    timer: 6500,
    // If you don't want to use the default nextOrFirst() method pass your own method here
    timerMethod: 'customNextOrFirst',
    // If you want to generate a 1-2-3 pagination for you slides, pass a pagination object like this
    pagination: {
      // What HTML element do you want to wrap your pagination buttons?
      wrapperEl: 'ul',
      // What class do you want for the wrapper?
      wrapperElCssClass: 'a-wrapper-css-class',
      // What HTML element do you want for your actual pagination elements?
      el: 'li',
      // What class should the inner elements have?
      elCssClass: 'an-inner-item-css-class'
    }
  };

  var slideShow = new slidr( slideShowOptions );

```

**Now you should have a slideshow!**

## Some random stuff

- **This package will add two methods to jquery: jQuery.fn.nextOrFirst() and jQuery.fn.prevOrLast()!** If you've defined your own versions of those methods, this will break them. Probably.
- Any errors you might encounter should be reported to the console.
- If you only have one slide in your slideshow, the controls will be hidden and it will basically be just the slide.
- If you don't pass optionst.timer, the slideshow will only switch slides when the user clicks the control buttons.

## Pagination

If you pass a pagination object (with the required keys/vals) to your slidr, you'll get one pagination element for every slide in your slideshow. The currently active slide's pagination-element will also get an extra class, which is your base class + '--active'. So you can use this to add some fancy styling to the currently active pagination item.

**Currently all pagination items will contain 1, 2, 3 etc. This will be optional in a later release.**