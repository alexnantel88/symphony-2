(function ($) {
	'use strict';

	var win = $(window);
	
	var ready = function () {

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Header
		//
		/////////////////////////////////////////////////////////////////////////// */

		/* Nav - Init */

		$('#nav li.active').has('ul').each(function(){
			var t = $(this);
			t.addClass('opened');
			$('ul', t).show();

			$('ul > li a', t).each(function(){
				var t = $(this);
				if(window.location.href.includes(t.attr('href'))) t.parent().addClass('active');
			});
		});

		/* Nav - Toggle Submenu */

		$('#nav li').has('ul').on('click', '> span', function(){
			var t = $(this);
			t.parent().toggleClass('opened');
			t.siblings('ul').slideToggle(250);
		});

		/* Actions - Init */

		if($('.page-single #contents .actions, .single #contents .actions, .page-index #contents .actions').length) $('#context').addClass('spaced-right');

		/* Tabs - Init */

		$('.tab-group:not(:first-child)').each(function(){
			var t = $(this);
			var title = $('#context .tabs li').eq(t.index()).html();
			t.prepend('<h2>'+title+'</h2>');
		});

		/* Tabs - Anchors */

		$('#context .tabs li').on('click', function(){
			var t = $(this);

			$('html, body').stop().animate({scrollTop: ($('.tab-group').eq(t.index()).offset().top - 120)}, 750);

			return false;
		});

		/* Drawers - Check State */

		$('#context .actions a.button.drawer').on('click', function(){
			changeStateDrawer();
		});

		/* Drawers - Function */

		function changeStateDrawer(){
			var t = $('#context .actions a.button.drawer');
			var d = $(t.attr('href'));

			if(t.hasClass('selected')) d.addClass('opened');
			else d.removeClass('opened');
		}

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Init
		//
		/////////////////////////////////////////////////////////////////////////// */

		changeStateDrawer();
		onScroll();

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// onScroll
		//
		/////////////////////////////////////////////////////////////////////////// */

		/* Scroll - Events */

		win.on('scroll', function(){
			onScroll();
		});

		/* Scroll - Function */

		function onScroll(){
			var pageEnd = $(document).height() - win.height();
			var curScroll = win.scrollTop();

			if(curScroll == pageEnd){
				$('#context .tabs li').removeClass('selected');
				$('#context .tabs li:last-child').addClass('selected');
			} else {
				$('.tab-group:not(:first-child)').each(function(){
					var t = $(this);

					if(curScroll + (win.height() / 2) > t.offset().top) {
						$('#context .tabs li').removeClass('selected');
						$('#context .tabs li').eq(t.index()).addClass('selected');
					}
				});
			}
		}
	};
	
	$(ready);
	
})(jQuery);
