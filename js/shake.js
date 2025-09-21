document.addEventListener("click", (e) => {
    const noShakeEl = document.getElementById("pixelBoard");

    if (noShakeEl && noShakeEl.contains(e.target)) {
        return;
    }

    const body = document.body;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const strength = 8;
    const offsetX = (dx / length) * strength;
    const offsetY = (dy / length) * strength;

    body.style.setProperty("--shake-x", `${offsetX}px`);
    body.style.setProperty("--shake-y", `${offsetY}px`);

    body.classList.add("shake-impact");
    setTimeout(() => body.classList.remove("shake-impact"), 400);

    spawnParticles(e.clientX, e.clientY);

    click.play();
});
