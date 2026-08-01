const viewport = document.getElementById("projects-viewport");
const projects = document.getElementById("projects-section");

if (viewport && projects) {
  const cards = [...projects.children];
  const total = cards.length;
  let index = 0;

  function getStep() {
    const gap = parseFloat(getComputedStyle(projects).gap) || 16;
    return cards[0].offsetWidth + gap;
  }

  function update() {
    const step = getStep();

    cards.forEach((c, i) => {
      c.classList.toggle("project--active", i === index);
      c.classList.toggle("project--before", i < index);
      c.classList.toggle("project--after", i > index);
    });

    projects.style.transform = `translateX(${(1 - index) * step}px)`;
  }

  cards.forEach((c, i) => {
    c.addEventListener("click", (e) => {
      if (e.target.closest(".view-project")) return;
      if (i < index) {
        e.preventDefault();
        index = i;
        update();
      } else if (i > index) {
        e.preventDefault();
        index = i;
        update();
      }
    });
  });

  window.addEventListener("resize", update);

  requestAnimationFrame(update);
}
