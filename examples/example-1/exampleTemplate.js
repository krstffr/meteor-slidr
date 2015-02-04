if (Meteor.isServer)
	return false;

Template.exampleTemplate.rendered = function () {

	var slideShowOptions = {
    wrapper: this.find('.slide-show'),
    slideSelector: '.slide',
    controlsSelector: '.next-prev-btns',
    // Will make the slides fadeIn( fadeSpeed ) instead of just show()
    fadeSpeed: 250,
    // The time in ms between automatic slide toggles. If you don't pass this the slides will only be changed manually.
    timer: 6500,
    // If you want to generate a 1-2-3 pagination for you slides, pass a pagination object like this
    simultaneousItems: function () {
			return 1;
    },
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

};