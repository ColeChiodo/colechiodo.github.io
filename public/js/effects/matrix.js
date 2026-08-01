const matrixOverlay = document.getElementById("matrix-overlay");

function randomUnicodeChar() {
    let codePoint;
    do {
        codePoint = Math.floor(Math.random() * 0xFFFF);
    } while (
        (codePoint >= 0x0000 && codePoint <= 0x001F) ||
        (codePoint >= 0x007F && codePoint <= 0x009F)
    );
    return String.fromCharCode(codePoint);
}

function matrixEffect() {
    const overlayRect = matrixOverlay.getBoundingClientRect();
    
    const span = document.createElement("span");
    span.textContent = randomUnicodeChar();
    span.style.position = "absolute";
    span.style.left = `${Math.random() * overlayRect.width}px`;
    span.style.top = `${Math.random() * overlayRect.height}px`;
    span.style.opacity = 0.1 + Math.random() * 0.005;
    span.style.fontSize = `${12 + Math.random() * 14}px`;
    span.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];

    matrixOverlay.appendChild(span);

    span.animate(
        [{ opacity: span.style.opacity }, { opacity: 0 }],
        {
            duration: 3000 + Math.random() * 2000,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(() => span.remove(), 5000);
}

setInterval(matrixEffect, 200);
