(function ($) {
	'use strict';

	var win = $(window);
	var o = {
		header: '#header',
		btnMobileNav: '#btn-toggle-header-mobile',
		nav: '#nav',
		navEl: '#nav li',
		navElFirst: '#nav > ul > li > span',
		actions: '.page-single #contents .actions, .single #contents .actions, body.entry_relationship.page-index #contents .actions',
		context: '#context',
		contextTabs: '#context .tabs li',
		contextDrawers: '#context > .actions a.button.drawer',
		contextActions: '#context > .actions a',
		actionButtons: '.page-single #contents .actions .button-container, .single #contents .actions .button-container, body.entry_relationship.page-index #contents .actions .button-container',
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
		tableEl: 'table td',
		dashboard: '#dashboard',
		dashboardDrawerSelects: '#drawer-dashboard select',
		dashboardDrawerSelectsArrows: '#drawer-dashboard .select2-container .select2-selection--single .select2-selection__arrow',
		selectArrows: '.select2-container .select2-selection--single .select2-selection__arrow'
	};
	var s = {
		burger: '<svg version="1" xmlns="http://www.w3.org/2000/svg" width="24" height="15" viewBox="0 0 24 15" class="line-height-0 valign-top width-full height-full block"><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M0 0v3h24V0H0zm0 9h24V6H0v3zm0 6h24v-3H0v3z"/></svg>',
		arrow: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="10px" viewBox="0 0 18 10"><path fill="currentColor" d="M5,10c-0.3,0-0.5-0.1-0.7-0.3l-4-4c-0.4-0.4-0.4-1,0-1.4l4-4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L2.4,5l3.3,3.3c0.4,0.4,0.4,1,0,1.4C5.5,9.9,5.3,10,5,10z"/><path fill="currentColor" d="M17,6H2C1.4,6,1,5.6,1,5s0.4-1,1-1h15c0.6,0,1,0.4,1,1S17.6,6,17,6z"/></svg>',
		chevron: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="9.2px" height="5.6px" viewBox="0 0 9.2 5.6"><path fill="currentColor" d="M4.6,5.6c-0.3,0-0.5-0.1-0.7-0.3L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.9,2.9l2.8-2.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L5.3,5.3C5.2,5.5,4.9,5.6,4.6,5.6z"/></svg>',
		view: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="33.7px" height="19.3px" viewBox="0 0 33.7 19.3"><path fill="currentColor" d="M16.8,19.3c-9.1,0-16.3-8.7-16.6-9c-0.3-0.4-0.3-0.9,0-1.3c0.3-0.4,7.5-9,16.6-9s16.3,8.7,16.6,9c0.3,0.4,0.3,0.9,0,1.3C33.2,10.7,26,19.3,16.8,19.3z M2.3,9.7c1.8,1.9,7.7,7.7,14.5,7.7c6.8,0,12.7-5.7,14.5-7.7C29.6,7.7,23.7,2,16.8,2C10,2,4.1,7.7,2.3,9.7z"/><path fill="currentColor" d="M16.8,15.3c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6C22.5,12.8,20,15.3,16.8,15.3zM16.8,6c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6S18.9,6,16.8,6z"/></svg>',
		add: '<svg xmlns="http://www.w3.org/2000/svg" width="36px" height="35px" viewBox="0 0 36 35"><polygon transform="rotate(45, 18, 18)" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" points="35.9,2.9 33.1,0.1 18,15.2 3.3,0.5 0.5,3.3 15.2,18 1.1,32.1 3.9,34.9 18,20.8 32.7,35.5 35.5,32.7 20.8,18"/></svg>',
		edit: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 26 26"><path fill="currentColor" d="M13.2,26c-2.2,0-2.8-1.9-3.1-3c-0.1-0.4-0.2-0.7-0.4-1c0-0.1-0.1-0.2-0.1-0.2c-0.1,0-0.1,0-0.2,0.1c-0.3,0.1-0.6,0.3-1,0.5c-1,0.6-2.8,1.6-4.4,0c-1.6-1.6-0.7-3.3-0.2-4.4c0.2-0.4,0.4-0.7,0.4-1c0-0.1,0-0.2,0.1-0.2c-0.1,0-0.1-0.1-0.2-0.1c-0.3-0.1-0.6-0.2-1-0.3C2,16,0,15.5,0,13.3c0-2.2,1.9-2.8,3-3.2c0.4-0.1,0.7-0.2,1-0.4c0.1,0,0.2-0.1,0.2-0.1c0-0.1,0-0.1-0.1-0.2C4,9,3.8,8.7,3.6,8.4c-0.6-1-1.6-2.8,0-4.4C5.2,2.4,6.9,3.3,8,3.8C8.4,4,8.7,4.2,9,4.3c0.1,0,0.2,0,0.2,0.1c0-0.1,0.1-0.1,0.1-0.2c0.1-0.3,0.2-0.6,0.3-1C10,2,10.5,0,12.7,0c2.2,0,2.8,1.9,3.2,3c0.1,0.4,0.2,0.7,0.4,1c0.1,0.1,0.1,0.2,0.1,0.2c0.1,0,0.1,0,0.2-0.1C17,4,17.3,3.9,17.6,3.7c1-0.6,2.8-1.6,4.4,0c1.6,1.6,0.7,3.3,0.2,4.4c-0.2,0.4-0.4,0.7-0.4,1c0,0.1,0,0.2-0.1,0.2c0.1,0,0.1,0.1,0.2,0.1c0.3,0.1,0.6,0.2,1,0.3C24,10,26,10.5,26,12.7c0,2.3-1.9,2.8-3,3.2c-0.4,0.1-0.7,0.2-1,0.4c-0.1,0-0.2,0.1-0.2,0.1c0,0.1,0,0.1,0.1,0.2c0.1,0.3,0.3,0.6,0.5,1c0.6,1,1.6,2.8,0,4.4c-1.6,1.6-3.3,0.7-4.4,0.2c-0.4-0.2-0.7-0.4-1-0.4c-0.1,0-0.2,0-0.2-0.1c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.3-0.2,0.6-0.3,1C16,24,15.5,26,13.2,26C13.2,26,13.2,26,13.2,26z M9.8,19.8c0.2,0,0.3,0,0.5,0.1c0.6,0.2,0.9,0.7,1.2,1.2c0.2,0.4,0.4,0.9,0.5,1.4c0.4,1.3,0.6,1.6,1.3,1.6c0.6,0,0.8-0.3,1.2-1.6c0.1-0.5,0.3-1,0.5-1.4c0.3-0.5,0.6-1,1-1.2c0.5-0.2,1-0.1,1.7,0c0.5,0.1,0.9,0.4,1.3,0.6c1.2,0.7,1.6,0.7,2,0.2c0.4-0.5,0.4-0.8-0.3-2c-0.2-0.4-0.5-0.9-0.6-1.3c-0.2-0.6-0.3-1.1-0.1-1.6c0.2-0.5,0.6-0.8,1.2-1.1c0,0,0,0,0,0c0.4-0.2,0.9-0.4,1.4-0.5c1.3-0.4,1.6-0.6,1.6-1.3s-0.3-0.8-1.6-1.2c-0.5-0.1-1-0.3-1.4-0.5c-0.5-0.3-1-0.6-1.2-1c-0.2-0.6-0.1-1.1,0-1.7c0.1-0.5,0.4-0.9,0.6-1.3c0.7-1.2,0.7-1.6,0.2-2c-0.5-0.4-0.8-0.4-2,0.3c-0.4,0.2-0.9,0.5-1.3,0.6c-0.6,0.2-1.1,0.3-1.6,0.1c-0.6-0.2-0.9-0.7-1.1-1.2C14.3,4.5,14.2,4,14,3.6C13.6,2.2,13.4,2,12.8,2c-0.6,0-0.8,0.3-1.2,1.6c-0.1,0.5-0.3,1-0.5,1.4c-0.3,0.5-0.6,1-1,1.2C9.5,6.5,9,6.4,8.4,6.2C8,6.1,7.5,5.8,7.1,5.6C5.8,5,5.5,4.9,5.1,5.4c-0.4,0.5-0.4,0.8,0.3,2C5.6,7.8,5.9,8.2,6,8.7c0.2,0.6,0.3,1.1,0.2,1.5c0,0,0,0.1,0,0.1c-0.2,0.4-0.6,0.8-1.2,1.1c-0.4,0.2-0.9,0.4-1.4,0.5C2.2,12.4,2,12.6,2,13.2c0,0.6,0.3,0.8,1.6,1.2c0.5,0.1,1,0.3,1.4,0.5c0.5,0.3,1,0.6,1.2,1c0.2,0.6,0.1,1.1,0,1.7c-0.1,0.5-0.4,0.9-0.6,1.3c-0.7,1.2-0.7,1.6-0.2,2c0.5,0.4,0.8,0.4,2-0.3c0.4-0.2,0.9-0.5,1.3-0.6C9.1,19.8,9.5,19.8,9.8,19.8z"/><path fill="currentColor" d="M13,19.2c-3.4,0-6.2-2.8-6.2-6.2S9.6,6.8,13,6.8s6.2,2.8,6.2,6.2S16.4,19.2,13,19.2z M13,8.8c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S15.3,8.8,13,8.8z"/></svg>',
		save: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28.7px" height="19.3px" viewBox="0 0 28.7 19.3"><path fill="currentColor" d="M21.2,19.3H6.4C2.8,19.3,0,16.5,0,13c0-2.9,2-5.4,4.7-6.1C5.5,2.9,9,0,13.2,0c2.3,0,4.4,0.9,6.1,2.5c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0C16.6,2.7,15,2,13.2,2C9.8,2,7,4.5,6.6,7.9c0,0.5-0.4,0.8-0.9,0.9C3.6,9.1,2,10.9,2,13c0,2.4,1.9,4.3,4.4,4.3h14.8c3.1,0,5.5-2.4,5.5-5.4c0-1.9-1.1-3.7-2.8-4.7c-0.5-0.3-0.6-0.9-0.4-1.4c0.3-0.5,0.9-0.6,1.4-0.4c2.3,1.3,3.8,3.8,3.8,6.4C28.7,16,25.4,19.3,21.2,19.3z"/><path fill="currentColor" d="M13.9,13.2L13.9,13.2c-0.3,0-0.5-0.1-0.7-0.3L9.5,9.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.9,2.9l9.3-9.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-10,10C14.4,13.1,14.1,13.2,13.9,13.2z"/></svg>',
		clone: '<svg xmlns="http://www.w3.org/2000/svg" width="36px" height="35px" viewBox="0 0 36 35"><polygon transform="rotate(45, 18, 18)" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" points="35.9,2.9 33.1,0.1 18,15.2 3.3,0.5 0.5,3.3 15.2,18 1.1,32.1 3.9,34.9 18,20.8 32.7,35.5 35.5,32.7 20.8,18"/></svg>',
		delete: '<svg xmlns="http://www.w3.org/2000/svg" width="36px" height="35px" viewBox="0 0 36 35"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" points="35.9,2.9 33.1,0.1 18,15.2 3.3,0.5 0.5,3.3 15.2,18 1.1,32.1 3.9,34.9 18,20.8 32.7,35.5 35.5,32.7 20.8,18"/></svg>',
		site: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22px" height="26px" viewBox="0 0 22 26"><path fill="currentColor" d="M21,24c-0.6,0-1-0.4-1-1V11.5L17.6,11c0,0,0,0,0,0C13.9,11,11,8.5,11,4.9V1c0-0.6,0.4-1,1-1s1,0.4,1,1v3.9c0,2.5,2,4.5,4.6,4.5L21,9.6c0.5,0,1,0.5,1,1V23C22,23.6,21.6,24,21,24z"/><path fill="currentColor" d="M16,20H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h10c0.6,0,1,0.4,1,1S16.6,20,16,20z"/><path fill="currentColor" d="M16,15H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h10c0.6,0,1,0.4,1,1S16.6,15,16,15z"/><path fill="currentColor" d="M9,10H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.6,0,1,0.4,1,1S9.6,10,9,10z"/><path fill="currentColor" d="M19,26H3c-1.7,0-3-1.3-3-3V3c0-1.7,1.3-3,3-3h9c1.7,0,10,8.3,10,10v13C22,24.7,20.7,26,19,26z M3,2C2.4,2,2,2.4,2,3v20c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1V10.1c-0.6-1.3-6.8-7.5-8.1-8.1H3z M20,10.2L20,10.2L20,10.2z M11.8,2L11.8,2L11.8,2z"/></svg>'
	}

	var ready = function () {

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Header and Context
		//
		/////////////////////////////////////////////////////////////////////////// */

		/*
		// Header Nav
		_____________________________________________ */

		/* Init - Setup mobile Nav Toggler */

		$(o.header).append('<a href="" id="btn-toggle-header-mobile">'+s.burger+'</a>');

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
				if(window.location.href.indexOf(t.attr('href')) !== -1) t.parent().addClass('active');
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

		/* Init - Remove Version */
		
		$('.actions #version').remove();

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
		// Dashboard
		_____________________________________________ */

		/* Init - Columns */

		if($('.secondary.column', o.dashboard).length){
			$(o.contentsForm).removeClass('two columns');
			$(o.dashboard).addClass('two columns');
		} 

		/*
		// Table
		_____________________________________________ */

		$(o.tableEl).each(function(){
			var t = $(this);
			var table = t.parents('table');
			if($('thead th', table).eq(t.index()).find('span').length > 0) var text = $('thead th', table).eq(t.index()).find('span').text() + ' : ';
			else var text = $('thead th', table).eq(t.index()).text() + ' : ';
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

		/*
		// Select
		_____________________________________________ */

		$('select').select2();

		$('#context .actions li select[name="panel-type"]').on('change', function(){
			setTimeout(function(){
				$(o.dashboardDrawerSelects).select2();
				$(o.dashboardDrawerSelectsArrows).html(s.chevron);
			}, 250);
		});
		$('#dashboard .panel a.panel-edit').on('click', function(){
			setTimeout(function(){
				$(o.dashboardDrawerSelects).select2();
				$(o.dashboardDrawerSelectsArrows).html(s.chevron);
			}, 250);
		});

		$(o.context).on('click', '.drawer-filtering .constructor', function(){
			setTimeout(function(){
				$('.drawer-filtering .instance:last-child select').select2();
				$('.drawer-filtering .instance:last-child .select2-container .select2-selection--single .select2-selection__arrow').html(s.chevron);
			}, 250);
		});

		/*
		// SVGs
		_____________________________________________ */

		/* Init - Add SVGs */

		$('#breadcrumbs nav p a').prepend(s.arrow);
		$(o.contextActions).each(function(){
			var t = $(this);
			var title = t.attr('title');

			if(title !== undefined){
				if(title.indexOf('Edit Section') !== -1) t.prepend(s.edit);
				else if(title.indexOf('Create') !== -1) t.prepend(s.add);
				else if(title.indexOf('View') !== -1) t.prepend(s.view);
			} else {
				if(t.hasClass('drawer')) t.prepend(s.view);
				else t.prepend(s.add);
			}

		});
		$(o.actionButtons).each(function(){
			var t = $(this);
			var title = t.attr('data-icon');

			if(title !== undefined){
				if(title.indexOf('save') !== -1) t.prepend(s.save);
				else if(title.indexOf('delete') !== -1) t.prepend(s.delete);
				else if(title.indexOf('clone') !== -1) t.prepend(s.clone);
			}
		});
		$(o.navElFirst).append(s.chevron);
		if($(o.actionButtons).length > 1) $(o.actions).append(s.chevron);
		$(o.selectArrows).html(s.chevron);

		/* ////////////////////////////////////////////////////////////////////////////
		//
		// Init
		//
		/////////////////////////////////////////////////////////////////////////// */

		/*
		// Website
		_____________________________________________ */

		changeStateDrawer();
		onScroll();

		win.on('scroll', function(){
			onScroll();
		}).on('resize', function(){
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

			if(curScroll == 0){
				$(o.contextTabs).removeClass('selected');
				if(win.width() < 1280) $(o.contextTabs + ':first-child').addClass('selected');
				else $(o.contextTabs + ':nth-child(2)').addClass('selected');
			} else if(curScroll == pageEnd){
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
