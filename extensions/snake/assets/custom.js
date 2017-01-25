(function ($) {
	'use strict';
	
	var ready = function () {
		$('#nav li').has('ul').on('click', function(){
			$(this).toggleClass('opened');
			$(this).children('ul').slideToggle(250);
		});
	};
	
	$(ready);
	
})(jQuery);
