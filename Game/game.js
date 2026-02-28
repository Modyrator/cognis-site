window.addEventListener("load", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  // Set dimensions explicitly
  canvas.width = 400;
  canvas.height = 600;

  const gravity = 0.4;
  const jumpForce = -10;
  const platformSpeed = 1;
  const platformGap = 80;
  const platformCount = 10;

  const player = {
    x: canvas.width / 2 - 10,
    y: canvas.height - 100,
    width: 20,
    height: 20,
    dy: 0,
    jumping: true,
  };

  const platforms = [];

  function createPlatforms() {
    platforms.length = 0;
    // Base platform
    platforms.push({
      x: 0,
      y: canvas.height - 20,
      width: canvas.width,
      height: 20,
      dir: 0,
    });

    for (let i = 1; i < platformCount; i++) {
      platforms.push({
        x: Math.random() * (canvas.width - 60),
        y: canvas.height - i * platformGap,
        width: 60,
        height: 10,
        dir: Math.random() < 0.5 ? -1 : 1,
      });
    }
  }

  function update() {
    player.dy += gravity;
    player.y += player.dy;

    // Collision
    platforms.forEach((p) => {
      if (
        player.dy > 0 &&
        player.x + player.width > p.x &&
        player.x < p.x + p.width &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + 15
      ) {
        player.dy = jumpForce;
      }
    });

    // Wrap platforms
    platforms.forEach((p) => {
      p.x += p.dir * platformSpeed;
      if (p.x < 0 || p.x + p.width > canvas.width) p.dir *= -1;
      if (p.y > canvas.height) p.y = 0; // Simple recycle
    });

    if (player.y > canvas.height) player.y = 0; // Prevent losing for testing
  }

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FF5733"; // Player
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#d4af37"; // Platforms
    platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.width, p.height));
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  createPlatforms();
  loop();
});
