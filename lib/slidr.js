slidr = function (options) {

	var that = this;

	that.options = options;

	that.controls = {};
	that.slides = {};
	that.wrapper = {};
	that.timer = {};

	// The default fadeSpeed
	// This can be overrun by the options.
	that.fadeSpeed = 0;

	// The default "fadeMethod" (which does in fact not fade)
	that.fadeMethod = 'show';

	// The default timerMethod is next, meaning the jQuery next() method.
	that.timer.timerMethod = 'nextOrFirst';

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
		that.wrapper.wrapperEl = $(that.options.wrapper);
		that.controls.controlsEl = that.wrapper.wrapperEl.find(that.options.controlsSelector);
		that.slides.slidesEl = that.wrapper.wrapperEl.find(that.options.slideSelector);

		if (that.wrapper.wrapperEl.length < 1)
			throw new Error('There is no wrapper?');

		if (that.controls.controlsEl.length !== 2)
			throw new Error('There should be two "controlsSelector" elements witin the wrapper selector!');

		if (that.slides.slidesEl.length < 1)
			throw new Error('There are no slides?');

		if (options.fadeSpeed && typeof options.fadeSpeed !== 'number')
			throw new Error('options.fadeSpeed must be a number, you passed: '+typeof options.fadeSpeed);

		if (options.timer && typeof options.timer !== 'number')
			throw new Error('options.timer must be a number, you passed: '+typeof options.timer);

		if (options.timerMethod && typeof options.timerMethod !== 'string')
			throw new Error('options.timerMethod must be a string, you passed: '+typeof options.timerMethod);

		// Set fadespeed
		that.fadeSpeed = options.fadeSpeed || that.fadeSpeed;
		if (typeof that.fadeSpeed === 'number')
			that.fadeMethod = 'fadeIn';
		that.timer.time = options.timer || false;
		that.timer.timerMethod = options.timerMethod || that.timer.timerMethod;

		// The options were good! Cool!
		return true;

	};

	that.slides.setupVisibility = function() {
		// Hide all slides except the first one
		that.slides.slidesEl.hide().first().show();
		return true;
	};

	that.slides.checkCount = function() {
		// If there are no slides, just return false which will stop the init()
		// This is not looked upon as an error, but rather like "oh look we don't have enough slides, abort"
		if ($(that.options.wrapper).find(that.options.slideSelector).length <= 1)
			return false;
		return true;
	};

	that.slides.toggleSlide = function( method ) {
		// Get the currently visible slide, hide it and show whichever gets targeted from the passed method
		var currentSlide = that.wrapper.wrapperEl.find(that.options.slideSelector+':visible');
		$(currentSlide).hide();
		$(currentSlide)[method](that.options.slideSelector)[that.fadeMethod](that.fadeSpeed);
	};

	that.controls.hide = function() {
		that.controls.controlsEl.hide();
		return true;
	};

	that.controls.setupVisibility = function() {
		that.controls.controlsEl.show();
		return true;
	};

	that.controls.bindEvents = function() {
		that.controls.controlsEl.off('click').on('click', function() {

			// Get which method to use when toggling slide
			var clickedBtn = $(this);
			var nextOrPrevMethod = clickedBtn.data('nextOrPrev');

			// Toggle slide.
			that.slides.toggleSlide( nextOrPrevMethod );

			// Remove the timer if user has clicked.
			clearInterval(that.timer.currentTimer);

		});
	};

	that.timer.start = function() {
		// Start an automatic timer.
		that.timer.currentTimer = setInterval(function() {
			that.slides.toggleSlide( that.timer.timerMethod );
		}, that.timer.time );
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

		// Start the timer
		if (options.timer)
			that.timer.start();

	};

	that.init();

};