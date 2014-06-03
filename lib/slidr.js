slidr = function (options) {

	var that = this;

	that.options = options;

	that.controls = {};
	that.slides = {};
	that.wrapper = {};

	// The default fadeSpeed
	// This can be overrun by the options.
	that.fadeSpeed = 250;

	// Options should contain a wrapper, a slide-selector, a controls-selector.
	that.checkOptions = function() {

		if (typeof that.options !== 'object')
			throw new Error('Options should be an object!');

		if (!that.options.wrapper)
			throw new Error('You have to pass a "wrapper" with the options object!');

		if (!that.options.slideSelector)
			throw new Error('You have to pass a "slideSelector" with the options object!');

		if (!that.options.controlsSelector)
			throw new Error('You have to pass a "controlsSelector" with the options object!');

		// Bind DOM elements to vars
		that.wrapper.wrapper = $(that.options.wrapper);
		that.controls.controls = that.wrapper.wrapper.find(that.options.controlsSelector);
		that.slides.slides = that.wrapper.wrapper.find(that.options.slideSelector);

		if (that.wrapper.wrapper.length < 1)
			throw new Error('There is no wrapper?');

		if (that.controls.controls.length !== 2)
			throw new Error('There should be two "controlsSelector" elements witin the wrapper selector!');

		if (that.slides.slides.length < 1)
			throw new Error('There are no slides?');

		if (options.fadeSpeed && typeof options.fadeSpeed !== 'number')
			throw new Error('options.fadeSpeed must be a number, you passed: '+typeof options.fadeSpeed);

		that.fadeSpeed = options.fadeSpeed || that.fadeSpeed;

		// The options were good! Cool!
		return true;

	};

	that.slides.setupVisibility = function() {
		// Hide all slides except the first one
		that.slides.slides.hide().first().show();
		return true;
	};

	that.slides.checkCount = function() {
		// If there are no slides, just return false which will stop the init()
		// This is not looked upon as an error, but rather like "oh look we don't have enough slides, abort"
		if ($(that.options.wrapper).find(that.options.slideSelector).length <= 1)
			return false;
		return true;
	};

	that.controls.hide = function() {
		that.controls.controls.hide();
		return true;
	};

	that.controls.setupVisibility = function() {
		that.controls.controls.show();
		return true;
	};

	that.controls.bindEvents = function() {
		that.controls.controls.off('click').on('click', function() {

			var clickedBtn = $(this);
			var nextOrPrev = clickedBtn.data('nextOrPrev');
			var currentSlide = that.wrapper.wrapper.find(that.options.slideSelector+':visible');

			$(currentSlide).hide();
			$(currentSlide)[nextOrPrev](that.options.slideSelector).fadeIn(that.fadeSpeed);

		});
	};

	that.init = function() {
		
		// Control our options.
		that.checkOptions();

		// If controls are not already hidden, do it now!
		that.controls.hide();

		// Make sure we have enough slides, if not then don't init() anymore.
		if ( !that.slides.checkCount() ) return false;
		
		// Hide all the slides which should be hidden
		that.slides.setupVisibility();

		// Show the controls
		that.controls.setupVisibility();

		// Attach events to controls
		that.controls.bindEvents();

		console.log('init passed!');

	};

	that.init();

};