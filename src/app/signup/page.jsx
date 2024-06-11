'use client'
import React, { useState, useEffect } from 'react';

const sharedClasses = {
  textZinc: 'text-zinc-700 dark:text-zinc-300',
  bgZinc: 'bg-zinc-100 dark:bg-zinc-800',
  bgWhite: 'bg-white dark:bg-zinc-700',
  btnBlue: 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-900',
};

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    clave: '',
    id_sede: '',
    id_rol: '',
    id_direccion: ''
  });

  const [direcciones, setDirecciones] = useState([
    { id: 1, direccion: 'Calle 123, Ciudad' },
    { id: 2, direccion: 'Avenida 456, Ciudad' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDireccion, setNewDireccion] = useState({
    linea1: '',
    linea2: '',
    codigo_postal: '',
    id_departamento: '',
    id_municipio: '',
    id_distrito: ''
  });

  const [departamentos] = useState([
    { id: '01', departamento: 'Departamento 1', pais: 'País 1' },
    { id: '02', departamento: 'Departamento 2', pais: 'País 2' }
  ]);

  const [municipios, setMunicipios] = useState([
    { id: '001', municipio: 'Municipio 1', id_departamento: '01' },
    { id: '002', municipio: 'Municipio 2', id_departamento: '01' },
    { id: '003', municipio: 'Municipio 3', id_departamento: '02' }
  ]);

  const [distritos, setDistritos] = useState([
    { id: '0001', distrito: 'Distrito 1', id_municipio: '001' },
    { id: '0002', distrito: 'Distrito 2', id_municipio: '002' },
    { id: '0003', distrito: 'Distrito 3', id_municipio: '003' }
  ]);

  const sedes = [
    { id: 1, nombre: 'Sede Central' },
    { id: 2, nombre: 'Sede Norte' }
  ];

  const roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleNewDireccionChange = (e) => {
    setNewDireccion({
      ...newDireccion,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario a tu API o servidor
    console.log(formData);
  };

  const handleAddDireccion = () => {
    const newId = direcciones.length + 1;
    const direccionCompleta = `${newDireccion.linea1} ${newDireccion.linea2}, Código Postal: ${newDireccion.codigo_postal}`;
    setDirecciones([...direcciones, { id: newId, direccion: direccionCompleta }]);
    setFormData({ ...formData, id_direccion: newId });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (newDireccion.id_departamento) {
      setMunicipios(municipios.filter(m => m.id_departamento === newDireccion.id_departamento));
    }
  }, [newDireccion.id_departamento]);

  useEffect(() => {
    if (newDireccion.id_municipio) {
      setDistritos(distritos.filter(d => d.id_municipio === newDireccion.id_municipio));
    }
  }, [newDireccion.id_municipio]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 ${sharedClasses.bgZinc}`}>
      <form onSubmit={handleSubmit} className={`shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md ${sharedClasses.bgWhite}`}>
        <h1 className={`text-2xl ${sharedClasses.textZinc} mb-6 text-center`}>Registro</h1>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="nombre">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="nombre"
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="correo">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="correo"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="clave">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="clave"
            type="password"
            placeholder="******************"
            value={formData.clave}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_sede">
            Sede
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="id_sede"
            value={formData.id_sede}
            onChange={handleChange}
          >
            <option value="">Seleccione una sede</option>
            {sedes.map(sede => (
              <option key={sede.id} value={sede.id}>{sede.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_rol">
            Rol
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="id_rol"
            value={formData.id_rol}
            onChange={handleChange}
          >
            <option value="">Seleccione un rol</option>
            {roles.map(rol => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_direccion">
            Dirección
          </label>
          <div className="flex">
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="id_direccion"
              value={formData.id_direccion}
              onChange={handleChange}
            >
              <option value="">Seleccione una dirección</option>
              {direcciones.map(direccion => (
                <option key={direccion.id} value={direccion.id}>{direccion.direccion}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <button
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${sharedClasses.btnBlue}`}
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>

      <footer className={`text-zinc-600 dark:text-zinc-400 text-center mt-4`}>
        <p>Gestión de Eventos</p>
        <p>© 2023 Asociación de Motociclistas</p>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className={`bg-white dark:bg-zinc-700 p-8 rounded-lg shadow-lg w-full max-w-md`}>
            <h2 className={`text-xl ${sharedClasses.textZinc} mb-4`}>Agregar Nueva Dirección</h2>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="linea1">
                Línea 1
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="linea1"
                type="text"
                placeholder="Línea 1"
                value={newDireccion.linea1}
                onChange={handleNewDireccionChange}
              />
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="linea2">
                Línea 2
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="linea2"
                type="text"
                placeholder="Línea 2"
                value={newDireccion.linea2}
                onChange={handleNewDireccionChange}
              />
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="codigo_postal">
                Código Postal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="codigo_postal"
                type="text"
                placeholder="Código Postal"
                value={newDireccion.codigo_postal}
                onChange={handleNewDireccionChange}
              />
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_departamento">
                Departamento
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="id_departamento"
                value={newDireccion.id_departamento}
                onChange={handleNewDireccionChange}
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map(departamento => (
                  <option key={departamento.id} value={departamento.id}>{departamento.departamento}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_municipio">
                Municipio
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="id_municipio"
                value={newDireccion.id_municipio}
                onChange={handleNewDireccionChange}
              >
                <option value="">Seleccione un municipio</option>
                {municipios.filter(m => m.id_departamento === newDireccion.id_departamento).map(municipio => (
                  <option key={municipio.id} value={municipio.id}>{municipio.municipio}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="id_distrito">
                Distrito
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="id_distrito"
                value={newDireccion.id_distrito}
                onChange={handleNewDireccionChange}
              >
                <option value="">Seleccione un distrito</option>
                {distritos.filter(d => d.id_municipio === newDireccion.id_municipio).map(distrito => (
                  <option key={distrito.id} value={distrito.id}>{distrito.distrito}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${sharedClasses.btnBlue}`}
                onClick={handleAddDireccion}
              >
                Agregar
              </button>
              <button
                className="ml-2 text-zinc-600 dark:text-zinc-400 font-bold py-2 px-4 rounded hover:bg-zinc-200 dark:hover:bg-zinc-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
