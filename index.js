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
  imgSrc:'img/background.png'
});

const dummyplayer = new Fighter({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imgSrc:'img/playerSprites/standL.png',
  framesMax: 4,
  offset: {
    x:0,  
    y:-83
  }

});
const player = new Fighter({
  position: {
    x: 0,
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
    y:-83
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
    jumpL: {
      imgSrc:'img/playerSprites/jumpL.png',
      framesMax: 2,
    },
    jumpR: {
      imgSrc:'img/playerSprites/jumpR.png',
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
  player.update();
  // dummyplayer.update();

  //player x movement
  player.velocity.x = 0;
  

  if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
    player.switchSprite('walkL')
    player.velocity.x = -2.5;
  }
   else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
    player.switchSprite('walkR')
    player.velocity.x = 2.5;
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

  //collision detection
  RectangleCollison(player, dummyplayer);
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
      player.velocity.y = -9;
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


