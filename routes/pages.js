import { component, renderPage, load, render } from "../lib/template.js";
import { ASCII_ART } from "../data/ascii.js";
import { SOCIAL_ICONS } from "../data/social.js";
import { PROJECTS } from "../data/projects.js";
import { SKILLS } from "../data/skills.js";

function stripHtml(s) {
  return s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "");
}

function renderSkills() {
  return SKILLS.map(s => component("skill-card", s)).join("\n");
}

function isCurl(req) {
  return (req.get("User-Agent") || "").toLowerCase().includes("curl");
}

export default function (app) {
  app.get("/", (req, res) => {
    if (isCurl(req)) {
      const host = req.get("host");
      const body = render(load("curl/home.txt"), { host });
      return res.type("text/plain").send(body);
    }

    const projectsHtml = PROJECTS.map(p => component("project-card", p)).join("\n");

    const html = renderPage("home", {
      bio: component("bio", {
        ascii_art: ASCII_ART,
        name: "Cole Chiodo",
        tagline: "Software Engineer<br>SF Bay Area 🌉<br><br>&gt; building games, apps, websites, and more...",
        social_icons: SOCIAL_ICONS
      }),
      projects: projectsHtml,
      show_more: "",
      skills: renderSkills(),
      pixel_board: component("pixel-board", {})
    });
    res.send(html);
  });

  app.get("/projects", (req, res) => {
    if (!isCurl(req)) return res.redirect("/");

    const host = req.get("host");
    const items = PROJECTS.map((p, i) =>
      `  \u001b[1;33m[${i + 1}]\u001b[0m ${p.title}`
    ).join("\n");

    const body = render(load("curl/projects-list.txt"), { host, projects: items });
    res.type("text/plain").send(body);
  });

  app.get("/projects/:id", (req, res) => {
    if (!isCurl(req)) return res.redirect("/");

    const host = req.get("host");
    const id = parseInt(req.params.id, 10);
    const p = PROJECTS[id - 1];
    if (!p) {
      const body = render(load("curl/not-found.txt"), { id: req.params.id });
      return res.type("text/plain").send(body);
    }

    const tech = [...p.tech_icons.matchAll(/alt="([^"]*)"/g)]
      .map(m => m[1])
      .filter(Boolean)
      .join(", ");

    const body = render(load("curl/project-detail.txt"), {
      host,
      title: p.title,
      description: stripHtml(p.description),
      tech,
      url: p.url
    });
    res.type("text/plain").send(body);
  });

  app.get("/gallery", (req, res) => {
    const html = renderPage("gallery", { title: "open:art.gallery" });
    res.send(html);
  });
}
