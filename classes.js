class Sprite {
  constructor({position, imgSrc}) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imgSrc;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }
}

class Fighter {
  constructor({ position, velocity, color = "red" }) {
    this.height = 150;
    this.width = 50;
    this.position = position;
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
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.attackBox.position.x = this.position.x;
    this.attackBox.position.y = this.position.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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
