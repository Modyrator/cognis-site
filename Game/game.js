const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* =====================
   GAME CONSTANTS
===================== */
const gravity = 0.4;
const jumpForce = -10;
const platformSpeed = 2; // Slightly faster for fun
const platformGap = 100;
const platformCount = 8;
const playerSpeed = 5;

/* =====================
   PLAYER & STATE
===================== */
const player = {
  x: canvas.width / 2 - 10,
  y: canvas.height - 100,
  width: 20,
  height: 20,
  dy: 0,
  jumping: true,
};

const keys = {}; // Track multiple key presses
let currentPlatform = null;
const platforms = [];

/* =====================
   PLATFORMS
===================== */
function createPlatforms() {
  platforms.length = 0;
  // Starting platform
  platforms.push({
    x: canvas.width / 2 - 40,
    y: canvas.height - 50,
    width: 80,
    height: 10,
    dir: 0,
  });

  for (let i = 1; i < platformCount; i++) {
    spawnPlatform(canvas.height - i * platformGap);
  }
}

function spawnPlatform(yValue) {
  platforms.push({
    x: Math.random() * (canvas.width - 60),
    y: yValue,
    width: 60,
    height: 10,
    dir: Math.random() < 0.5 ? -1 : 1,
  });
}

createPlatforms();

/* =====================
   INPUT HANDLING
===================== */
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));

/* =====================
   CORE LOGIC
===================== */
function update() {
  // 1. Horizontal Movement
  if (keys["ArrowLeft"]) player.x -= playerSpeed;
  if (keys["ArrowRight"]) player.x += playerSpeed;

  // Screen wrap (optional but common in this genre)
  if (player.x < -player.width) player.x = canvas.width;
  if (player.x > canvas.width) player.x = -player.width;

  // 2. Vertical Physics
  player.dy += gravity;
  player.y += player.dy;

  // 3. Camera scroll (Keep player in middle third)
  if (player.y < canvas.height / 3) {
    let diff = canvas.height / 3 - player.y;
    player.y = canvas.height / 3;
    platforms.forEach((p) => (p.y += diff));
  }

  // 4. Move platforms
  platforms.forEach((p) => {
    if (p.dir !== 0) {
      p.x += platformSpeed * p.dir;
      if (p.x <= 0 || p.x + p.width >= canvas.width) p.dir *= -1;
    }
  });

  // 5. Collision detection (Only when falling)
  if (player.dy > 0) {
    platforms.forEach((p) => {
      if (
        player.x + player.width > p.x &&
        player.x < p.x + p.width &&
        player.y + player.height >= p.y &&
        player.y + player.height <= p.y + p.height + player.dy // Tolerance based on velocity
      ) {
        player.dy = jumpForce; // Auto-jump like Doodle Jump
        player.jumping = false;
      }
    });
  }

  // 6. Recycle platforms
  platforms.forEach((p) => {
    if (p.y > canvas.height) {
      p.y -= platformCount * platformGap;
      p.x = Math.random() * (canvas.width - p.width);
    }
  });

  // 7. Game over
  if (player.y > canvas.height + 50) reset();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Player
  ctx.fillStyle = "#FF5733";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw Platforms
  ctx.fillStyle = "#2ECC71";
  platforms.forEach((p) => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
}

function reset() {
  player.x = canvas.width / 2 - 10;
  player.y = canvas.height - 100;
  player.dy = 0;
  createPlatforms();
}

/* =====================
   THE GAME LOOP
===================== */
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop(); // Start the engine!
