class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    this.load.image('bg', './assets/bg.png');
      // load audio
	  this.load.audio('sfx_select', './assets/blip_select12.wav');
	  this.load.audio('sfx_explosion', './assets/explosion.wav');
    this.load.audio('sfx_book', './assets/book.wav');
	  this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }
  
  create() {
  	// menu display
    
    let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
    }
    this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
    //show menu text
    let centerX = game.config.width/2;
    let centerY = game.config.height/2;
    let textSpacer = 64;
    this.add.text(centerX, centerY-textSpacer, 'WHISTLEBLOWER', menuConfig).setOrigin(0.5);
    menuConfig.color = '#843605';
    this.add.text(centerX, centerY, '\n\n\nL and R arrows to move, F to pursue',menuConfig).setOrigin(0.5);
    //menuConfig.backgroundColor = '#00FF00';
    
    this.add.text(centerX, centerY + textSpacer, '\nL for Easy or R for Hard', menuConfig).setOrigin(0.5);

    // define keys
	keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //change scenes
	//this.scene.start("playScene");
  }

	update() {
	  if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
	    // easy mode
	    game.settings = {
	      spaceshipSpeed: 6,
        policeSpeed: 7,
	      gameTimer: 120000    
	    }
	    this.sound.play('sfx_select');
	    this.scene.start("playScene");    
	  }
	  if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
	    // hard mode
	    game.settings = {
	      spaceshipSpeed: 8,
        policeSpeed: 8,
	      gameTimer: 60000    
	    }
	    this.sound.play('sfx_select');
      //this.sound.play('sfx_soundtrack');
	    this.scene.start("playScene");    
	  }
	}

}