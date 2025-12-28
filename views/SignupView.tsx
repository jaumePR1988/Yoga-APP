import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onSignup: (name: string, email: string, pass: string, phone: string) => void;
    onBack: () => void;
}

const SignupView: React.FC<Props> = ({ onSignup, onBack }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword || !phoneNumber) {
            setError('Por favor, completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError(null);
        onSignup(name, email, password, phoneNumber);
    };

    return (
        <div className="bg-[#F9F7F2] dark:bg-[#191512] font-display text-[#292524] dark:text-[#EAE0D5] antialiased overflow-x-hidden min-h-screen flex flex-col font-sans">
            {/* Header ... */}
            <header className="flex items-center justify-between px-6 pt-safe-top pb-4 sticky top-0 z-10 bg-[#F9F7F2]/90 dark:bg-[#191512]/90 backdrop-blur-md transition-colors">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                >
                    <span className="material-symbols-outlined text-[#292524] dark:text-white transition-colors">arrow_back</span>
                </button>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col px-8 pb-8 w-full max-w-md mx-auto">
                <div className="flex flex-col items-center pt-2 pb-8">
                    <div className="w-20 h-20 mb-6 rounded-full bg-white dark:bg-[#26201B] flex items-center justify-center relative shadow-lg ring-1 ring-black/5">
                        <span className="material-symbols-outlined text-[#A17A57] text-4xl">self_improvement</span>
                    </div>
                    <h1 className="text-3xl font-bold text-center tracking-tight mb-2 text-[#292524] dark:text-white">Crea tu cuenta</h1>
                    <p className="text-[#78716c] dark:text-[#a8a29e] text-center text-sm">
                        Únete a nuestra comunidad de bienestar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs rounded-xl border border-red-100 dark:border-red-900/30 flex items-center gap-2 font-medium">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="fullname">Nombre completo</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">person</span>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Ej. Ana García"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 bg-white dark:bg-[#26201B] border-2 border-transparent focus:border-[#A17A57]/20 rounded-2xl text-base outline-none focus:ring-4 focus:ring-[#A17A57]/10 transition-all placeholder:text-gray-400 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="phone">Teléfono móvil</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">smartphone</span>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="+34 600 000 000"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 bg-white dark:bg-[#26201B] border-2 border-transparent focus:border-[#A17A57]/20 rounded-2xl text-base outline-none focus:ring-4 focus:ring-[#A17A57]/10 transition-all placeholder:text-gray-400 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="email">Correo electrónico</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">mail</span>
                            <input
                                id="email"
                                type="email"
                                placeholder="hola@ejemplo.com"
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
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A17A57] transition-colors flex items-center">
                                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#292524] dark:text-white uppercase tracking-wider pl-1" htmlFor="confirm_password">Confirmar contraseña</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A17A57] material-symbols-outlined">lock_reset</span>
                            <input
                                id="confirm_password"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-14 pl-12 pr-12 bg-white dark:bg-[#26201B] border-2 border-transparent focus:border-[#A17A57]/20 rounded-2xl text-base outline-none focus:ring-4 focus:ring-[#A17A57]/10 transition-all placeholder:text-gray-400 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2 px-1">
                        <div className="flex h-5 items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-[#A17A57] focus:ring-[#A17A57] dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div className="text-sm leading-tight pt-[2px]">
                            <label htmlFor="terms" className="text-[#78716c] dark:text-[#a8a29e]">
                                Acepto los <a href="#" className="font-bold text-[#A17A57] hover:underline">Términos</a> y la <a href="#" className="font-bold text-[#A17A57] hover:underline">Política de privacidad</a>.
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 h-14 bg-[#A17A57] hover:bg-[#8B6A4B] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#A17A57]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <span>Crear cuenta</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-[#78716c] dark:text-[#a8a29e]">
                    ¿Ya tienes una cuenta? {' '}
                    <button onClick={onBack} className="font-bold text-[#A17A57] hover:text-[#8B6A4B] transition-colors">Inicia sesión</button>
                </p>
            </main>
        </div>
    );
};

export default SignupView;
