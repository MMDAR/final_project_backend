// import Model Patient
const Patient = require("../models/Patient");

// buat class PatientController
class PatientController {
  // buat fungsi index
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    const data = {
      message: "Menampilkkan semua pasien",
      data: patients,
    };

    res.json(data);
  }
// buat fungsi store
async store(req, res) {
  try {
    const newPatient = await Patient.create(req.body);

    const data = {
      message: "Menambahkan data pasien",
      data: newPatient,
    };

    res.json(data);
  } catch (error) {
    console.error(error);

    // Send a more specific error message to the client
    res.status(500).json({ message: "Terjadi error pada server", error: error.message });
  }
}  // buat fungsi update

  async update(req, res) {
    const { id } = req.params;
    const patient = await Patient.find( id );
if (patient) {
  // melakukan update data
    const patient = await Patient.update(id, req.body);
    const data = {
      message: 'Mengedit data pasien',
      data: patient,
    };
    res.status( 200 ). json(data );
}
  else {
    const data = {
    message: 'Pasien tidak ditemukan',
  };
  res.status(404 ). json(data );
}
  }
  // buat fungsi destroy

    async destroy(req, res) {
    const {id} = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: 'Menghapus data pasien',
      };
res.status(200).json(data);
} else {
  const data = {
    message: 'Pasien tidak ditemukan',
    };
res.status(404).json(data);
}
}
// Mencari pasien tertentu

async show(req, res) {
  const { id } = req.params;

  try {
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: 'Menampilkan detail dari data pasien',
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: 'Data pasien tidak ditemukan',
      };
      res.status(404).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi error pada server' });
  }
}  // Mencari berdasarkan status 

async searchByStatus(req, res) {
    const { status } = req.params;

    try {
      const patients = await Patient.findByStatus(status);

      const data = {
        message: `Menampilkan pasien dengan status ${status}`,
        data: patients,
      };

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi error pada server" });
    }
  }
};



// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
