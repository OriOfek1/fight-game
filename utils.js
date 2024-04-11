function RectangleCollison(rect1, rect2) {
  if (player.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
    rect1.isAttacking) {
    rect1.isAttacking = false;
    rect2.health -= 20;
    console.log("Hit");
    document.querySelector('#enemyHealth > .bar-value').style.width = rect2.health + '%';
  }

}
