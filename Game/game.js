const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* THINNER MAP */
const GAME_WIDTH = 360;
canvas.width = GAME_WIDTH;
canvas.height = window.innerHeight;

const gravity = 0.5;
const jumpForce = -12;

const player = {
  x: GAME_WIDTH / 2 - 15,
  y: 0,
  width: 30,
  height: 30,
  dy: 0,
  dx: 0,
};

const platforms = [];
const platformCount = 8;

/* CREATE SAFE START */
function createPlatforms() {
  platforms.length = 0;

  // Starting platform (guaranteed)
  platforms.push({
    x: GAME_WIDTH / 2 - 50,
    y: canvas.height - 80,
    width: 100,
    height: 10,
  });

  // Remaining platforms
  for (let i = 1; i < platformCount; i++) {
    platforms.push({
      x: Math.random() * (GAME_WIDTH - 80),
      y: canvas.height - 80 - i * 120,
      width: 80,
      height: 10,
    });
  }

  // Place player on starting platform
  player.y = platforms[0].y - player.height;
  player.dy = 0;
}

createPlatforms();

/* INPUT */
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movement
  if (keys["ArrowLeft"] || keys["a"]) player.dx = -4;
  else if (keys["ArrowRight"] || keys["d"]) player.dx = 4;
  else player.dx = 0;

  player.dy += gravity;
  player.x += player.dx;
  player.y += player.dy;

  // Wall bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > GAME_WIDTH)
    player.x = GAME_WIDTH - player.width;

  // Platform collision
  platforms.forEach((p) => {
    if (
      player.dy > 0 &&
      player.x + player.width > p.x &&
      player.x < p.x + p.width &&
      player.y + player.height >= p.y &&
      player.y + player.height <= p.y + p.height + 8
    ) {
      player.dy = jumpForce;
    }
  });

  // Scroll world upward
  if (player.y < canvas.height / 2) {
    const offset = canvas.height / 2 - player.y;
    player.y = canvas.height / 2;

    platforms.forEach((p) => {
      p.y += offset;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * (GAME_WIDTH - 80);
      }
    });
  }

  // Death (NO instant restart)
  if (player.y > canvas.height + 50) {
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
