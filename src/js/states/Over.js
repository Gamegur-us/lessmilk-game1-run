/* global GameCtrl */
(function(){
	'use strict';

	/*
	  Programming and art made by www.lessmilk.com
	  You can freely look at the code below, 
	  but you are not allowed to use the code or art to make your own games
	*/
	GameCtrl.Over = function () { };

	GameCtrl.Over.prototype = {
		create: function () {
			var w=this.game.width, h=this.game.height;
			var fontStyle={ font: '30px Arial', fill: '#fff', align: 'center' };
			var label = this.add.text(w/2, h/2, 'game over\n\nscore: '+GameCtrl.global.score+'\n\npress the UP arrow key\nto restart', fontStyle);
			label.anchor.setTo(0.5, 0.5);
			
			this.cursor = this.input.keyboard.createCursorKeys();
			this.time = this.game.time.now + 800;

			this.add.audio('hit').play('', 0, 0.1);
		},

		update: function() {
			if (this.game.time.now > this.time && this.cursor.up.isDown){
				this.state.start('Play');
			}
		}
	};
})();