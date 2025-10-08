import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// === Serve static folders ===
// This line serves all CSS, JS, images from /assets
app.use("/assets", express.static(path.join(__dirname, "assets")));
// This line allows serving static HTML files from /views directly
app.use(express.static(path.join(__dirname, "views")));

// === Routes ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// === API routes ===
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: "All fields required" });

  console.log("✅ Registered:", { name, email });
  res.json({ success: true, message: "Account created successfully!" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@nabucco.com" && password === "1234") {
    return res.json({ success: true, message: "Welcome, Admin!" });
  }
  res.json({ success: false, message: "Invalid credentials" });
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
