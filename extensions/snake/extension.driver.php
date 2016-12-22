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
			Administration::instance()->Page->addScriptToHead(URL.'/extensions/snake/assets/custom.js');
			Administration::instance()->Page->addStylesheetToHead(URL.'/extensions/snake/assets/custom.css');
		}
	}
?>
