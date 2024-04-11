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
  y: 0
},
velocity:{
  x: 0,
  y: 0
},
color: 'blue'
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
  dummyplayer.update();

  //player x movement
  player.velocity.x = 0;
  if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
    player.velocity.x = -7;
  }
   else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
    player.velocity.x = 7;
  }

  //collision detection
  RectangleCollison();
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
      player.velocity.y = -20;
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

function RectangleCollison() {
  if (player.attackBox.position.x + player.attackBox.width >= dummyplayer.position.x &&
    player.attackBox.position.x <= dummyplayer.position.x + dummyplayer.width &&
    player.attackBox.position.y + player.attackBox.height >= dummyplayer.position.y &&
    player.attackBox.position.y <= dummyplayer.position.y + dummyplayer.height &&
    player.isAttacking) {
    player.isAttacking = false;
    dummyplayer.health -= 20;
    console.log("Hit");
    document.querySelector('#enemyHealth > .bar-value').style.width = dummyplayer.health + '%';
  }

}
