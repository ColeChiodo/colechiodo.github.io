const gridSize = 16;
let selectedColor = "#fb4934";
const grid = [];

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

// Add htmx vals with grid data on submit
document.getElementById("submitBtn").addEventListener("htmx:configRequest", (e) => {
  e.detail.parameters.grid = JSON.stringify(grid);
  e.detail.parameters.author = document.getElementById("authorInput").value;
  e.detail.parameters.description = document.getElementById("descInput").value;
  e.detail.parameters.timePosted = new Date().toISOString();
});
