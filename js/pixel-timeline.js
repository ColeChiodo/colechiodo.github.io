const gridSize = 16;

async function fetchArt() {
const res = await fetch("http://localhost:9050/art");
const data = await res.json();
const timeline = document.getElementById("timeline");
timeline.innerHTML = "";
data.forEach(d => {
    const entry = document.createElement("div");
    entry.className = "entry";
    const boardDiv = document.createElement("div");
    boardDiv.style.display = "grid";
    boardDiv.style.gridTemplateColumns = `repeat(${gridSize},20px)`;
    boardDiv.style.gridTemplateRows = `repeat(${gridSize},20px)`;
    boardDiv.style.gap = "1px";
    d.grid.forEach(row => row.forEach(color => {
    const cell = document.createElement("div");
    cell.style.width = "20px";
    cell.style.height = "20px";
    cell.style.background = color;
    boardDiv.appendChild(cell);
    }));
    entry.appendChild(boardDiv);
    entry.innerHTML += `<div><strong>${d.author}</strong>: ${d.description}</div>`;
    timeline.appendChild(entry);
});
}

fetchArt();