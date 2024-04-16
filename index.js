const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.75;

const background = new Sprite({
  position: {
    x: 0,
    y:0
  },
  imgSrc:'img/background.png',
  surface: 306
});

const mob = new Mob({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imgSrc:'img/SlimeSpriteSheet/stand.png',
  framesMax: 3,
  offset: {
    x:0,  
    y:-80
  },
  sprites:{
    standL: {
      imgSrc:'img/SlimeSpriteSheet/stand.png',
      framesMax: 3,
    },
    hit: {
      imgSrc:'img/SlimeSpriteSheet/hit.png',
      framesMax: 5
    },
    die: {
      imgSrc:'img/SlimeSpriteSheet/die.png',
      framesMax: 6
    }
  }
});

const player = new Fighter({
  position: {
    x: 200,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imgSrc:'img/playerSprites/standR.png',
  framesMax: 4,
  offset: {
    x:0,
    y:-75
  },
  sprites:{
    standL: {
      imgSrc:'img/playerSprites/standL.png',
      framesMax: 4,
    },
    standR: {
      imgSrc:'img/playerSprites/standR.png',
      framesMax: 4
    },
      walkL: {
        imgSrc:'img/playerSprites/walkL.png',
        framesMax: 5,
    },
    walkR: {
      imgSrc:'img/playerSprites/walkR.png',
      framesMax: 5
    },
    attack1R: {
      imgSrc:'img/playerSprites/attack1R.png',
      framesMax: 4,
    },
    attack1L: {
      imgSrc:'img/playerSprites/attack1L.png',
      framesMax: 4,
    },
    stabL: {
      imgSrc:'img/playerSprites/stabL.png',
      framesMax: 3,
    },
    stabR: {
      imgSrc:'img/playerSprites/stabL.png',
      framesMax: 3,
    },
    jumpL: {
      imgSrc:'img/playerSprites/jumpL.png',
      framesMax: 2,
    },
    jumpR: {
      imgSrc:'img/playerSprites/jumpR.png',
      framesMax: 2,
    },
    hitL: {
      imgSrc:'img/playerSprites/hitL.png',
      framesMax: 2,
    },
    hitR: {
      imgSrc:'img/playerSprites/hitR.png',
      framesMax: 2,
    }
  }
});

const keys = {
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  Space: {
    pressed: false,
  },
};


function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  if(!mob.dead){mob.update();}
  player.update();
  //player x movement
  player.velocity.x = 0;

  if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
    player.switchSprite('walkL')
    player.velocity.x = -2;
  }
   else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
    player.switchSprite('walkR')
    player.velocity.x = 2;
  }
  else{
    if(player.currentDirection === 'right'){player.switchSprite('standR');}
    else{player.switchSprite('standL');}
  }
  if (player.velocity.y !== 0 && player.currentDirection === 'right') {
    player.switchSprite('jumpR');
  }else  if (player.velocity.y !== 0 && player.currentDirection === 'left') {
    player.switchSprite('jumpL');
  }
  if (player.currentDirection === 'right' && player.position.y < background.surface) {
    player.switchSprite('jumpR');
  }
  else if (player.currentDirection === 'left' && player.position.y < background.surface) {
    player.switchSprite('jumpL');
  }
  //collision detection
  if(RectangleCollison(player, mob)){
    mob.switchSprite('hit');
    if(player.currentDirection == 'right'){
      mob.velocity.x += 2
      setTimeout(() => {
        mob.velocity.x = 0;
      }, 300);
    }
    if(player.currentDirection == 'left'){
      mob.velocity.x -= 2
      setTimeout(() => {
        mob.velocity.x = 0;
      }, 300);

    }
    setTimeout(() => {
      mob.switchSprite('standL');
    }, 300);
  
  
  }
  if(playerHitbyMob(mob, player) && player.currentDirection === 'left'){
    player.switchSprite('hitL');
  }
  else if(playerHitbyMob(mob, player) && player.currentDirection === 'right'){
    player.switchSprite('hitR');
  }

}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      player.lastKey = 'ArrowRight';
      player.currentDirection = 'right'
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      player.currentDirection = 'left'
      player.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      if(player.position.y == background.surface){player.velocity.y = -8;}
      break;
    case ' ':
      player.attack()
      break;
  }
});

window.addEventListener('keyup', (event) => {
  if(event.key == 'ArrowRight'){
    keys.ArrowRight.pressed = false;
  }
  if(event.key == 'ArrowLeft'){
    keys.ArrowLeft.pressed = false;
  }
})
animate();


