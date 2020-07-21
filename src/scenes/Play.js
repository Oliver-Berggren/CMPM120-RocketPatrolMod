class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  
  preload() {
  this.load.audio('sfx_soundtrack', './assets/451.wav');
  // load images/tile sprites
  this.load.image('rocket', './assets/rocket.png');
  this.load.image('spaceship', './assets/witness.png');
  this.load.image('police', './assets/police.png');
  this.load.image('starfield', './assets/skullfield.png');
  this.load.image('whistleblower', './assets/whistleblower.png');
  // load spritesheet
  this.load.spritesheet('explosion', './assets/shuteye.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }

  create() {
    //this.sound.stop('sfx_soundtrack');
    this.sound.play('sfx_soundtrack');
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
  	this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
  	this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
  	this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
  	// green UI background
  	this.add.rectangle(37, 42, 566, 64, 0x000000).setOrigin(0, 0);
  	// add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 0).setOrigin(0,0);
   	this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 0).setOrigin(0,0);
    this.ship03 = new Police(this, game.config.width, 260, 'police', 0, 0).setOrigin(0,0);
    this.ship04 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 0).setOrigin(0,0);
    //this.ship05 = new Police(this, game.config.width, 20, 'police', 0, 220).setOrigin(0,0);
    this.ship06 = new Whistleblower(this, game.config.width, 180, 'whistleblower', 0, 100).setOrigin(0,0);

    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // animation config
  	this.anims.create({
  	    key: 'explode',
  	    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
  	    frameRate: 30
  	});

    let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
    }
    //show menu text
    let centerX = game.config.width/2;
    let centerY = game.config.height/2;
    let textSpacer = 64;
    this.intro = this.add.text(centerX, centerY-textSpacer, '\n\n\n\nYou must let the world know.\n\nRemember, they are watching us.\n\nI am in the crowd, whistleblower.', menuConfig).setOrigin(0.5);

    //this.time.events.add(3000, this.intro.kill, this);

  	// score
  	this.p1Score = 0;
          // score display
          let scoreConfig = {
              fontFamily: 'Courier',
              fontSize: '28px',
              backgroundColor: '#F3B141',
              color: '#843605',
              align: 'right',
              padding: {
                  top: 5,
                  bottom: 5,
              },
              fixedWidth: 100
          }
          this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
  		
  		// game over flag
  		this.gameOver = false;

  		// 60-second play clock
  		scoreConfig.fixedWidth = 0;
  		this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
  	    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
  	    this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
  	    this.gameOver = true;
  		}, null, this);
  }

    update() {
        // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
        //this.sound.pause('sfx_soundtrack');
        this.scene.restart(this.p1Score);
    }
    this.starfield.tilePositionX -= 4;
    if (!this.gameOver) {               
	    this.p1Rocket.update();         // update rocket sprite
	    this.ship01.update();           // update spaceships (x3)
	    this.ship02.update();
	    this.ship03.update();
      this.ship04.update();
      //this.ship05.update();
      this.ship06.update();
	  }
        // check collisions
      if(this.policeCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.policeExplode(this.ship03);   
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
      }
       if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
      }
      //if (this.policeCollision(this.p1Rocket, this.ship05)) {
            //this.p1Rocket.reset();
           //this.shipExplode(this.ship05);
      //}
      if (this.whistleblowerCollision(this.p1Rocket, this.ship06)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship06);
      }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
  }

	checkCollision(rocket, ship) {
	    // simple AABB checking
	    if (rocket.x < ship.x + ship.width && 
	        rocket.x + rocket.width > ship.x && 
	        rocket.y < ship.y + ship.height &&
	        rocket.height + rocket.y > ship. y) {
        this.sound.play('sfx_explosion');
	            return true;
	    } else {
	        return false;
	    }
	}

  policeCollision(rocket, police) {
      // simple AABB checking
      if (rocket.x < police.x + police.width && 
          rocket.x + rocket.width > police.x && 
          rocket.y < police.y + police.height &&
          rocket.height + rocket.y > police.y) {
        this.sound.play('sfx_explosion');
              return true;
      } else {
          return false;
      }
  }

  whistleblowerCollision(rocket, whistleblower) {
      // simple AABB checking
      if (rocket.x < whistleblower.x + whistleblower.width && 
          rocket.x + rocket.width > whistleblower.x && 
          rocket.y < whistleblower.y + whistleblower.height &&
          rocket.height + rocket.y > whistleblower.y) {
        this.sound.play('sfx_book');
        return true;
      } else {
          return false;
      }
  }
    
    shipExplode(ship) {
        ship.alpha = 0; // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;       
    }

    policeExplode(police) {
        police.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(police.x, police.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            police.reset();                       // reset ship position
            police.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += police.points;
        this.scoreLeft.text = this.p1Score;       
    }

    whistleblowerExplode(police) {
        whistleblower.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(whistleblower.x, whistleblower.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            whistleblower.reset();                       // reset ship position
            whistleblower.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += whistleblower.points;
        this.scoreLeft.text = this.p1Score;       
    }

}