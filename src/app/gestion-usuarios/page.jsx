'use client'
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const sharedClasses = {
  textZinc: 'text-zinc-700 dark:text-zinc-300',
  bgZinc: 'bg-zinc-100 dark:bg-zinc-800',
  bgWhite: 'bg-white dark:bg-zinc-700',
  btnBlue: 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-900',
  btnRed: 'bg-red-500 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-900',
  btnGreen: 'bg-green-500 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-900',
};

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com', sede: 'Sede Central', rol: 'Administrador', direccion: 'Calle 123, Ciudad' },
    { id: 2, nombre: 'María García', correo: 'maria@example.com', sede: 'Sede Norte', rol: 'Usuario', direccion: 'Avenida 456, Ciudad' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    correo: '',
    sede: '',
    rol: '',
    direccion: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setUsers(users.map(user => (user.id === formData.id ? formData : user)));
    } else {
      setFormData({ ...formData, id: users.length + 1 });
      setUsers([...users, { ...formData, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const openModal = () => {
    setFormData({
      id: '',
      nombre: '',
      correo: '',
      sede: '',
      rol: '',
      direccion: ''
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Usuarios', 20, 10);
    doc.autoTable({
      head: [['Nombre', 'Correo', 'Sede', 'Rol', 'Dirección']],
      body: users.map(user => [user.nombre, user.correo, user.sede, user.rol, user.direccion]),
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${sharedClasses.bgZinc}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl mb-6 ${sharedClasses.textZinc}`}>Gestión de Usuarios</h1>
        <div className="mb-4 flex">
          <button onClick={openModal} className={`mr-2 flex items-center ${sharedClasses.btnBlue} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            <FaPlus className="mr-2" /> Agregar Usuario
          </button>
          <button onClick={exportToExcel} className={`mr-2 flex items-center ${sharedClasses.btnGreen} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            <FaFileExcel className="mr-2" /> Exportar a Excel
          </button>
          <button onClick={exportToPDF} className={`flex items-center ${sharedClasses.btnRed} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            <FaFilePdf className="mr-2" /> Exportar a PDF
          </button>
        </div>
        <table className="min-w-full bg-white dark:bg-zinc-700 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Correo</th>
              <th className="py-2 px-4 border-b">Sede</th>
              <th className="py-2 px-4 border-b">Rol</th>
              <th className="py-2 px-4 border-b">Dirección</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.nombre}</td>
                <td className="py-2 px-4 border-b">{user.correo}</td>
                <td className="py-2 px-4 border-b">{user.sede}</td>
                <td className="py-2 px-4 border-b">{user.rol}</td>
                <td className="py-2 px-4 border-b">{user.direccion}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(user)} className={`mr-2 ${sharedClasses.btnBlue} text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className={`${sharedClasses.btnRed} text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className={`bg-white dark:bg-zinc-700 p-8 rounded-lg shadow-lg w-full max-w-md`}>
            <h2 className={`text-xl mb-4 ${sharedClasses.textZinc}`}>{isEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="nombre">Nombre</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="correo">Correo Electrónico</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="sede">Sede</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="sede"
                  type="text"
                  value={formData.sede}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="rol">Rol</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="rol"
                  type="text"
                  value={formData.rol}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="direccion">Dirección</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${sharedClasses.btnBlue}`}
                  type="submit"
                >
                  {isEdit ? 'Guardar Cambios' : 'Agregar Usuario'}
                </button>
                <button
                  className="ml-2 text-zinc-600 dark:text-zinc-400 font-bold py-2 px-4 rounded hover:bg-zinc-200 dark:hover:bg-zinc-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;