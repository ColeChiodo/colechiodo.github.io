const gridSize = 16;
let selectedColor = "#fb4934";
const grid = [];

// Init grid
const gridContainer = document.getElementById("pixelGrid");
for (let y = 0; y < gridSize; y++) {
const row = [];
for (let x = 0; x < gridSize; x++) {
    const cell = document.createElement("div");
    cell.className = "pixel-board__cell";
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.addEventListener("click", () => {
    cell.style.background = selectedColor;
    row[x] = selectedColor;
    });
    gridContainer.appendChild(cell);

    row.push("#1d2021");
}
grid.push(row);
}

document.querySelectorAll(".pixel-color").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedColor = btn.dataset.color;
    });
});

// Post
document.getElementById("submitBtn").addEventListener("click", async () => {
    const author = document.getElementById("authorInput").value;
    const description = document.getElementById("descInput").value;

    const payload = {
        author,
        description,
        timePosted: new Date().toISOString(),
        grid
    };

    try {
        const res = await fetch("https://colechiodo.cc/art", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Failed to submit art");

        const gridContainer = document.getElementById("pixelBoard");
        gridContainer.innerHTML = "<div class='submitted-text'>Art Successfully Submitted!</div>";
    } catch (err) {
        console.error(err);
        alert("Failed to submit art. Please try again.");
    }
});