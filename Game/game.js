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

/* CAMERA */
const camera = {
  offsetY: 0,
  threshold: canvas.height * 0.35,
};

/* PLATFORMS */
const platforms = [];
const platformCount = 7;
const platformGap = 140;
const platformSpeed = 2;

/* INIT */
function initPlatforms() {
  platforms.length = 0;

  for (let i = 0; i < platformCount; i++) {
    platforms.push({
      x: Math.random() * (canvas.width - 100),
      y: canvas.height - i * platformGap,
      width: 100,
      height: 10,
      dir: Math.random() < 0.5 ? -1 : 1,
    });
  }

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

/* LOOP */
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* PLAYER PHYSICS */
  player.dy += gravity;
  player.y += player.dy;

  /* CAMERA SCROLL */
  if (player.y < camera.threshold) {
    const delta = camera.threshold - player.y;
    player.y = camera.threshold;

    platforms.forEach((p) => {
      p.y += delta;
    });
  }

  /* PLATFORM MOVEMENT */
  platforms.forEach((p) => {
    p.x += platformSpeed * p.dir;
    if (p.x <= 0 || p.x + p.width >= canvas.width) {
      p.dir *= -1;
    }
  });

  /* COLLISION */
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

  /* RECYCLE PLATFORMS */
  platforms.forEach((p) => {
    if (p.y > canvas.height + 20) {
      p.y = -platformGap;
      p.x = Math.random() * (canvas.width - p.width);
      p.dir = Math.random() < 0.5 ? -1 : 1;
    }
  });

  /* DEATH */
  if (player.y > canvas.height + 80) {
    initPlatforms();
  }

  /* DRAW PLATFORMS */
  ctx.fillStyle = "#555";
  platforms.forEach((p) => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  /* DRAW PLAYER */
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();
