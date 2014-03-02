// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var width = navigator.isCocoonJS ? window.innerWidth : 800;
var height = navigator.isCocoonJS ? window.innerHeight : 600;
var dips = window.devicePixelRatio;

width = width * dips;
height = height * dips;
var game = new Phaser.Game(width, height, Phaser.WEBGL, 'phaser-example');
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

        //game.load.image('tiles', 'assets/sheets/sheet.png');
       // game.load.tilemap('square', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);


        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/sheets/sheet.png');

    },

    create: function() {
        this.game.stage.backgroundColor = '#00000';

        var ratio = getRatio('all', 800, 600);

        if (navigator.isCocoonJS) {
            game.world._container.scale.x = ratio.x;
            game.world._container.scale.y = ratio.y;
            game.world._container.updateTransform();
        } else {
            game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            game.stage.scale.minWidth = 800;
            game.stage.scale.minHeight = 600;
            game.stage.scale.pageAlignHorizontally = true;
            game.stage.scale.setScreenSize(true);
        }
       
        world = new World(game);
        world.preload();
        world.create();


    },
        
    update: function() {

       world.update();
    },
    render: function()
    {
        world.render();
    }
    
};



function getRatio(type, w, h) {
    var scaleX = width / w,
        scaleY = height / h,
        result = {
            x: 1,
            y: 1
        };

    switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
    }

    return result;
}


// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', game_state.main);
game.state.start('main');
