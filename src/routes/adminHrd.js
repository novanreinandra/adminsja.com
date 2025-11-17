// ===============================
// routes/adminHrd.js
// ===============================
import express from "express";
import axios from "axios";

const router = express.Router();

// ===============================
// KONFIGURASI API BASE URL
// ===============================
const API_BASE_URL = "http://192.168.1.10:3001/api";

const API = {
  COMPANY: `${API_BASE_URL}/company`,
  DEPARTMENT: `${API_BASE_URL}/department`,
  KARYAWAN: `${API_BASE_URL}/karyawan`,
  LOGIN: `${API_BASE_URL}/login`,
};

// ===============================
// REDIRECT ROOT KE DASHBOARD
// ===============================
router.get("/", (req, res) => res.redirect("/admin_Hrd/dashboard"));

// ===============================
// DASHBOARD
// ===============================
router.get("/dashboard", (req, res) => {
  res.render("admin_Hrd/dashboard", { title: "Dashboard HRD" });
});

// =========================================================
// =============== COMPANY & DEPARTEMEN START ==============
// =========================================================
router.get("/company", async (req, res) => {
  try {
    const [resCompany, resDept] = await Promise.all([
      axios.get(API.COMPANY),
      axios.get(API.DEPARTMENT),
    ]);

    const dataCompany = Array.isArray(resCompany.data?.data)
      ? resCompany.data.data
      : resCompany.data;
    const dataDept = Array.isArray(resDept.data?.data)
      ? resDept.data.data
      : resDept.data;

    res.render("admin_Hrd/company", {
      title: "Company & Departemen",
      dataCompany,
      dataDept,
      message: req.query.message || null,
      error: req.query.error || null,
    });
  } catch (err) {
    console.error("Gagal ambil data company/dept:", err.message);
    res.render("admin_Hrd/company", {
      title: "Company & Departemen",
      dataCompany: [],
      dataDept: [],
      message: null,
      error: "Tidak dapat terhubung ke server API.",
    });
  }
});

// ===============================
// TAMBAH COMPANY
// ===============================
router.post("/company/add", async (req, res) => {
  try {
    const { nama_company, npwp, active } = req.body;
    await axios.post(API.COMPANY, { nama_company, npwp, active });
    res.redirect("/admin_Hrd/company?message=Company+berhasil+ditambahkan");
  } catch (err) {
    console.error("Gagal tambah company:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+menambah+company");
  }
});

// ===============================
// EDIT COMPANY
// ===============================
router.post("/company/edit/:id", async (req, res) => {
  try {
    await axios.put(`${API.COMPANY}/${req.params.id}`, req.body);
    res.redirect("/admin_Hrd/company?message=Company+berhasil+diedit");
  } catch (err) {
    console.error("Gagal edit company:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+mengedit+company");
  }
});

// ===============================
// HAPUS COMPANY
// ===============================
router.post("/company/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API.COMPANY}/${req.params.id}`);
    res.redirect("/admin_Hrd/company?message=Company+berhasil+dihapus");
  } catch (err) {
    console.error("Gagal hapus company:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+menghapus+company");
  }
});

// ===============================
// TAMBAH DEPARTEMEN
// ===============================
router.post("/dept/add", async (req, res) => {
  try {
    const { nama_department, ket } = req.body;
    await axios.post(API.DEPARTMENT, { nama_department, ket });
    res.redirect("/admin_Hrd/company?message=Departemen+berhasil+ditambahkan");
  } catch (err) {
    console.error("Gagal tambah departemen:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+menambah+departemen");
  }
});

// ===============================
// EDIT DEPARTEMEN
// ===============================
router.post("/dept/edit/:id", async (req, res) => {
  try {
    await axios.put(`${API.DEPARTMENT}/${req.params.id}`, req.body);
    res.redirect("/admin_Hrd/company?message=Departemen+berhasil+diedit");
  } catch (err) {
    console.error("Gagal edit departemen:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+mengedit+departemen");
  }
});

// ===============================
// HAPUS DEPARTEMEN
// ===============================
router.post("/dept/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API.DEPARTMENT}/${req.params.id}`);
    res.redirect("/admin_Hrd/company?message=Departemen+berhasil+dihapus");
  } catch (err) {
    console.error("Gagal hapus departemen:", err.message);
    res.redirect("/admin_Hrd/company?error=Gagal+menghapus+departemen");
  }
});

