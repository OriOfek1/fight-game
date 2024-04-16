function RectangleCollison(rect1, rect2) {
  if (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
    rect1.isAttacking) {
    rect1.isAttacking = false;
    rect2.health -= 5;
    console.log("Hit");
    document.querySelector('#enemyHealth > .bar-value').style.width = rect2.health + '%';
    return true
  }

}

function playerHitbyMob(rect1, rect2) {
  if (rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y + rect1.height >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.height  && !rect1.dead) {
    rect2.health -= 0.01;
    // console.log("Player is Hit");
    document.querySelector('#playerHealth > .bar-value').style.width = rect2.health + '%';
    return true
  }

}
