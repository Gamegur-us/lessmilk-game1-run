var GameCtrl = {
	global:{ score: 0 }
};


(function(){
	'use strict';

	/*
	  Programming and art made by www.lessmilk.com
	  You can freely look at the code below, 
	  but you are not allowed to use the code or art to make your own games
	*/
	GameCtrl.Boot = function () { };

	GameCtrl.Boot.prototype = {
		preload: function () {
			this.stage.backgroundColor = '#34495e';
			var label = this.add.text(this.game.width/2, this.game.width/2, 'loading...', { font: '30px Arial', fill: '#fff' });
			label.anchor.setTo(0.5, 0.5);

			this.load.spritesheet('player', 'assets/images/player.png', 20, 24);
			this.load.spritesheet('enemy1', 'assets/images/enemy1.png', 32, 36);
			this.load.spritesheet('enemy2', 'assets/images/enemy2.png', 28, 40);
			this.load.audio('hit', 'assets/audio/hit.wav');

		},
		create: function () {
			this.state.start('Play');
		}
	};

})();