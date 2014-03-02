//  Here is a custom game object
Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'player');

    
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {


    this.body.acceleration.y += 5000;
    if(this.body.acceleration.y > 4000)
        this.body.acceleration.y = 4000;


};

Player.prototype.move = function(offset)
{
    this.body.x += offset;
};