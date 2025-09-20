// on click, shake the screen and spawn ASCII particles
const click = new Audio("audio/click.wav");
const explosion = new Audio("audio/explosion.wav");

document.addEventListener("click", (e) => {
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

// PARTICLE CONFIGURATION
function spawnParticles(x, y) {
    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
        const span = document.createElement("span");
        span.textContent = getRandomChar();
        span.classList.add("particle");
        span.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];

        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        document.body.appendChild(span);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 40;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        span.animate(
            [
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
            ],
            {
                duration: 1000 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => span.remove(), 1600);
    }
}

function spawnAsciiBreakParticles(canvas) {
    const text = canvas.textContent;
    const rect = canvas.getBoundingClientRect();
    const numParticles = Math.min(text.length, 100);

    for (let i = 0; i < numParticles; i++) {
        const span = document.createElement("span");

        const char = text[Math.floor(Math.random() * text.length)];
        span.textContent = char;

        span.classList.add("particle");
        span.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];

        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        document.body.appendChild(span);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        span.animate(
            [
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ],
            {
                duration: 1000 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => span.remove(), 1600);
    }
}

// EASTER EGG LOGIC
const asciiCanvas = document.getElementById("ascii-canvas");
const asciiProfile = document.querySelector(".ascii-profile");

let clickCount = 0;
const triggerCount = 25;

const altAscii = [`
⠀⠀⠀⠀⠀⠀⢀⣤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡼⠋⠀⣀⠄⡂⠍⣀⣒⣒⠂⠀⠬⠤⠤⠬⠍⠉⠝⠲⣄⡀⠀⠀
⠀⠀⠀⢀⡾⠁⠀⠊⢔⠕⠈⣀⣀⡀⠈⠆⠀⠀⠀⡍⠁⠀⠁⢂⠀⠈⣷⠀⠀
⠀⠀⣠⣾⠥⠀⠀⣠⢠⣞⣿⣿⣿⣉⠳⣄⠀⠀⣀⣤⣶⣶⣶⡄⠀⠀⣘⢦⡀
⢀⡞⡍⣠⠞⢋⡛⠶⠤⣤⠴⠚⠀⠈⠙⠁⠀⠀⢹⡏⠁⠀⣀⣠⠤⢤⡕⠱⣷
⠘⡇⠇⣯⠤⢾⡙⠲⢤⣀⡀⠤⠀⢲⡖⣂⣀⠀⠀⢙⣶⣄⠈⠉⣸⡄⠠⣠⡿
⠀⠹⣜⡪⠀⠈⢷⣦⣬⣏⠉⠛⠲⣮⣧⣁⣀⣀⠶⠞⢁⣀⣨⢶⢿⣧⠉⡼⠁
⠀⠀⠈⢷⡀⠀⠀⠳⣌⡟⠻⠷⣶⣧⣀⣀⣹⣉⣉⣿⣉⣉⣇⣼⣾⣿⠀⡇⠀
⠀⠀⠀⠈⢳⡄⠀⠀⠘⠳⣄⡀⡼⠈⠉⠛⡿⠿⠿⡿⠿⣿⢿⣿⣿⡇⠀⡇⠀
⠀⠀⠀⠀⠀⠙⢦⣕⠠⣒⠌⡙⠓⠶⠤⣤⣧⣀⣸⣇⣴⣧⠾⠾⠋⠀⠀⡇⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣭⣒⠩⠖⢠⣤⠄⠀⠀⠀⠀⠀⠠⠔⠁⡰⠀⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⢤⣀⣀⠉⠉⠀⠀⠀⠀⠀⠁⠀⣠⠏⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠒⠲⠶⠤⠴⠒⠚⠁⠀⠀
`,
`
⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
`,
`
⣿⣿⣿⣿⣿⣿⡟⠁⠄⠄⠄⠄⣠⣤⣴⣶⣶⣶⣶⣤⡀⠈⠙⢿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡟⠄⠄⠄⠄⠄⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠈⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠁⠄⠄⠄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⢺⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡄⠄⠄⠄⠙⠻⠿⣿⣿⣿⣿⠿⠿⠛⠛⠻⣿⡄⠄⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡇⠄⠄⠁ 👁️ ⠄⢹⣿⡗⠄ 👁️ ⢄⡀⣾⢀⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡇⠘⠄⠄⠄⢀⡀⠄⣿⣿⣷⣤⣤⣾⣿⣿⣿⣧⢸⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡇⠄⣰⣿⡿⠟⠃⠄⣿⣿⣿⣿⣿⡛⠿⢿⣿⣷⣾⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡄⠈⠁⠄⠄⠄⠄⠻⠿⢛⣿⣿⠿⠂⠄⢹⢹⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡐⠐⠄⠄⣠⣀⣀⣚⣯⣵⣶⠆⣰⠄⠞⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣷⡄⠄⠄⠈⠛⠿⠿⠿⣻⡏⢠⣿⣎⣾⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⠟⠛⠄⠄⠄⠄⠙⣛⣿⣿⣵⣿⡿⢹⡟⣿⣿⣿⣿⣿
`,
``
];

let nextAltAscii = 0;

asciiProfile.addEventListener("click", () => {
    clickCount++;

    if (clickCount >= triggerCount) {
        if (nextAltAscii < altAscii.length) {
            asciiCanvas.textContent = altAscii[nextAltAscii];
            explosion.play();
        }
        nextAltAscii += 1;
        clickCount = 0;
    }

    spawnAsciiBreakParticles(asciiCanvas);
});

// MATRIX EFFECT
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
        [
            { opacity: span.style.opacity },
            { opacity: 0 }
        ],
        {
            duration: 3000 + Math.random() * 2000,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(() => span.remove(), 5000);
}

setInterval(() => {
    matrixEffect();
}, 200);


// WHITE SCAN LINE ANIMATION
function randomizeScan() {
    const scan = document.querySelector(".scan-line");
    const randomSpeed = Math.random() * 8 + 5;
    scan.style.setProperty("--scan-speed", `${randomSpeed}s`);
}
setInterval(randomizeScan, 5000);
randomizeScan();

// HELPERS
function getRandomChar() {
    let codePoint;

    do {
        codePoint = Math.floor(Math.random() * 0xFFFF);
    } while (
        (codePoint >= 0x0000 && codePoint <= 0x001F) ||
        (codePoint >= 0x007F && codePoint <= 0x009F)
    );

    return String.fromCharCode(codePoint);
}

const particleColors = [
    "var(--fg-default)",
    "var(--fg-muted)",
    "var(--accent-amber)",
    "var(--accent-green)",
    "var(--accent-red)"
];