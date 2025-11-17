// ===============================
// Import Module
// ===============================
import express from "express";
import axios from "axios"; // <--- Tambahkan ini
const router = express.Router();

// ===============================
// Routing Utama SJA Presence
// Prefix: /sja_presence
// ===============================

// Redirect root "/sja_presence" ke halaman dashboard
router.get("/", (req, res) => {
  res.redirect("/sja_presence/dashboard");
});

// ===============================
// Halaman Dashboard
// ===============================
router.get("/dashboard", (req, res) => {
  res.render("sja_presence/dashboard", { title: "Dashboard" });
});

router.get("/absensi", (req, res) => {
  res.render("sja_presence/absensi", { title: "Absensi" });
});

router.get("/agenda", (req, res) => {
  res.render("sja_presence/agenda", { title: "Agenda" });
});

router.get("/izin", (req, res) => {
  res.render("sja_presence/izin", { title: "Izin" });
});

// ===============================
// Halaman Login
// ===============================
router.get("/login", (req, res) => {
  res.render("sja_presence/login", { title: "Login" });
});

// ===============================
// API Login
// ===============================
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // URL API eksternal
    const API_URL = "http://localhost:3000/sja_presence/login";

    // Nembak API pakai Axios
    const response = await axios.post(API_URL, { email, password });

    // mengirim hasil respon ke frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error saat login:", error.message);
    res.status(500).json({ success: false, message: "Gagal terhubung ke API eksternal" });
  }
});

// ===============================
// Export Router
// ===============================
export default router;
