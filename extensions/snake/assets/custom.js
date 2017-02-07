(function ($) {
	'use strict';

	var win = $(window);
	var o = {
		header: '#header',
		btnMobileNav: '#btn-toggle-header-mobile',
		nav: '#nav',
		navEl: '#nav li',
		actions: '.page-single #contents .actions, .single #contents .actions, body.entry_relationship.page-index #contents .actions',
		context: '#context',
		contextTabs: '#context .tabs li',
		contextDrawers: '#context .actions a.button.drawer',
		contents: '#contents',
		contentsForm: '#contents > form',
		tabGroup: '.tab-group',
		secTabGroup: '.secondary.column .tab-group',
		priTabGroup: '.primary.column .tab-group',
		columns: '.two.columns',
		secColumn: '.secondary.column',
		priColumn: '.primary.column',
		multiTabsEl: '.field-multilingual ul.tabs li',
		multiLabel: '.field-multilingual > .container > label',
		editorEl: '.editor-toolbar a',
		tableEl: 'table td'
	};

	var ready = function () {

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Header and Context
		//
		/////////////////////////////////////////////////////////////////////////// */

		/*
		// Header Nav
		_____________________________________________ */

		/* Init - Steup mobile Nav Toggler */

		$(o.header).append('<a href="" id="btn-toggle-header-mobile"><svg version="1" xmlns="http://www.w3.org/2000/svg" width="24" height="15" viewBox="0 0 24 15" class="line-height-0 valign-top width-full height-full block"><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M0 0v3h24V0H0zm0 9h24V6H0v3zm0 6h24v-3H0v3z"/></svg></a>');

		$(o.header).on('click', o.btnMobileNav, function(){
			$(o.header).toggleClass('opened');

			return false;
		});

		/* Init - Show Subnav if parent active and highlight Subnav page if the case */

		$(o.navEl + '.active').has('ul').each(function(){
			var t = $(this);
			t.addClass('opened');
			$('ul', t).show();

			$('ul > li a', t).each(function(){
				var t = $(this);
				if(window.location.href.includes(t.attr('href'))) t.parent().addClass('active');
			});
		});

		/* Toggle Subnav on parent click */

		$(o.navEl).has('ul').on('click', '> span', function(){
			var t = $(this);
			t.parent().toggleClass('opened');
			t.siblings('ul').slideToggle(250);
		});

		/*
		// Context Actions
		_____________________________________________ */

		/* Init - Add space to the Context if there are action buttons */

		if($(o.actions).length){
			$(o.context).addClass('spaced-right');
			$(o.contents).addClass('spaced-bottom');
		}

		/* Init - Wrap Inputs and Buttons */

		$('input, button', o.actions).each(function(){
			var t = $(this);
			t.wrap('<div class="button-container" data-icon="'+t.attr('name')+'"></div>');
		});

		/*
		// Context Tabs
		_____________________________________________ */

		/* Init - Determine how to center content */

		if(!$(o.tabGroup).length && !$(o.secColumn).length) $(o.contents).addClass('centered-content');

		/* Init - TEMP repartition of the divided tabs in the Primary Column */

		if($(o.secTabGroup).length > 1){
			$(o.secTabGroup).parents(o.columns).attr('class', '');

			$(o.secTabGroup).each(function(){
				var t = $(this);
				var classes = t.attr('class').split(' ');

				if($(o.priTabGroup+classes[1]).length) $(o.priTabGroup+classes[1]).append(t.html());
				else $(o.priColumn).append(t);
			});

			$(o.secTabGroup).remove();
		}

		/* Init - Add a title to each Tab */

		$(o.tabGroup).each(function(){
			var t = $(this);
			var title = $(o.contextTabs).eq(t.index()).html();
			t.prepend('<h2>'+title+'</h2>');
		});

		/* Scroll to right TabGroup on TabNav click */

		$(o.contextTabs).on('click', function(){
			var t = $(this);

			$('html, body').stop().animate({scrollTop: ($(o.tabGroup).eq(t.index()).offset().top - 120)}, 750);

			return false;
		});

		/*
		// Context Association Drawer
		_____________________________________________ */

		/* Init - Always Close Drawer */

		if($(o.contextDrawers).hasClass('selected')) $(o.contextDrawers).trigger('click');

		/* Check Drawer state on DrawerButton click */

		$(o.contextDrawers).on('click', function(){
			changeStateDrawer();
		});

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Contents
		//
		/////////////////////////////////////////////////////////////////////////// */

		/*
		// Table
		_____________________________________________ */

		$(o.tableEl).each(function(){
			var t = $(this);
			var table = t.parents('table');
			var text = $('thead th', table).eq(t.index()).find('span').text() + ' : ';
			$(this).attr('data-title', text)
		});

		/*
		// Markdown
		_____________________________________________ */

		/* Trigger fullscreen state on Body */

		$(o.editorEl).on('click', function(){
			var t = $(this).parents('.editor-toolbar');

			setTimeout(function(){
				if(t.hasClass('fullscreen')) $('body').addClass('editor-fullscreen');
				else $('body').removeClass('editor-fullscreen');
			}, 100);
		});

		/*
		// Multilingual Fields
		_____________________________________________ */

		/* Init - Cut all strings to only 2 characters */

		$(o.multiTabsEl).each(function(){
			var t = $(this);
			t.html(t.html().substring(0,2));
		});

		/* Space the Label depending on the Tabs width */

		$(o.multiLabel).each(function(){
			var t = $(this);
			t.css({'padding-right': (t.next('.tabs').width() + 15)});
		});

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Init
		//
		/////////////////////////////////////////////////////////////////////////// */

		changeStateDrawer();
		onScroll();

		win.on('scroll', function(){
			onScroll();
		});

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Functions
		//
		/////////////////////////////////////////////////////////////////////////// */

		/* Header Drawers - Function */

		function changeStateDrawer(){
			var t = $(o.contextDrawers);
			var d = $(t.attr('href'));

			if(t.hasClass('selected')) d.addClass('opened');
			else d.removeClass('opened');
		}

		/* Window Scroll - Function */

		function onScroll(){
			var pageEnd = $(document).height() - win.height();
			var curScroll = win.scrollTop();

			if(curScroll == pageEnd){
				$(o.contextTabs).removeClass('selected');
				$(o.contextTabs + ':last-child').addClass('selected');
			} else {
				$(o.tabGroup).each(function(){
					var t = $(this);

					if(curScroll + (win.height() / 2) > t.offset().top) {
						$(o.contextTabs).removeClass('selected');
						$(o.contextTabs).eq(t.index()).addClass('selected');
					}
				});
			}
		}

		/* Browser Detector */

		var browserDetector = (function () {
			var getUserAgent = function (userAgent) {
				if (!userAgent) {
					return window.navigator.userAgent;
				}
				return userAgent;
			};
			
			var testUserAgent = function (regexp, userAgent) {
				userAgent = getUserAgent(userAgent);
				return regexp.test(userAgent);
			};
			
			var detector = {
			
				isTablet: function (userAgent) {
					return detector.isMobile(userAgent) &&
						!detector.isPhone(userAgent);
				},
				
				/* @deprecated */
				isTablette: function (userAgent) {
					return this.isTablet(userAgent);
				},
				
				isIos: function (userAgent) {
					return detector.isIphone(userAgent) ||
						detector.isIpad(userAgent);
				},
				
				isIphone: function (userAgent) {
					return !detector.isIpad(userAgent) &&
						(testUserAgent(/iPhone/i, userAgent) || testUserAgent(/iPod/i, userAgent));
				},
				
				isIpad: function (userAgent) {
					return testUserAgent(/iPad/i, userAgent);
				},
				
				isAndroid: function (userAgent) {
					return testUserAgent(/Android/i, userAgent);
				},
				
				isAndroidPhone: function (userAgent) {
					return detector.isAndroid(userAgent) &&
						testUserAgent(/mobile/i, userAgent);
				},
				
				isPhone: function (userAgent) {
					return !detector.isIpad(userAgent) && (
						detector.isOtherPhone(userAgent) ||
						detector.isAndroidPhone(userAgent) ||
						detector.isIphone(userAgent));
				},
				
				isOtherPhone: function (userAgent) {
					return testUserAgent(/phone/i, userAgent);
				},
				
				isOtherMobile: function (userAgent) {
					return testUserAgent(/mobile/i, userAgent) ||
						detector.isOtherPhone(userAgent);
				},
				
				isMobile: function (userAgent) {
					return detector.isIos(userAgent) ||
						detector.isAndroid(userAgent) ||
						detector.isOtherMobile(userAgent);
				},
				
				isMsie: function (userAgent) {
					return testUserAgent(/msie/mi, userAgent) ||
						testUserAgent(/trident/mi, userAgent);
				}
			};
			
			return detector;
		})();
		
		$.iphone = browserDetector.isIphone();
		$.ipad = browserDetector.isIpad();
		$.ios = browserDetector.isIos();
		$.mobile = browserDetector.isMobile();
		$.android = browserDetector.isAndroid();
		$.phone = browserDetector.isPhone();
		$.tablet = browserDetector.isTablet();
		$.touch = $.ios || $.android;

		if($.touch) $('html').addClass('touch');
	};
	
	$(ready);
	
})(jQuery);
