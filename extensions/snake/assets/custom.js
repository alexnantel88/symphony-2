(function ($) {
	'use strict';

	var win = $(window);
	var o = {
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
		editorEl: '.editor-toolbar a'
	};

	var ready = function () {

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Header
		//
		/////////////////////////////////////////////////////////////////////////// */

		/*
		// Header Nav
		_____________________________________________ */

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

		if($(o.actions).length) $(context).addClass('spaced-right');

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

		/* Init - TEMP Cut all strings to only 2 characters */

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
				$(o.tabGroup + ':not(:first-child)').each(function(){
					var t = $(this);

					if(curScroll + (win.height() / 2) > t.offset().top) {
						$(o.contextTabs).removeClass('selected');
						$(o.contextTabs).eq(t.index()).addClass('selected');
					}
				});
			}
		}
	};
	
	$(ready);
	
})(jQuery);
