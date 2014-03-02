

World = function(game) {

	this.game = game;

};

var currentScreen;
var currentScreenId = [0,0];
var player;
var map;
var layer;
var cursors;
var fullscreenKey;

World.prototype = {

    preload: function () {


    },

	create: function () {


        game.input.addPointer();
        game.input.addPointer();


        map = game.add.tilemap('map', 'tiles');
        map.addTilesetImage('sheet', 'tiles');
        layer = map.createLayer('Tile Layer 2');

        map.setCollision(1, false);
        map.setTileIndexCallback(1, hitDown, this);
        map.setCollision(2, false);
        map.setTileIndexCallback(2, hitLeft, this);
        map.setCollision(3, false);
        map.setTileIndexCallback(3, hitRight, this);
        map.setCollision(4, false);
        map.setTileIndexCallback(4, hitUp, this);

        // Un-comment this on to see the collision tiles
        // layer.debug = true;

        layer.resizeWorld();


        currentScreen = new Screen(game);
        player = new Player(game, 100, 100);
        //player.body.gravity.y = 1000;
        //player.drag = 900;
        //player.body.maxVelocity.y = 50;
        game.add.existing(player);
        game.camera.follow(player);


        //game.input.onDown.add(gofull, this);
        fullscreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        cursors = game.input.keyboard.createCursorKeys();

        //if(this.game.device.desktop === false)
            //gofull();
	},

	update: function() {
        currentScreen.update();

        if (document.getElementsByTagName('body')[0].scrollTop > 1000)

        {
            game.stage.backgroundColor = '#87ff55';

            window.scrollTo(0, 0);

        }

        if ( fullscreenKey.justPressed(/*optional duration*/) )
        {
            //do stuff...
            gofull();
        }

        if (game.input.pointer1.isDown)
        {
            if(game.input.pointer1.x > 350)
                player.move(8);
            else
                player.move(-8);
        }
        if (game.input.mousePointer.isDown)
        {
            if(game.input.mousePointer.x > 350)
                player.move(8);
            else
                player.move(-8);
        }
        if (game.input.pointer2.isDown)
        {
            if(game.input.pointer2.x > 350)
                player.move(8);
            else
                player.move(-8);
        }

        if (cursors.left.isDown)
        {
            player.move(-8);
        }
        else if (cursors.right.isDown)
        {
            player.move(8);
        }

        //this.checkPlayerOutsideScreen();


        game.physics.overlap(player, layer, function(p, l) {
            // do stuff
            //p.x = 100;
            console.log('lol');

        }, null, this);

    },
    render: function(){
        game.debug.renderCameraInfo(game.camera, 420, 320);
        game.debug.renderText(game.time.fps, 100,100, 'verdana');
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
    }

};


function gofull() {

    game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL; //resize your window to see the stage resize too
    game.stage.scale.setShowAll();
    game.stage.scale.refresh();
    game.stage.scale.startFullScreen(false);
}


function hitLeft(player, tile) {

    player.body.velocity.x = -1500;
    player.body.velocity.y = 0;
}
function hitRight(player, tile) {
    player.body.velocity.x = 1500;
    player.body.velocity.y = 0;
}
function hitUp(player, tile) {
    player.body.velocity.y = -1500;
    player.body.velocity.x = 0;
}
function hitDown(player, tile) {
    player.body.velocity.y = 1500;
    player.body.velocity.x = 0;

}


