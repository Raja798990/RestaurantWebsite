import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "assets")));

// Main page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

