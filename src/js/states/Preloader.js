
/* global GameCtrl */


(function(){
	'use strict';


	/*
	  Programming and art made by www.lessmilk.com
	  You can freely look at the code below, 
	  but you are not allowed to use the code or art to make your own games
	*/
	GameCtrl.Preloader = function () {
		this.background = null;
		this.preloadBar = null;

		this.ready = false;

	};

	GameCtrl.Preloader.prototype = {

		preload: function () {

			//	These are the assets we loaded in Boot.js
			//	A nice sparkly background and a loading progress bar		
			this.background = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBackground');
			this.preloadBar = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBar');


			this.load.setPreloadSprite(this.preloadBar);

		},

		create: function () {

			//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
			this.preloadBar.cropEnabled = false;

		}

	};

})();