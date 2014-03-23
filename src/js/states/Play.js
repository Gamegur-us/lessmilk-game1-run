/* global GameCtrl */
(function(){
	'use strict';

	/*
	  Programming and art made by www.lessmilk.com
	  You can freely look at the code below, 
	  but you are not allowed to use the code or art to make your own games
	*/
	GameCtrl.Play = function () {
			//        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
	/*
		this.game;                //        a reference to the currently running game
		this.add;                //        used to add sprites, text, groups, etc
		this.camera;        //        a reference to the game camera
		this.cache;                //        the game cache
		this.input;                //        the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
		this.load;                //        for preloading assets
		this.math;                //        lots of useful common math operations
		this.sound;                //        the sound manager - add a sound, play one, set-up markers, etc
		this.stage;                //        the game stage
		this.time;                //        the clock
		this.tweens;        //        the tween manager
		this.world;                //        the game world
		this.particles;        //        the particle manager
		this.physics;        //        the physics manager
		this.rnd;                //        the repeatable random number generator
	*/
		//        You can use any of these from any function within this State.
		//        But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	};
	
	GameCtrl.Play.prototype = {
		create: function () {
			var w=this.game.width, h=this.game.height;
			this.cursor = this.input.keyboard.createCursorKeys();

			this.player = this.add.sprite(w/2, h/2, 'player');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.animations.add('bottom', [0, 1], 10, true);
			this.player.animations.add('top', [4, 5], 10, true);
			this.player.animations.add('right', [2, 3], 10, true);
			this.player.animations.add('left', [6, 7], 10, true);

			this.enemies = this.add.group();
			this.enemies.enableBody = true;
			this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
			
			this.enemies.setAll('outOfBoundsKill', true);

			
			this.labelScore = this.add.text(15, 10, 'score: 0', { font: '20px Arial', fill: '#fff' });
			this.labelKeys = this.add.text(Math.floor(w/2)+1, h-50, 'use the arrow keys to move', { font: '20px Arial', fill: '#fff' });
			this.labelKeys.anchor.setTo(0.5, 1);

			this.hit_s = this.add.audio('hit');
			this.enemyTime = 0;
			this.scoreTime = 0;
			GameCtrl.global.score = 0;
			this.firstKey = false;
		},

		update: function() {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;

			if (this.cursor.up.isDown && !this.firstKey) {
				this.firstKey = true;
				this.add.tween(this.labelKeys).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None,true).start();
			}

			if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -300;
				this.player.animations.play('left');
			}else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 300;
				this.player.animations.play('right');
			}else if (this.cursor.up.isDown) {
				this.player.body.velocity.y = -300;
				this.player.animations.play('top');
			}else if (this.cursor.down.isDown) {
				this.player.body.velocity.y = 300;
				this.player.animations.play('bottom');
			}else{
				this.player.animations.stop();
			}

			// Why dont use phaser timer???
			if (this.game.time.now > this.enemyTime) {
				this.newEnemy();
			}

			// Why dont use phaser timer???
			if (this.game.time.now > this.scoreTime) {
				this.scoreTime = this.time.now + 1000;
				GameCtrl.global.score += 1;
				this.labelScore.setText('score: ' + GameCtrl.global.score);
			}

			var playerHit=function(){
				this.state.start('Over');
			};

			this.physics.arcade.overlap(this.player, this.enemies, playerHit, null, this);
		},
		getEnemyRndDirection:function(enemy){
			var w=this.game.width, h=this.game.height,x,y,tox,toy;

			x=this.rnd.integerInRange(0,w);
			y=this.rnd.integerInRange(0,h);
			tox=this.rnd.integerInRange(0,w);
			toy=this.rnd.integerInRange(0,h);


			var directions=[
				//DOWN
				function(){
					y = -enemy.body.halfHeight+2;
					toy = h + enemy.height+10;
				},
				//UP
				function(){
					y = h + enemy.body.halfHeight-2;
					toy = -enemy.height-10;
				},
				//RIGHT
				function(){
					x = -enemy.body.halfWidth+2;
					tox = w + enemy.width+10;
				},
				//LEFT
				function(){
					x = w + enemy.body.halfWidth-2;
					tox = -enemy.width-10;
				}
			];

			this.rnd.pick(directions)();

			return {'x':x,'y':y,'tox':tox,'toy':toy};

		},
		newEnemy: function() {
			this.enemyTime = this.time.now + 500;

			var noEnemy=this.rnd.integerInRange(0,4)===4;
			if(noEnemy){
				return;
			}

			
			var enemyClass=this.rnd.pick(['enemy1','enemy2','enemy2']);
			var enemy=this.add.sprite(0, 0, enemyClass);
			this.enemies.add(enemy);

			var direction=this.getEnemyRndDirection(enemy);
			
			var x=direction.x,y=direction.y,tox=direction.tox,toy=direction.toy;
			
			enemy.reset(x,y);
			
			enemy.anchor.setTo(0.5, 0.5);
		
			enemy.body.rotation = 90 + Math.atan2(y - toy, x - tox) * 180 / Math.PI;
			enemy.body.offset.x=enemy.body.halfWidth;
			enemy.body.offset.y=enemy.body.halfHeight;

			enemy.events.onKilled.add(function(e){
				this.enemies.remove(e);
			}, this);

			//debugger;
			var moveTween=this.add.tween(enemy.body);
			moveTween.to( { x: tox, y: toy }, 3000, Phaser.Easing.Linear.None).start();
			enemy.animations.add('move');
			enemy.animations.play('move', 5, true);
		},
		render: function(){
			/*
			//  DEBUG STUFF
				this.game.debug.body(this.player);
				this.enemies.forEach(function (e) {
					this.game.debug.body(e);
				}, this);			
			*/
		},
	};

}());