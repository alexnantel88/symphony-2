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

		/* Tabs */

		$('.tab-group:not(:first-child)').each(function(){
			var t = $(this);
			var title = $('#context .tabs li').eq(t.index()).html();
			t.prepend('<h2>'+title+'</h2>');
		});

		$('#context .tabs li').on('click', function(){
			var t = $(this);

			$('html, body').animate({scrollTop: ($('.tab-group').eq(t.index()).offset().top - 120)}, 750);

			return false;
		});
	};
	
	$(ready);
	
})(jQuery);