// =========================================================
// =============== DATA KARYAWAN START ====================
// =========================================================
router.get("/data_karyawan", async (req, res) => {
  try {
    const response = await axios.get(API.KARYAWAN);
    let dataKaryawan = Array.isArray(response.data?.data)
      ? response.data.data
      : response.data;

    dataKaryawan = dataKaryawan.map((k) => ({
      ...k,
      tgl_masuk: k.tgl_masuk ? String(k.tgl_masuk).split("T")[0] : "-",
    }));

    res.render("admin_Hrd/data_karyawan", {
      title: "Data Karyawan",
      dataKaryawan,
      message: req.query.message || null,
      error: req.query.error || null,
    });
  } catch (err) {
    console.error("Gagal ambil data karyawan:", err.message);
    res.render("admin_Hrd/data_karyawan", {
      title: "Data Karyawan",
      dataKaryawan: [],
      message: null,
      error: "Tidak dapat terhubung ke server API.",
    });
  }
});

// ===============================
// TAMBAH DATA KARYAWAN
// ===============================
router.post("/data_karyawan/add", async (req, res) => {
  try {
    await axios.post(API.KARYAWAN, req.body);
    res.redirect("/admin_Hrd/data_karyawan?message=Karyawan+berhasil+ditambahkan");
  } catch (err) {
    console.error("Gagal tambah karyawan:", err.message);
    res.redirect("/admin_Hrd/data_karyawan?error=Gagal+menambah+data+karyawan");
  }
});

// ===============================
// EDIT KARYAWAN
// ===============================
router.post("/data_karyawan/edit/:id", async (req, res) => {
  try {
    await axios.put(`${API.KARYAWAN}/${req.params.id}`, req.body);
    res.redirect("/admin_Hrd/data_karyawan?message=Karyawan+berhasil+diedit");
  } catch (err) {
    console.error("Gagal edit karyawan:", err.message);
    res.redirect("/admin_Hrd/data_karyawan?error=Gagal+mengedit+karyawan");
  }
});

// ===============================
// HAPUS KARYAWAN
// ===============================
router.post("/data_karyawan/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API.KARYAWAN}/${req.params.id}`);
    res.redirect("/admin_Hrd/data_karyawan?message=Karyawan+berhasil+dihapus");
  } catch (err) {
    console.error("Gagal hapus karyawan:", err.message);
    res.redirect("/admin_Hrd/data_karyawan?error=Gagal+menghapus+karyawan");
  }
});

// ==========================================================
// ================= HALAMAN LAIN ==========================
// ==========================================================
const renderPage = (view, title) => (req, res) => res.render(view, { title });

router.get("/rekrutmen", renderPage("admin_Hrd/rekrutmen", "Rekrutmen"));
router.get("/penilaian_kinerja", renderPage("admin_Hrd/penilaian_kinerja", "Penilaian Kinerja"));
router.get("/absensi", renderPage("admin_Hrd/absensi", "Absensi"));
router.get("/lembur_izin", renderPage("admin_Hrd/lembur_izin", "Lembur & Izin"));
router.get("/slip_gaji", renderPage("admin_Hrd/slip_gaji", "Slip Gaji"));
router.get("/laporan", renderPage("admin_Hrd/laporan", "Laporan HRD"));
router.get("/agenda", renderPage("admin_Hrd/agenda", "Agenda Kunjungan Kerja"));
router.get("/kinerja_marketing", renderPage("admin_Hrd/kinerja_marketing", "Kinerja Marketing"));
router.get("/pengaturan", renderPage("admin_Hrd/pengaturan", "Pengaturan HRD"));

// ===============================
// LOGIN HRD
// ===============================
router.get("/login", (req, res) => {
  res.render("admin_Hrd/login", { title: "Login HRD", error: null });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(API.LOGIN, { email, password });
    const data = response.data;

    if (data && (data.success || data.is_active)) {
      req.session.user = data;
      return res.redirect("/admin_Hrd/dashboard");
    } else {
      return res.render("admin_Hrd/login", {
        title: "Login HRD",
        error: "Email atau password salah!",
      });
    }
  } catch (error) {
    console.error("Gagal login HRD:", error.message);
    res.render("admin_Hrd/login", {
      title: "Login HRD",
      error: "Tidak dapat terhubung ke server API.",
    });
  }
});

export default router;
