<?php
	Class extension_snake extends Extension
	{
		/**
		* Set the delegates
		*/
		public function getSubscribedDelegates()
		{
			return array(
				array(
					'page' => '/backend/',
					'delegate' => 'InitaliseAdminPageHead',
					'callback' => 'addScriptToHead'
				)
			);
		}
		
		/**
		 * Add script to the <head>-section of the admin area
		 */
		public function addScriptToHead($context)
		{
			// Custom
			Administration::instance()->Page->addScriptToHead(URL.'/extensions/snake/assets/custom.js');
			Administration::instance()->Page->addStylesheetToHead(URL.'/extensions/snake/assets/custom.css');

			// CDN
			Administration::instance()->Page->addScriptToHead('https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js');
			
			Administration::instance()->Page->addScriptToHead('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js');
			Administration::instance()->Page->addStylesheetToHead('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css');

			Administration::instance()->Page->addScriptToHead('https://cdnjs.cloudflare.com/ajax/libs/jquery.nanoscroller/0.8.7/javascripts/jquery.nanoscroller.min.js');
			Administration::instance()->Page->addStylesheetToHead('https://cdnjs.cloudflare.com/ajax/libs/jquery.nanoscroller/0.8.7/css/nanoscroller.min.css');
		}
	}
?>
