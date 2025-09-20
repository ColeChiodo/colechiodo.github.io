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
