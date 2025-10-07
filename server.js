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

// Serve static HTML views
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});

// API routes (mock backend)
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

