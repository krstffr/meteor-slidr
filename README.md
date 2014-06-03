# slidr

A super simple slideshow thing. Here's how you use it:

1. Create a wrapper DOM element for your slideshow.
1. Place some slides inside it with a specific slide-class (you're free to name this class however you like).
1. Place two next/prev elements inside the wrapper. 
  1. They should have a class (again, choose whatever you think works).
  1. They also a `data-next-or-prev="prev"` or `data-next-or-prev="next"` data attribite. Whatever you place inside those data attributes will be the jQuery method which will be called. So if you're using some fancy `prevOrLast()` or `nextOrFirst()` methods, just put them here.
1. Now you're ready to setup your slideshow!
1. In a meteor.rendered() method, put the initiation of the slideshow like this:

```javascript

  var slideShowOptions = {
    wrapper: wrapperSelector,
    slideSelector: slideSelector,
    controlsSelector: nextPrevSelector,
    // This is optional:
    fadeSpeed: 500
  };

  var slideShow = new Slider( slideShowOptions );


```

1. Now you should have a basic slideshow.

## Errors

Any errors you might encounter should be reported to the console.