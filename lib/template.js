import fs from "fs";
import path from "path";

const viewsDir = path.join(import.meta.dirname, "..", "views");
const cache = {};

function load(name) {
  if (!cache[name]) {
    cache[name] = fs.readFileSync(path.join(viewsDir, name), "utf-8");
  }
  return cache[name];
}

function render(template, vars) {
  let html = template;
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, String(value));
  }
  return html;
}

function component(name, vars) {
  return render(load(`components/${name}.html`), vars);
}

function renderPage(pageName, extra) {
  const page = render(load(`pages/${pageName}.html`), extra || {});
  return render(load("layout.html"), {
    title: extra?.title || "about:Cole",
    og_title: "colechiodo.cc",
    og_description: "Software Engineer | building games, apps, and websites",
    og_image: "https://colechiodo.cc/images/favicon.png",
    og_url: "https://colechiodo.cc",
    footer: "&gt; curl colechiodo.cc",
    effects: load("components/effects.html"),
    content: page,
    ...extra
  });
}

export { load, render, component, renderPage };
