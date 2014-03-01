// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(750, 600, Phaser.AUTO, 'phaser-example');
//var game = new Phaser.Game(320, 416, Phaser.CANVAS, "content",{ preload: preload, create: create, update: update });

var world;
var map;
var tileset;

// This is an array to store the different states of our game. A state is a specific scene of a game like a menu, a game over screen, etc.
var game_state = {};

// And now we define our first and only state, I'll call it 'main'
game_state.main = function() { };
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/sprites/Player.png');
        game.load.image('block', 'assets/sprites/Block.png');
        
        
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tileset('tiles', 'assets/sheets/sheet.png', 32, 32);
        
        
        //game.load.tilemap('level1', 'assets/games/starstruck/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/sheets/sheet.png');

    },

    create: function() {
        this.game.stage.backgroundColor = '#FFFFFF';
       
        world = new World();
        world.preload();
        world.create();

    },
        
    update: function() {

       world.update();
    },
    
};






// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', game_state.main);
game.state.start('main');
