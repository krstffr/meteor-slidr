if (Meteor.isServer)
	return false;

Template.exampleTemplate.rendered = function () {

  var options = {
    timer: 1500,
    carousel: true,
    views: [{
      wrapper: this.find('.slide-show'),
      slides: this.findAll('.slide-show .slide'),
      controls: this.findAll('.slide-show .next-prev-btns'),
      simultaneousSlides: 2,
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        indicators: 'li',
        indicatorsClass: 'li-class'
      }
    }, {
      wrapper: this.find('.slide-show-2'),
      slides: this.findAll('.slide-show-2 .slide'),
      simultaneousSlides: 2,
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        indicators: 'li',
        indicatorsClass: 'li-class',
        paginationContent: '•'
      }
    }]
  };

  var slideShow = new Slidr( options );

  var slideShow2 = new Slidr({
    timer: 350,
    carousel: false,
    views: [{
      wrapper: this.find('.another-slideshow'),
      slides: this.findAll('.another-slideshow .slide'),
      simultaneousSlides: 1,
      pagination: {
        wrapper: 'ul',
        wrapperClass: 'ul-class',
        indicators: 'li',
        indicatorsClass: 'li-class-2'
      }
    }]
  });

};