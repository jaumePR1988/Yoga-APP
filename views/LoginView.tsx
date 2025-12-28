
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');

  return (
    <div className="flex justify-center min-h-screen bg-stone-100 font-sans">
      <div className="w-full max-w-md bg-bamboo-soft shadow-2xl flex flex-col h-screen">
        <div className="relative w-full h-[280px]">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDS1o88Mv4D8xNZ4Uh9UiWuz0L4fKiRD2BOehqwXOQMU_KlqhNPEeDeYbHepcxT-OKv1nIykYm49lowBtNQi_3zSjwEOSi5LhxGhbB6b5avIwzNJHNr2B4mi3_EV-xQfLPkIsWNEDIoWKBeryscnd0EvBucFENm3zaTjMUPH5ZclVX3lwzTc4OhB7cXfy84wrfm7zMRFY9bLxpVfnMmZ6IgpIVr1I4gHWdHZhIeiUdFyfAueom3TdbC2UrMJRrOsrrMTlTHhs2XyTlf")' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bamboo-soft"></div>
          </div>
          <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-center z-10 pt-16">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-4xl">self_improvement</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-8 relative -mt-10 z-20 space-y-6">
          <div className="text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-2">Namasté</span>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Bienvenido</h1>
            <p className="text-stone-500 text-sm">Tu espacio de calma y equilibrio.</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-stone-100 rounded-xl">
              {(['STUDENT', 'COACH', 'ADMIN'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${selectedRole === role ? 'bg-white text-primary shadow-sm' : 'text-stone-400'}`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-stone-700 mb-2 pl-1">Correo electrónico</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-stone-400 material-symbols-outlined">mail</span>
                  <input className="w-full h-14 pl-12 pr-4 bg-white border border-stone-200 rounded-2xl text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="tu@email.com" type="email" value="demo@yoga.studio" readOnly />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-stone-700 mb-2 pl-1">Contraseña</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-stone-400 material-symbols-outlined">lock</span>
                  <input className="w-full h-14 pl-12 pr-12 bg-white border border-stone-200 rounded-2xl text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="••••••••" type="password" value="********" readOnly />
                </div>
              </div>
            </div>

            <button
              onClick={() => onLogin(selectedRole)}
              className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesión</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="p-8 text-center mt-auto">
          <p className="text-stone-400 text-sm">
            ¿No tienes cuenta? <span className="text-primary font-bold cursor-pointer">Regístrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
