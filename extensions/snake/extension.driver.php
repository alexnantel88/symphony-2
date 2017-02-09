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
			Administration::instance()->Page->addScriptToHead('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js');
			Administration::instance()->Page->addStylesheetToHead('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css');
		}
	}
?>
