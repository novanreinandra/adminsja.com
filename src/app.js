// ================================
// Import Module dan Inisialisasi
// ================================
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

// ================================
// Konversi __dirname untuk ES Modules
// ================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path project
const rootPath = path.join(__dirname, '..');

// ================================
// Import Route Modular
// ================================
import adminHrdRoutes from './routes/adminHrd.js';
import sjaPresenceRoutes from './routes/sjaPresence.js';

// ================================
// Setup Aplikasi Express
// ================================
const app = express();
const port = 5000;

// ================================
// Middleware untuk file statis
// ================================
app.use(express.static(path.join(rootPath, 'public')));

// ================================
// Middleware body parser
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// Session (untuk login HRD)
// ================================
app.use(
  session({
    secret: 'sja_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// ================================
// Konfigurasi view engine EJS
// ================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ================================
// Daftar Routing
// ================================
app.use('/admin_Hrd', adminHrdRoutes);
app.use('/sja_presence', sjaPresenceRoutes);

// ================================
// Error handling 404
// ================================
app.use((req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

// ================================
// Menjalankan Server
// ================================
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
