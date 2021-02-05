const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
  document.addEventListener("keydown", keyDownEvent);
  const fps = 8;
  setInterval(draw, 1000/fps);
}

const gridSize = (tileSize = 20);
let nextX = (nextY = 0);

const defTailSize = 3;
let tailSize = defTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);

let appleX = (appleY = 15);

const draw = () => {
  snakeX += nextX;
  snakeY += nextY;

  if (snakeX < 0) snakeX = gridSize - 1;
  if (snakeY < 0) snakeY = gridSize - 1;
  if (snakeX > gridSize - 1) snakeX = 0;
  if (snakeY > gridSize - 1) snakeY = 0;

  if (snakeX === appleX && snakeY === appleY) {
    ++tailSize;

    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height); 

  ctx.fillStyle = "green";
  for (let pos of snakeTrail) {
    ctx.fillRect(
      pos.x * tileSize,
      pos.y * tileSize,
      tileSize,
      tileSize
    );

    if (pos.x === snakeX && pos.y ===snakeY) tailSize = defTailSize;
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) snakeTrail.shift();
}

const keyDownEvent = (e) => {
  const kc = e.keyCode;
  if (kc === 32) {
    nextX = 0;
    nextY = 0;
  }
  if (kc === 37 || kc === 65) {
    nextX = -1;
    nextY = 0;
    return 0;
  }
  if (kc === 39 || kc === 68) {
    nextX = 1;
    nextY = 0;
    return 0;
  }
  if (kc === 40 || kc === 83) {
    nextX = 0;
    nextY = 1;
    return 0;
  }
  if (kc === 38 || kc === 87) {
    nextX = 0;
    nextY = -1;
    return 0;
  }
  return 1;
}
