class Sprite {
  constructor({ height,width, position, imgSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}, surface = 0}) {
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
    this.surface = surface
    this.dead = false

    
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
      width: this.width,
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
      this.position.y = 306;
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
    if(this.currentDirection === 'left'){
      this.switchSprite('attack1L')
    }
    if(this.currentDirection === 'right'){
      this.switchSprite('attack1R');
    }

    this.isAttacking = true;
  }
  switchSprite(sprite) {
     // overriding all other animations with the attack animation
      if ( 
        this.image === this.sprites.attack1R.image &&
        this.framesCurrent < this.sprites.attack1R.framesMax - 1
      )
        return
     
      if (
        this.image === this.sprites.attack1L.image &&
        this.framesCurrent < this.sprites.attack1L.framesMax - 1
      )
        return
     
     

    switch (sprite) {
      case 'standL':
        if (this.image !== this.sprites.standL.image) {
          this.image = this.sprites.standL.image
          this.framesHold = 80
          this.framesMax = this.sprites.standL.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'standR':
        if (this.image !== this.sprites.standR.image) {
          this.image = this.sprites.standR.image
          this.framesHold = 80
          this.framesMax = this.sprites.standR.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'walkL':
        if (this.image !== this.sprites.walkL.image) {
          this.image = this.sprites.walkL.image
          this.framesHold = 7 
          this.framesMax = this.sprites.walkL.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'walkR':
        if (this.image !== this.sprites.walkR.image) {
          this.image = this.sprites.walkR.image
          this.framesHold = 7 
          this.framesMax = this.sprites.walkR.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'jumpL':
        if (this.image !== this.sprites.jumpL.image) {
          this.image = this.sprites.jumpL.image
          this.framesMax = this.sprites.jumpL.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'jumpR':
        if (this.image !== this.sprites.jumpR.image) {
          this.image = this.sprites.jumpR.image
          this.framesMax = this.sprites.jumpR.framesMax
          this.framesCurrent = 0
        }
        break
        
      case 'attack1L':
        if (this.image !== this.sprites.attack1L.image) {
          this.image = this.sprites.attack1L.image
          this.framesHold = 15
          this.framesMax = this.sprites.attack1L.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'attack1R':
        if (this.image !== this.sprites.attack1R.image) {
          this.image = this.sprites.attack1R.image
          this.framesHold = 15
          this.framesMax = this.sprites.attack1R.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'hitL':
        if (this.image !== this.sprites.hitL.image) {
          this.image = this.sprites.hitL.image
          this.framesHold = 15
          this.framesMax = this.sprites.hitL.framesMax
          this.framesCurrent = 0
        }
        break;
        case 'hitR':
        if (this.image !== this.sprites.hitR.image) {
          this.image = this.sprites.hitR.image
          this.framesHold = 15
          this.framesMax = this.sprites.hitR.framesMax
          this.framesCurrent = 0
        }
        break;
    }
  }
  
}
class Mob extends Sprite {
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
    this.currentDirection = "right";
    
    this.color = color;
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

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 120
    ) {
      this.velocity.y = 0;
      this.position.y = 306;
    } else {
      this.velocity.y += gravity;
    }
  }


  switchSprite(sprite) {
    if (this.health <= 0){
      console.log("die")
      this.framesMax = this.sprites.die.framesMax
      this.framesHold = 5;
      this.image = this.sprites.die.image
      setTimeout(() => {
        this.dead = true;
      }, 300);
      
      return
    }
    
    switch (sprite) {
      
      case 'standL':
        if (this.image !== this.sprites.standL.image) {
          this.image = this.sprites.standL.image
          this.framesHold = 30
          this.framesMax = this.sprites.standL.framesMax
          this.framesCurrent = 0
        }
        break;

        case 'hit':
        if (this.image !== this.sprites.hit.image) {
          this.image = this.sprites.hit.image
          this.framesHold = 5
          this.framesMax = this.sprites.hit.framesMax
          this.framesCurrent = 0
        }
        break;
    }
  }
  
}

