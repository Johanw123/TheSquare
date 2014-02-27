

World = function(game) {

	this.game = game;

};

var currentScreen;
var currentScreenId = [0,0];
var player;
var map;
var tileset;

World.prototype = {

    preload: function () {

        },

	create: function () {
      currentScreen = new Screen();
      player = new Player(game, 100, 100);
      game.add.existing(player);


         map = game.add.tilemap('map');
        // Add the tileset 'tiles' to the game
        tileset = game.add.tileset('tiles');

	},

	update: function() {
        currentScreen.update();
        
        
        if (game.input.mousePointer.isDown)
        {
            if(game.input.mousePointer.x > 350)
                ++player.x;
            else
                --player.x;
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
