//  Here is a custom game object
Block = function (game, x, y, texure) {

    Phaser.Sprite.call(this, game, x, y, texture);


};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;


Block.prototype.update = function() {

    this.angle += 1;

};
