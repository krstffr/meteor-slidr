slidr = function (options) {

	var that = this;

	that.options = options;

	that.controls = {};
	that.slides = {};
	that.wrapper = {};
	that.timer = {};
	that.pagination = {
		gotoSlideDataAttr: 'goto-slide',
		activeElClassAppen: '--active'
	};

	// The default fadeSpeed
	// This can be overrun by the options.
	that.fadeSpeed = 0;

	// The default "fadeMethod" (which does in fact not fade)
	that.fadeMethod = 'show';

	// The default timerMethod is next, meaning the jQuery next() method.
	that.timer.timerMethod = 'nextOrFirst';

	// Options should contain a wrapper, a slide-selector, a controls-selector.
	that.checkOptions = function() {

		// Check some required fields
		if (typeof that.options !== 'object')
			throw new Error('Options should be an object!');

		if (!that.options.wrapper)
			throw new Error('You have to pass a "wrapper" with the options object!');

		if (!that.options.slideSelector)
			throw new Error('You have to pass a "slideSelector" with the options object!');


		// Bind DOM elements to vars
		that.wrapper.wrapperEl = $(that.options.wrapper);
		that.slides.slidesEl = that.wrapper.wrapperEl.find(that.options.slideSelector);


		// Check .controls (if passed)
		if (that.options.controlsSelector) {

			that.controls.controlsEl = that.wrapper.wrapperEl.find(that.options.controlsSelector);

			if (that.controls.controlsEl.length !== 2)
				throw new Error('There should be two "controlsSelector" elements witin the wrapper selector!');

		}


		// Check .pagination (if passed)
		if (that.options.pagination) {

			if (typeof that.options.pagination !== 'object')
				throw new Error('options.pagination should be an object! You pased: '+ typeof that.options.pagination );

			if (!that.options.pagination.wrapperEl || typeof that.options.pagination.wrapperEl !== 'string' ||
				!that.options.pagination.wrapperElCssClass || typeof that.options.pagination.wrapperElCssClass !== 'string' ||
				!that.options.pagination.el || typeof that.options.pagination.el !== 'string' ||
				!that.options.pagination.elCssClass || typeof that.options.pagination.elCssClass !== 'string')
				throw new Error('You have to pass (strings): options.pagination.wrapperEl, options.pagination.wrapperElCssClass, options.pagination.el, options.pagination.elCssClass');

		}


		// DOM checks
		if (that.wrapper.wrapperEl.length < 1)
			throw new Error('There is no wrapper?');

		if (that.slides.slidesEl.length < 1)
			throw new Error('There are no slides?');

		// Fade Checks
		if (options.fadeSpeed && typeof options.fadeSpeed !== 'number')
			throw new Error('options.fadeSpeed must be a number, you passed: '+typeof options.fadeSpeed);

		// Timer checks
		if (options.timer && typeof options.timer !== 'number')
			throw new Error('options.timer must be a number, you passed: '+typeof options.timer);

		if (options.timerMethod && typeof options.timerMethod !== 'string')
			throw new Error('options.timerMethod must be a string, you passed: '+typeof options.timerMethod);


		// Set vars
		that.fadeSpeed = options.fadeSpeed || that.fadeSpeed;
		if (typeof that.fadeSpeed === 'number')
			that.fadeMethod = 'fadeIn';
		that.timer.time = options.timer || false;
		that.timer.timerMethod = options.timerMethod || that.timer.timerMethod;


		// The options were good! Cool!
		return true;

	};


	// .slides
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

	that.slides.showSlide = function( slide, currentSlide ) {
			
		// Hide the current slide and show the new one
		currentSlide.hide();
		slide[that.fadeMethod](that.fadeSpeed);

		// Get the index of the active slide and pass it to the pagination method
		var slideIndex = slide.index( that.options.slideSelector );
		that.pagination.setActiveEl( slideIndex );

	};

	that.slides.toggleSlide = function( method ) {
		// Get the currently visible slide and the one to show, based on jquery method ( like next() or prev() )
		var currentSlide = that.wrapper.wrapperEl.find(that.options.slideSelector+':visible');
		var slideToShow = $(currentSlide)[method](that.options.slideSelector);
		that.slides.showSlide( slideToShow, currentSlide );
	};

	that.slides.gotoSlide = function( index ) {
		// Get the current slide (to hide) and the slide to show based on index.
		var currentSlide = that.wrapper.wrapperEl.find(that.options.slideSelector+':visible');
		var slideToShow = that.wrapper.wrapperEl.find(that.options.slideSelector+':eq( '+ index +' )');
		that.slides.showSlide( slideToShow, currentSlide );
	};


	// .controls
	that.controls.checkIfSet = function() {
		return (that.options.controlsSelector !== undefined);
	};

	that.controls.hide = function() {
		if ( !that.controls.checkIfSet() ) return ;
		that.controls.controlsEl.hide();
		return true;
	};

	that.controls.setupVisibility = function() {
		if ( !that.controls.checkIfSet() ) return ;
		that.controls.controlsEl.show();
		return true;
	};

	that.controls.bindEvents = function() {
		if ( !that.controls.checkIfSet() ) return ;
		that.controls.controlsEl.off('click').on('click', function() {

			// Get which method to use when toggling slide
			var clickedBtn = $(this);
			var nextOrPrevMethod = clickedBtn.data('nextOrPrev');

			// Toggle slide.
			that.slides.toggleSlide( nextOrPrevMethod );

			// Remove the timer if user has clicked.
			that.timer.stop();

		});
	};


	// .timer
	that.timer.start = function() {
		// Start an automatic timer.
		that.timer.currentTimer = setInterval(function() {
			that.slides.toggleSlide( that.timer.timerMethod );
		}, that.timer.time );
	};

	that.timer.stop = function() {
		// Remove the current timer
		if (that.timer.currentTimer)
			clearInterval(that.timer.currentTimer);
	};


	// .pagination
	that.pagination.checkIfSet = function() {
		// Check if user has passed 'pagination' to options at all
		return (that.options.pagination !== undefined);
	};

	that.pagination.create = function() {
		if ( !that.pagination.checkIfSet() ) return ;

		var elBaseClass = that.options.pagination.elCssClass;
		var elActiveClass = elBaseClass+that.pagination.activeElClassAppen;

		// Create the wrapper el from the users passed options
		that.pagination.wrapperEl = $('<'+that.options.pagination.wrapperEl+'>').addClass(that.options.pagination.wrapperElCssClass);

		// Loop over all slides...
		that.slides.slidesEl.each(function( index ) {

			// ...and create a new pagination element for every slides which appends to the wrapper element
			var newPaginationEl = $('<'+that.options.pagination.el+'>')
				.addClass(elBaseClass)
				.data( that.pagination.gotoSlideDataAttr, index )
				// Since people don't like lists which start at 0, we start at 1
				.text( index + 1 );

			// If this element is the first one, make it active
			if (index < 1)
				newPaginationEl.addClass(elActiveClass);

			that.pagination.wrapperEl.append(newPaginationEl);

		});

		// Append the wrapper to the slideshsow wrapper element
		$(that.wrapper.wrapperEl).append(that.pagination.wrapperEl);

	};

	that.pagination.bindEvents = function() {
		if ( !that.pagination.checkIfSet() ) return ;

		// Bind click events to all pagination element (children of the pagination.wrapperEl)
		that.pagination.wrapperEl.find('.'+that.options.pagination.elCssClass).off('click').on('click', function() {

			// Get the slide index from the data attribute
			var gotoSlideIndex =  $(this).data( that.pagination.gotoSlideDataAttr );

			// Goto the chosen slide
			that.slides.gotoSlide( gotoSlideIndex );

			// Remove the timer
			that.timer.stop();

		});

	};

	that.pagination.setActiveEl = function( index ) {
		if ( !that.pagination.checkIfSet() ) return ;

		var elBaseClass = that.options.pagination.elCssClass;
		var elActiveClass = elBaseClass+that.pagination.activeElClassAppen;

		// Remove currently active element
		that.pagination.wrapperEl.find('.'+elActiveClass).removeClass(elActiveClass);

		// Add the active class by using the index
		that.pagination.wrapperEl.find('.'+elBaseClass+':eq( '+ index+' )').addClass(elActiveClass);

	};


	// Init
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

		// Add pagination if user want's that
		that.pagination.create();

		// Add pagination if user want's that
		that.pagination.bindEvents();

	};

	that.init();

};