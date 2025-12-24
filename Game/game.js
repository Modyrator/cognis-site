const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* =====================
   GAME CONSTANTS
===================== */
const gravity = 0.4;
const jumpForce = -10;
const platformSpeed = 1;
const platformGap = 80;
const platformCount = 7;

/* =====================
   PLAYER
===================== */
const player = {
  x: canvas.width / 2 - 10,
  y: canvas.height - 60,
  width: 20,
  height: 20,
  dy: 0,
  jumping: true,
};

let currentPlatform = null;
let cameraY = 0;

/* =====================
   PLATFORMS
===================== */
const platforms = [];

function createPlatforms() {
  platforms.length = 0;

  // Starting platform (safe)
  platforms.push({
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    width: 60,
    height: 10,
    dir: 0,
  });

  for (let i = 1; i < platformCount; i++) {
    platforms.push({
      x: Math.random() * (canvas.width - 60),
      y: canvas.height - i * platformGap - 30,
      width: 60,
      height: 10,
      dir: Math.random() < 0.5 ? -1 : 1,
    });
  }
}

createPlatforms();

/* =====================
   INPUT
===================== */
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.dy = jumpForce;
    player.jumping = true;
    currentPlatform = null;
  }
});

/* =====================
   UPDATE
===================== */
function update() {
  player.dy += gravity;
  player.y += player.dy;

  // Camera scroll
  if (player.y < canvas.height / 3) {
    const diff = canvas.height / 3 - player.y;
    player.y = canvas.height / 3;
    cameraY += diff;
    platforms.forEach((p) => (p.y += diff));
  }

  // Move platforms
  platforms.forEach((p) => {
    if (p.dir !== 0) {
      p.x += platformSpeed * p.dir;
      if (p.x <= 0 || p.x + p.width >= canvas.width) {
        p.dir *= -1;
      }
    }
  });

  // Stick to platform
  if (!player.jumping && currentPlatform) {
    player.x += platformSpeed * currentPlatform.dir;
  }

  // Collision detection
  platforms.forEach((p) => {
    if (
      player.dy > 0 &&
      player.x + player.width > p.x &&
      player.x < p.x + p.width &&
      player.y + player.height >= p.y &&
      player.y + player.height <= p.y + p.height + 8
    ) {
      player.dy = 0;
      player.y = p.y - player.height;
      player.jumping = false;
      currentPlatform = p;
    }
  });

  // Recycle platforms
  platforms.forEach((p) => {
    if (p.y > canvas.height + 20) {
      p.y = -platformGap;
      p.x = Math.random() * (canvas.width - p.width);
      p.dir = Math.random() < 0.5 ? -1 : 1;

      if (currentPlatform === p) currentPlatform = null;
    }
  });

  // Game over
  if (player.y > canvas.height + 100) {
    reset();
  }
}

/* =====================
   RESET
===================== */
function reset() {
  player.x = canvas.width / 2 - 10;
  player.y = canvas.height - 60;
  player.dy = 0;
  player.jumping = true;
  cameraY = 0;
  currentPlatform = null;
  createPlatforms();
}
