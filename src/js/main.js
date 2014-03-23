(function(){
	'use strict';
	/* global GameCtrl */
	var game = new Phaser.Game(350, 350, Phaser.CANVAS, 'game',false,false);


		//        Add the States your game has.
		//        You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', GameCtrl.Boot);
	game.state.add('Preloader', GameCtrl.Preloader);
	game.state.add('Play', GameCtrl.Play);
	game.state.add('Over', GameCtrl.Over);

	//        Now start the Boot state.
	game.state.start('Boot');
})();

