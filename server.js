import express from "express";
import cors from "cors";
import path from "path";

import pages from "./routes/pages.js";
import components from "./routes/components.js";
import art from "./routes/art.js";

const app = express();
const PORT = 9050;
const __dirname = import.meta.dirname;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

pages(app);
components(app);
art(app);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
