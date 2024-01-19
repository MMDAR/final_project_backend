// import PatientController
const PatientController = require("../controllers/PatientController")
// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index)
// Rute untuk menambahkan data pasien
router.post('/patients', PatientController.store);

// Rute untuk mengedit data pasien
router.put('/patients/:id', PatientController.update);

// Rute untuk menghapus data pasien
router.delete('/patients/:id', PatientController.destroy);

// Rute untuk menampilkan detail data pasien
router.get('/patients/:id', PatientController.show);

// Rute untuk mencari pasien berdasarkan status
router.get('/patients/status/:status', PatientController.searchByStatus);

// export router
module.exports = router;
