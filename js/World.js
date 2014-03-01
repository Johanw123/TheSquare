

World = function(game) {

	this.game = game;

};

var currentScreen;
var currentScreenId = [0,0];
var player;
var map;
var tileset;
var layer;

World.prototype = {

    preload: function () {

        },

	create: function () {
      currentScreen = new Screen();
      player = new Player(game, 100, 100);
      player.body.gravity.y = 5;
      game.add.existing(player);
      game.camera.follow(player);
        
        //map = game.load.tilemap('map');
        // Add the tileset 'tiles' to the game
        //tileset = game.load.tileset('tiles');
        
         
        map = game.add.tilemap('map');
		map.addTilesetImage('tiles');
		//map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
		layer = map.createLayer('Tile Layer 1');
		//layer.resizeWorld();
        
        /*
       map = game.add.tilemap('map');
        tileset = game.add.tileset('tiles');
        tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
        
        
        layer = game.add.tilemapLayer(0, 0, 240, 128, tileset, map, 0);
         layer.resizeWorld();
         */
	},

	update: function() {
        currentScreen.update();
        
        
        if (game.input.mousePointer.isDown)
        {
            if(game.input.mousePointer.x > 350)
                player.x += 5;
            else
                player.x -= 5;
        }
        
        this.checkPlayerOutsideScreen();
        
    },

    changeScreen: function(offX, offY){
        currentScreenId[0] += offX;
        currentScreenId[1] += offY;
        
        
        
    },
    
    
    
    checkPlayerOutsideScreen: function(){
        
        if(player.x > 800)
        {
            this.changeScreen(1,0);
            player.x = 0;
        }
        else if(player.x < 0)
        {
            this.changeScreen(-1,0);
            player.x = 800;
        }
        else if(player.y > 640)
        {
            this.changeScreen(0,1);
            player.y = 0;
        }
        else if(player.y < 0)
        {
            this.changeScreen(0,-1);
            player.y = 640;
        }
    },

};
