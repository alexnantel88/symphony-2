(function ($) {
	'use strict';
	
	var ready = function () {

		/* Header - Nav */

		$('#nav li').has('ul').on('click', function(){
			$(this).toggleClass('opened');
			$(this).children('ul').slideToggle(250);
		});

		/* Header - Actions */

		if($('.page-single #contents .actions, .single #contents .actions').length) $('#context').addClass('spaced-right');
	};
	
	$(ready);
	
})(jQuery);
