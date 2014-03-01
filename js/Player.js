//  Here is a custom game object
Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'player');

    
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {


};