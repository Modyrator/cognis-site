const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let jumpForce = -12;

const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 30,
  height: 30,
  dy: 0,
  dx: 0,
};

const platforms = [];
const platformCount = 10;

function createPlatforms() {
  platforms.length = 0;
  for (let i = 0; i < platformCount; i++) {
    platforms.push({
      x: Math.random() * (canvas.width - 80),
      y: i * (canvas.height / platformCount),
      width: 80,
      height: 10,
    });
  }
}

createPlatforms();

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Controls
  if (keys["ArrowLeft"] || keys["a"]) player.dx = -5;
  else if (keys["ArrowRight"] || keys["d"]) player.dx = 5;
  else player.dx = 0;

  player.dy += gravity;
  player.x += player.dx;
  player.y += player.dy;

  // Wrap screen
  if (player.x > canvas.width) player.x = 0;
  if (player.x < 0) player.x = canvas.width;

  // Platform collision
  platforms.forEach((p) => {
    if (
      player.dy > 0 &&
      player.x + player.width > p.x &&
      player.x < p.x + p.width &&
      player.y + player.height > p.y &&
      player.y + player.height < p.y + p.height + 10
    ) {
      player.dy = jumpForce;
    }
  });

  // Scroll world
  if (player.y < canvas.height / 2) {
    const diff = canvas.height / 2 - player.y;
    player.y = canvas.height / 2;
    platforms.forEach((p) => {
      p.y += diff;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * (canvas.width - 80);
      }
    });
  }

  // Death
  if (player.y > canvas.height) {
    player.y = canvas.height - 100;
    player.dy = 0;
    createPlatforms();
  }

  // Draw platforms
  ctx.fillStyle = "#555";
  platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.width, p.height));

  // Draw player
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();
