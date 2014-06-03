/********************************************************************************
 * jQuery.nextOrFirst()
 *
 * PURPOSE:  Works like next(), except gets the first item from siblings if there is no "next" sibling to get.
 ********************************************************************************/
jQuery.fn.nextOrFirst = function(selector){
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
};

/********************************************************************************
 * jQuery.prevOrLast()
 * PURPOSE:
 * Works like prev(), except gets the last item from siblings if there is no "prev" sibling to get.
 ********************************************************************************/
jQuery.fn.prevOrLast = function(selector){
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
};
