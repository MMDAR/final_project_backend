// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
// Buat fungsi insert data
static create(data) {
  return new Promise((resolve, reject) => {
    const { name, phone, address, status, in_date_at, out_date_at } = data;
    const sql = "INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, phone, address, status, in_date_at, out_date_at], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const insertedPatient = {
          id: results.insertId,
          name,
          phone,
          address,
          status,
          in_date_at,
          out_date_at,
        };
        resolve(insertedPatient);
      }
    });
  });
  
}  
    // Mencari data berdasarkan nama
    static findByName(name) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE name = ?";
            db.query(sql, name, (err, results) => {
                // Destructuring array
                const [patient] = results;
                resolve(patient);
            });
        });
    }

 // Fungsi untuk mencari pasien berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";

      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Jika data ditemukan, ambil data pertama (seharusnya hanya satu)
          const patient = results.length > 0 ? results[0] : null;
          resolve(patient);
        }
      });
    });
  }

   // Menghapus data dari database
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM patients WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }

     // Mengupdate data pasien
    static async update(id, data) {
        await new Promise((resolve, reject) => {
            const sql = "UPDATE patients SET ? WHERE ID = ?";
            db.query(sql, [data, id], (err, results) => {
                resolve(results);
            });
        });

        // Mencari data yang baru diupdate
        const patient = await this.findById(id);
        return patient;
    }

  // Fungsi pencarian berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      // Gunakan metode koneksi database untuk mencari pasien berdasarkan status
      db.query('SELECT * FROM patients WHERE status = ?', [status], (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  }
}



// export class Patient
module.exports = Patient;
