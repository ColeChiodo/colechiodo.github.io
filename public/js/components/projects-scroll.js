const viewport = document.getElementById("projects-viewport");
const projects = document.getElementById("projects-section");
const dots = document.getElementById("projects-dots");

if (viewport && projects && dots) {
  let cards = [...projects.children];
  let index = 0;
  let layout = null;
  let running = false;
  let resizeHandler = null;
  let observer = null;
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  function getGap() {
    return parseFloat(getComputedStyle(projects).gap) || 16;
  }

  function wrapRel(rel) {
    const total = cards.length;
    if (!total) return rel;
    const half = Math.floor(total / 2);
    if (rel > half) rel -= total;
    if (rel <= -half) rel += total;
    return rel;
  }

  function carouselValue(c) {
    return parseInt(c.style.getPropertyValue("--carousel"), 10);
  }

  function sortByCarousel() {
    cards.sort((a, b) => (carouselValue(a) || 0) - (carouselValue(b) || 0));
    cards.forEach(c => projects.appendChild(c));
  }

  function measure() {
    cards.forEach(c => c.classList.add("project--no-anim"));
    const cardW = Math.min(...cards.map(c => c.offsetWidth));
    const activeW = cards[index].offsetWidth;
    const cardH = cards[0].offsetHeight;
    cards.forEach(c => c.classList.remove("project--no-anim"));

    const style = getComputedStyle(projects);
    const padTop = parseFloat(style.paddingTop) || 0;
    const padBottom = parseFloat(style.paddingBottom) || 0;

    layout = { cardW, activeW, cardH, padTop, padBottom };
  }

  function update(smooth = true) {
    const total = cards.length;
    if (!total) return;

    cards.forEach((c, i) => {
      const rel = wrapRel(i - index);
      c.classList.toggle("project--active", rel === 0);
      c.classList.toggle("project--before", rel === -1);
      c.classList.toggle("project--after", rel === 1);
    });

    if (!layout || !smooth) measure();

    const { cardW, activeW, cardH, padTop, padBottom } = layout;
    const gap = getGap();
    const step = cardW + gap;
    const activeLeft = (viewport.offsetWidth - activeW) / 2;

    projects.style.height = `${cardH + padTop + padBottom}px`;

    cards.forEach((c, i) => {
      const rel = wrapRel(i - index);
      const x = rel <= 0
        ? activeLeft + rel * step
        : activeLeft + activeW + gap + (rel - 1) * step;
      if (!smooth) c.classList.add("project--no-anim");
      c.style.top = `${padTop}px`;
      c.style.transform = `translateX(${x}px)`;
    });

    if (!smooth) {
      void projects.offsetWidth;
      cards.forEach(c => c.classList.remove("project--no-anim"));
    }

    dots.querySelectorAll(".projects-dot").forEach((d, i) => {
      d.classList.toggle("projects-dot--active", i === index);
    });
  }

  function buildDots() {
    dots.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "projects-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to project ${i + 1}`);
      dot.addEventListener("click", () => {
        index = i;
        update(false);
      });
      dots.appendChild(dot);
    });
  }

  projects.addEventListener("click", (e) => {
    if (!running) return;
    if (e.target.closest(".view-project")) return;
    const card = e.target.closest(".project");
    if (!card) return;
    e.preventDefault();
    const i = cards.indexOf(card);
    if (i === -1 || i === index) return;
    index = i;
    update(true);
  });

  function start() {
    running = true;
    sortByCarousel();
    buildDots();
    update(false);
    resizeHandler = () => update(false);
    window.addEventListener("resize", resizeHandler);
    observer = new MutationObserver(() => {
      cards = [...projects.children];
      sortByCarousel();
      if (index >= cards.length) index = 0;
      buildDots();
      update(false);
    });
    observer.observe(projects, { childList: true });
  }

  function stop() {
    running = false;
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
    if (observer) observer.disconnect();
    observer = null;
    dots.innerHTML = "";
    projects.style.height = "";
    cards.forEach(c => {
      c.classList.remove("project--active", "project--before", "project--after");
      c.style.top = "";
      c.style.transform = "";
    });
  }

  const onChange = (e) => {
    if (e.matches) {
      if (!running) start();
    } else if (running) {
      stop();
    }
  };
  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onChange);
  else if (desktopQuery.addListener) desktopQuery.addListener(onChange);

  if (desktopQuery.matches) start();
}
