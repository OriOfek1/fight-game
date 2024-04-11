class Sprite {
  constructor({ position, imgSrc, scale = 1, framesMax = 1, offset = {x:0, y:0} }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.offset = offset

    
  }
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }
  update() {
    this.draw();
    this.animateFrames();
  }

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites
  }) {
    super({
      position,
      imgSrc,
      scale,
      framesMax,
      offset,
    });
    this.height = 150;
    this.width = 50;
    this.velocity = velocity;
    this.lastKey;
    this.currentDirection = "right";
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: this.width * 2,
      height: this.height / 2,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.sprites = sprites;

    for(const sprite in this.sprites){
        sprites[sprite].image = new Image();
        sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.attackBox.position.x = this.position.x;
    this.attackBox.position.y = this.position.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 120
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
    //track attack box direction
    if (this.currentDirection === "left") {
      this.attackBox.position.x = this.position.x - this.attackBox.width;
    } else if (this.currentDirection === "right") {
      this.attackBox.position.x =
        this.position.x - this.width + this.attackBox.width;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
