if (Meteor.isServer)
	return false;

simSlides = new ReactiveVar( 3 );

Template.exampleTemplate.rendered = function () {

  new Slidr({
    timer: 1500,
    carousel: true,
    slideCallback: _.debounce( function () {
      console.log('A global slide callback, gets called whenever this slidr slides. Protop: debounce it to avoid multiple simultaneous calls!');
    }, 50, true ),
    views: [{
      wrapper: this.find('.slide-show'),
      slides: this.findAll('.slide-show .slide'),
      controls: this.findAll('.slide-show .next-prev-btns'),
      simultaneousSlides: 3,
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        showControls: false,
        indicators: 'li',
        indicatorsClass: 'li-class'
      },
      slideCallback: function( viewOptions ) {
        return console.log('This is a local slide callback, and this is the the wrapper element for this view: ', viewOptions.wrapper );
      }
    }, {
      wrapper: this.find('.slide-show-2'),
      slides: this.findAll('.slide-show-2 .slide'),
      fadeType: 'slide',
      simultaneousSlides: function() {
        return simSlides.get();
      },
      pagination: {
        wrapper: 'div',
        wrapperClass: 'ul-class-3',
        indicators: 'div',
        indicatorsClass: 'li-class-3',
        paginationContent: '•'
      }
    }]
  });

  new Slidr({
    timer: 350,
    carousel: false,
    views: [{
      wrapper: this.find('.another-slideshow'),
      slides: this.findAll('.another-slideshow .slide'),
      controls: this.findAll('.another-slideshow .next-prev-btns'),
      controlsBaseClass: 'next-prev-btns',
      simultaneousSlides: 1,
      showControls: false,
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        indicators: 'li',
        indicatorsClass: 'li-class-2'
      }
    }]
  });

  new Slidr({
    timer: 4500,
    carousel: false,
    views: [{
      wrapper: this.find('.slider-slides'),
      slides: this.findAll('.slider-slides .slide'),
      controls: this.findAll('.slider-slides .next-prev-btns'),
      controlsBaseClass: 'next-prev-btns',
      fadeType: 'slide',
      simultaneousSlides: 4
    }, {
      wrapper: this.find('.slider-slides-text-slides'),
      slides: this.findAll('.slider-slides-text-slides .text-slide')
    }]
  });

  


};

Template.exampleTemplate.events({
  'submit .change-simultaneous-slides': function ( e, tmpl ) {
    
    e.preventDefault();
    
    var input = parseInt( $(tmpl.find('input')).val(), 10 );
    if (input === 0)
      input = 1;
    if (input > 3)
      input = 3;

    simSlides.set( input );

  }
});