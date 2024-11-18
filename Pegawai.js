import React, { useState } from 'react';

const Pegawai = () => {
  // State untuk menyimpan data pegawai
  const [data, setData] = useState([
    {
      nrp: '123456',
      nama: 'John Doe',
      email: 'johndoe@example.com',
      noHp: '08123456789',
      kodeBagian: '001',
      pangkat: 'Manager',
      jabatan: 'Kepala Divisi',
      deskripsi: 'Bertanggung jawab atas administrasi.',
    },
  ]);

  // State untuk form input
  const [formData, setFormData] = useState({
    nrp: '',
    nama: '',
    email: '',
    noHp: '',
    kodeBagian: '',
    pangkat: '',
    jabatan: '',
    deskripsi: '',
  });

  // State untuk menampilkan atau menyembunyikan form Add/Edit
  const [showForm, setShowForm] = useState(false);

  // State untuk menentukan apakah dalam mode Edit
  const [editIndex, setEditIndex] = useState(null);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menambahkan atau memperbarui data
  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit data
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      // Tambah data baru
      setData([...data, formData]);
    }
    setFormData({
      nrp: '',
      nama: '',
      email: '',
      noHp: '',
      kodeBagian: '',
      pangkat: '',
      jabatan: '',
      deskripsi: '',
    });
    setShowForm(false);
  };

  // Fungsi untuk menghapus data
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Fungsi untuk mengedit data
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
    setShowForm(true);
  };

  // Fungsi untuk mendownload data sebagai CSV
  const handleDownload = () => {
    const headers = [
      'NRP Pegawai',
      'Nama Pegawai',
      'Email',
      'No HP',
      'Kode Bagian',
      'Pangkat',
      'Jabatan',
      'Deskripsi Umum',
    ];
    const rows = data.map((item) => [
      item.nrp,
      item.nama,
      item.email,
      item.noHp,
      item.kodeBagian,
      item.pangkat,
      item.jabatan,
      item.deskripsi,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Pegawai_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pegawai</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handleDownload}
          >
            Download report
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                nrp: '',
                nama: '',
                email: '',
                noHp: '',
                kodeBagian: '',
                pangkat: '',
                jabatan: '',
                deskripsi: '',
              });
              setEditIndex(null);
            }}
          >
            {showForm ? 'Cancel' : '+ Add'}
          </button>
        </div>
      </div>

      {/* Form Add/Edit */}
      {showForm && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nrp"
                placeholder="NRP Pegawai"
                value={formData.nrp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Nama Pegawai"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="noHp"
                placeholder="No HP"
                value={formData.noHp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="kodeBagian"
                placeholder="Kode Bagian"
                value={formData.kodeBagian}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="pangkat"
                placeholder="Pangkat"
                value={formData.pangkat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="jabatan"
                placeholder="Jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="deskripsi"
                placeholder="Deskripsi Umum"
                value={formData.deskripsi}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {/* Tabel Data */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>NRP Pegawai</th>
              <th>Nama Pegawai</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Kode Bagian</th>
              <th>Pangkat</th>
              <th>Jabatan</th>
              <th>Deskripsi Umum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nrp}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.noHp}</td>
                <td>{item.kodeBagian}</td>
                <td>{item.pangkat}</td>
                <td>{item.jabatan}</td>
                <td>{item.deskripsi}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-end">Total: {data.length} and showing 1 page</p>
    </div>
  );
};

export default Pegawai;
