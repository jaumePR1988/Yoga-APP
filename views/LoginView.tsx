import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginViewProps {
  onLogin: (email: string, pass: string) => void;
  onSetupTestUsers: () => void;
  isSettingUp: boolean;
  onGoToSignup?: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onSetupTestUsers, isSettingUp, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    setError(null);
    onLogin(email, password);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-[#fdfcfb]">
      {/* Background Image / Header Area */}
      <div className="relative w-full h-[280px]">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDS1o88Mv4D8xNZ4Uh9UiWuz0L4fKiRD2BOehqwXOQMU_KlqhNPEeDeYbHepcxT-OKv1nIykYm49lowBtNQi_3zSjwEOSi5LhxGhbB6b5avIwzNJHNr2B4mi3_EV-xQfLPkIsWNEDIoWKBeryscnd0EvBucFENm3zaTjMUPH5ZclVX3lwzTc4OhB7cXfy84wrfm7zMRFY9bLxpVfnMmZ6IgpIVr1I4gHWdHZhIeiUdFyfAueom3TdbC2UrMJRrOsrrMTlTHhs2XyTlf")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fdfcfb]/90"></div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
          <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined">self_improvement</span>
          </div>
          <button className="text-white font-medium text-sm backdrop-blur-sm bg-black/10 px-3 py-1 rounded-full">Ayuda</button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 flex flex-col px-6 relative -mt-10 z-20 bg-[#fdfcfb] rounded-t-3xl">
        <div className="mb-8 text-center mt-6">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-2">Namasté</span>
          <h1 className="text-3xl font-bold text-[#292524] mb-2 tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-[#78716c] text-sm">Ingresa a tu espacio de calma y equilibrio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </motion.div>
          )}

          <div className="group">
            <label className="block text-sm font-semibold text-[#292524] mb-2 pl-1" htmlFor="email">Correo electrónico</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#78716c] material-symbols-outlined">mail</span>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white border border-gray-200 rounded-2xl text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-[#292524] mb-2 pl-1" htmlFor="password">Contraseña</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#78716c] material-symbols-outlined">lock</span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-white border border-gray-200 rounded-2xl text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400"
              />
              <button className="absolute right-4 text-gray-400 hover:text-primary transition-colors flex items-center" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Iniciar Sesión</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </form>

        <div className="text-center pb-8 mt-auto pt-10">
          <p className="text-gray-600 text-sm">
            ¿Aún no tienes cuenta? {' '}
            <button onClick={onGoToSignup} className="font-bold text-[#292524] underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors">Regístrate aquí</button>
          </p>
        </div>

        {/* Development Helper Tools - Kept but styled discreetly */}
        <div className="mb-4">
          <button
            onClick={onSetupTestUsers}
            disabled={isSettingUp}
            className={`w-full py-2 rounded-xl border border-dashed border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors ${isSettingUp ? 'opacity-50' : ''}`}
          >
            {isSettingUp ? 'Configurando...' : '🔧 Setup Test Users'}
          </button>
        </div>
      </div>

      {/* Footer Gradient Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-[#e8e0cc] via-[#d2b48c] to-[#e8e0cc] opacity-50"></div>
    </div>
  );
};

export default LoginView;
