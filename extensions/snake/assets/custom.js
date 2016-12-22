(function ($) {
	'use strict';
	
	var ready = function () {
		$('#nav li').has('ul').on('click', function(){
			$(this).children('ul').toggleClass('shown');
		});
	};
	
	$(ready);
	
})(jQuery);
