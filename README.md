# krstffr:slidr #

A simple slideshow thing for Meteor. Supports multiple views per slideshow, fade/slide types and hammer.js support for slide type slideshows.

Here's how you use it:

## Basic usage ##

1. Install it. `meteor add krstffr:slidr`
1. Create a wrapper DOM element for your slideshow (or more than one if you fancy more views!)
1. Place some slides inside the slidesshow(s) (can be whatever DOM elements you want).
1. In meteor.rendered( fn ) (or wherever you see fit), put the initiation of the slideshow like this:

```javascript

Template.exampleTemplate.rendered = function () {

  var slideShowOptions = {
    // Optional: How many ms should the auto slider be set to?
    // Set to 0 for no auto slide
    timer: 1500,
    // Optional: Should the slideshow restart at the first element
    // if the user clicks "next" at the last element?
    carousel: true,
    // Optional: Add a callback which will get called whenever the active 
    // slide updates in the view. If you have multiple view a function wrapped
    // in a debounce is recommended!
    slideCallback: _.debounce( function () {
      console.log('A global slide callback, gets called whenever this slidr slides. Protip: debounce it to avoid multiple simultaneous calls!');
    }, 50, true ),
    // Holder of all your views. Will most often only contain one
    // view object!
    views: [{
      // Set to the DOM wrapper element
      wrapper: this.find('.slide-show'),
      // Set to the DOM slides elements
      slides: this.findAll('.slide-show .slide'),
      // Optional: If you've created two next/prev buttons,
      // set them using "controls"
      controls: this.findAll('.slide-show .next-prev-btns'),
      // Optional: Used for setting inactive classes for
      // the control buttons when first/last items are active
      // in a non carousel slideshow.
      // In this example the inactive control button will get
      // the class "next-prev-btns--inactive"
      controlsBaseClass: 'next-prev-btns',
      // Optional: How many slides should be visible at the
      // same time?
      simultaneousSlides: 2,
      // Optional: Do you want the slideshow to automatically
      // create "pagination" items? (1 2 3 4 which are clickable?)
      pagination: {
        // The type of pagination wrapper element
        wrapper: 'ul',
        // The pagination wrapper element CSS class
        wrapperClass: 'ul-class',
        // The type of pagination indicator element
        indicators: 'li',
        // The pagination indicator element CSS class
        indicatorsClass: 'li-class',
        // If you do not want the indicators to contain numbers,
        // set your own text content here!
        paginationContent: '•'
      },
      // Optional: Add a callback which will get called with this views  
      // viewoptions whenever the view gets updated.
      slideCallback: function( viewOptions ) {
        return console.log('This is a local slide callback, and this is the the wrapper element for this view: ', viewOptions.wrapper );
      }
    }, {
      // Here's another slideshow view which is bound to the first one
      // (this is good if you for example have text for your slideshow at
      // some other place in relation to the images of your slideshow)
      wrapper: this.find('.slide-show-2'),
      slides: this.findAll('.slide-show-2 .slide'),
      controls: this.findAll('.slide-show-2 .next-prev-btns'),
      // If you want your slideshow to "slide" instead of "fadeIn"
      // set fadeType to "slide"
      // Remember to set the inner elements (slides) CSS to
      // float: left; and display: block;
      fadeType: 'slide',
      // simultaneousSlides can also be a function, mainly used for returning
      // reactive vars (so the number of simultaneousSlides will be reactive!)
      // This value is tracked by a Tracker.autorun fn which should update any
      // changes to the slideshow (based on simultaneousSlides()) in real time.
      simultaneousSlides: function() {
        return Session.get('simSlides');
      },
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        indicators: 'li',
        indicatorsClass: 'li-class'
      }
    }]
  };
  
  // Here the slideshow is actually created!
  var slideShow = new Slidr( slideShowOptions );

};

```

The HTML could look like this:

```HTML
<template name="exampleTemplate">

  <div class="slide-show">
      
    <div class="slide">slide 1 view 1!</div>
    <div class="slide">slide 2 view 1!</div>
    <div class="slide">slide 3 view 1!</div>
    <div class="slide">slide 4 view 1!</div>
    <div class="slide">slide 5 view 1!</div>

    <p class="next-prev-btns">Prev</p>
    <p class="next-prev-btns">Next</p>

  </div>

  <div class="slide-show-2">
    
    <div class="slide">slide 1 view 2!</div>
    <div class="slide">slide 2 view 2!</div>
    <div class="slide">slide 3 view 2!</div>
    <div class="slide">slide 4 view 2!</div>
    <div class="slide">slide 5 view 2!</div>

  </div>

</template>
```

**Now you should have a slideshow with two views!**


## Todo

* Currently all pagination items will contain 1, 2, 3 etc or a specific text the user sets. This should probably be more verstaile, for example: a,b,c etc.
* Create tests!
* Create better looking examples.
* Probably explain the "supports multiple views per slideshow" in more detail!
