/*
 * jQuery Slideshow Plugin
 *
 * v0.1
 *
 * Copyright (c) 2009 Antonio Salumbides
 *
 * Dual licensed under the MIT and GPL licenses:
 * ---------------------------------------------
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Example Usage:
 * --------------
 *   $("#gallery").slideshow({
 *     displayLength: 5,         // in seconds
 *     transitionLength: 0.1,    // in seconds
 *     slides: '#slides',        // img tags by default
 *   });
 * 
 */

(function($) {
  // jQuery plugin definition
  $.fn.slideshow = function(params) {
    // merge with default user parameters
    params = $.extend({ 
      displayLength: 4, 
      transitionLength: 2,
      slides: 'img',
      effect: 'fade'
    }, params);

    // Convert transition length to milliseconds.
    params['transitionLength'] = params['transitionLength'] * 1000;
    params['displayLength'] = params['displayLength'] * 1000;

    var o = this;
    setTimeout(function(){next_slide(o, params);}, params['displayLength']);
 
    return this;
  };
 
  function next_slide($slideshow_container, params) {
    var switched = false;
    $slideshow_container.children(params['slides']).each(function() {
      if ($(this).hasClass('active') && !switched) {
        $(this).fadeOut(params['transitionLength'], function () {
          $(this).removeClass('active');
        });
        if ($(this).next().length > 0) {
          $(this).next().fadeIn(params['transitionLength'], function () {
            $(this).addClass('active');
          });
        }
        else {
          $slideshow_container.children(params['slides']+':first').fadeIn(params['transitionLength'], function () {
            $(this).addClass('active');
          });
        }
        switched = true;
        setTimeout(function(){next_slide($slideshow_container, params);}, params['displayLength']+params['transitionLength']);
      }
    });
  }
})(jQuery);
