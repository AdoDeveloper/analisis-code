import React from 'react';

const sharedClasses = {
  textZinc: 'text-zinc-700 dark:text-zinc-300',
  bgZinc: 'bg-zinc-100 dark:bg-zinc-800',
  bgWhite: 'bg-white dark:bg-zinc-700',
  btnBlue: 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-900',
};

const LoginForm = () => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 ${sharedClasses.bgZinc}`}>
      <form className={`shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md ${sharedClasses.bgWhite}`}>
        <h1 className={`text-2xl ${sharedClasses.textZinc} mb-6 text-center`}>Iniciar Sesión</h1>
        <div className="mb-4">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="email">
            Correo Electrónico
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="email" type="email" placeholder="Correo Electrónico" />
        </div>
        <div className="mb-6">
          <label className={`block ${sharedClasses.textZinc} text-sm font-bold mb-2`} htmlFor="password">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="password" type="password" placeholder="******************" />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <button className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${sharedClasses.btnBlue}`}>
            Iniciar Sesión
          </button>
          <a href="#" className="text-blue-500 dark:text-blue-400 text-sm">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
      <footer className={`text-zinc-600 dark:text-zinc-00 text-center mt-4`}>
        <p>Gestión de Eventos</p>
        <p>© 2023 Asociación de Motociclistas</p>
      </footer>
    </div>
  );
};

export default LoginForm;
