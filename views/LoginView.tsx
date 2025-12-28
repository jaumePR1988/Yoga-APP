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

  const fillCredentials = (role: 'student' | 'coach') => {
    if (role === 'student') {
      setEmail('alumno@namaste.com');
      setPassword('yoga1234');
    } else {
      setEmail('coach@namaste.com');
      setPassword('yoga1234');
    }
  };

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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-[#F9F7F2] dark:bg-[#191512] font-display">
      {/* Background Image / Header Area */}
      <div className="relative w-full h-[320px]">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1000")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#F9F7F2] dark:to-[#191512]"></div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 flex flex-col px-8 relative -mt-20 z-20">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-[#191512] shadow-xl mb-4 p-1 ring-1 ring-black/5">
            <div className="w-full h-full rounded-full bg-[#A17A57]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#A17A57] text-3xl">self_improvement</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#292524] dark:text-white mb-2 tracking-tight">Bienvenido</h1>
          <p className="text-[#78716c] dark:text-[#a8a29e] text-sm">Ingresa a tu espacio de calma y equilibrio.</p>
        </div>

        {/* Quick Login Shortcuts (Dev/Demo) */}
        <div className="flex gap-2 justify-center mb-6">
          <button onClick={() => fillCredentials('student')} className="text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-primary transition-colors border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1">
            Soy Alumno
          </button>
          <button onClick={() => fillCredentials('coach')} className="text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-primary transition-colors border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1">
            Soy Coach
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs rounded-xl border border-red-100 dark:border-red-900/30 flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="email">Correo electrónico</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">mail</span>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white dark:bg-[#26201B] border-2 border-transparent focus:border-[#A17A57]/20 rounded-2xl text-base outline-none focus:ring-4 focus:ring-[#A17A57]/10 transition-all placeholder:text-gray-400 dark:text-white shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="password">Contraseña</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">lock</span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-white dark:bg-[#26201B] border-2 border-transparent focus:border-[#A17A57]/20 rounded-2xl text-base outline-none focus:ring-4 focus:ring-[#A17A57]/10 transition-all placeholder:text-gray-400 dark:text-white shadow-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A17A57] transition-colors flex items-center" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-[#A17A57] hover:underline transition-all">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#A17A57] hover:bg-[#8B6A4B] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#A17A57]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            <span>Iniciar Sesión</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </form>

        <div className="text-center pb-8 mt-auto pt-8">
          <p className="text-[#78716c] dark:text-[#a8a29e] text-sm">
            ¿Aún no tienes cuenta? {' '}
            <button onClick={onGoToSignup} className="font-bold text-[#A17A57] hover:text-[#8B6A4B] transition-colors">Regístrate aquí</button>
          </p>
        </div>

        {/* Development Helper Tools - Kept but styled discreetly */}
        <div className="mb-4">
          <button
            onClick={onSetupTestUsers}
            disabled={isSettingUp}
            className={`w-full py-2 rounded-xl border border-dashed border-[#A17A57]/30 text-[#A17A57]/60 text-[10px] font-bold uppercase tracking-wider hover:bg-[#A17A57]/5 transition-colors ${isSettingUp ? 'opacity-50' : ''}`}
          >
            {isSettingUp ? 'Configurando...' : '🔧 Setup Test Users'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
