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
