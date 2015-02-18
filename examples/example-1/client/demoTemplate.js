Template.demoTemplate.rendered = function () {
	
	var slideShowOptions = {
    timer: 5500,
    carousel: true,
    views: [{
      wrapper: this.find('.slideshow-first'),
      slides: this.findAll('.slideshow-first__slide'),
      controls: this.findAll('.slideshow-first__controls__control'),
      controlsBaseClass: 'next-prev-btns'
    }]
  };

  var slideShow = new Slidr( slideShowOptions );

};