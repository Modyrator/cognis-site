const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* GAME SIZE */
canvas.width = 360;
canvas.height = window.innerHeight;

/* PLAYER */
const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 120,
  width: 30,
  height: 30,
  dy: 0,
  jumping: false,
};

const gravity = 0.6;
const jumpForce = -14;

/* PLATFORMS */
const platforms = [];
const platformCount = 6;
const platformSpeed = 2;

/* CREATE PLATFORMS */
function initPlatforms() {
  platforms.length = 0;

  for (let i = 0; i < platformCount; i++) {
    platforms.push({
      x: Math.random() * (canvas.width - 100),
      y: canvas.height - 60 - i * 140,
      width: 100,
      height: 10,
      dir: Math.random() < 0.5 ? -1 : 1,
    });
  }

  // Safe start: put player on first platform
  player.y = platforms[0].y - player.height;
  player.dy = 0;
  player.jumping = false;
}

initPlatforms();

/* INPUT */
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.dy = jumpForce;
    player.jumping = true;
  }
});

/* GAME LOOP */
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Player physics */
  player.dy += gravity;
  player.y += player.dy;

  /* Platform movement */
  platforms.forEach((p) => {
    p.x += platformSpeed * p.dir;
    if (p.x <= 0 || p.x + p.width >= canvas.width) {
      p.dir *= -1;
    }
  });

  /* Collision */
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
    }
  });

  /* Death */
  if (player.y > canvas.height + 50) {
    initPlatforms();
  }

  /* Draw platforms */
  ctx.fillStyle = "#555";
  platforms.forEach((p) => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  /* Draw player */
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();
