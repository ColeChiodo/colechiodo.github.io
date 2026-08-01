import { component, load } from "../lib/template.js";
import { ASCII_ART } from "../data/ascii.js";
import { SOCIAL_ICONS } from "../data/social.js";
import { PROJECTS } from "../data/projects.js";
import { SKILLS } from "../data/skills.js";

export default function (app) {
  app.get("/components/projects", (req, res) => {
    res.send(PROJECTS.map(p => component("project-card", p)).join("\n"));
  });

  app.get("/components/skills", (req, res) => {
    res.send(SKILLS.map(s => component("skill-card", s)).join("\n"));
  });

  app.get("/components/bio", (req, res) => {
    res.send(component("bio", {
      ascii_art: ASCII_ART,
      name: "Cole Chiodo",
      tagline: "Software Engineer<br>SF Bay Area 🌉<br><br>&gt; building games, apps, websites, and more...",
      social_icons: SOCIAL_ICONS
    }));
  });

  app.get("/components/pixel-board", (req, res) => {
    res.send(load("components/pixel-board.html"));
  });
}
