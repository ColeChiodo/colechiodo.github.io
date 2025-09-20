function randomizeScan() {
    const scan = document.querySelector(".scan-line");
    const randomSpeed = Math.random() * 8 + 5;
    scan.style.setProperty("--scan-speed", `${randomSpeed}s`);
}
setInterval(randomizeScan, 5000);
randomizeScan();
