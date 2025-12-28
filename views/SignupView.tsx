import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onSignup: (name: string, email: string, pass: string) => void;
    onBack: () => void;
}

const SignupView: React.FC<Props> = ({ onSignup, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError('Por favor, completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError(null);
        onSignup(name, email, password);
    };

    return (
        <div className="bg-[#FFFBF7] dark:bg-[#2C2520] font-display text-[#3E3630] dark:text-[#EAE0D5] antialiased overflow-x-hidden min-h-screen flex flex-col font-sans">
            <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-[#FFFBF7]/90 dark:bg-[#2C2520]/90 backdrop-blur-md transition-colors">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center p-2 rounded-full hover:bg-[#F7F3EF] dark:hover:bg-[#3D342E] transition-colors group"
                >
                    <span className="material-symbols-outlined text-[#3E3630] dark:text-[#EAE0D5] group-hover:text-[#D2A278] transition-colors">arrow_back_ios_new</span>
                </button>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 flex flex-col px-6 pb-8 w-full max-w-md mx-auto">
                <div className="flex flex-col items-center pt-2 pb-6">
                    <div className="w-24 h-24 mb-6 rounded-full bg-[#F7F3EF] dark:bg-[#3D342E] flex items-center justify-center relative overflow-hidden ring-1 ring-[#E6DCD3] dark:ring-[#52463D]">
                        <span className="material-symbols-outlined text-[#D2A278] text-5xl">self_improvement</span>
                    </div>
                    <h1 className="text-3xl font-bold text-center tracking-tight mb-2 text-[#3E3630] dark:text-[#EAE0D5]">Bienvenido a tu práctica</h1>
                    <p className="text-[#8C7B70] dark:text-[#C2B2A3] text-center text-base font-medium">
                        Regístrate para comenzar tu viaje de bienestar.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#3E3630] dark:text-[#EAE0D5] ml-1" htmlFor="fullname">Nombre completo</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#8C7B70] dark:text-[#C2B2A3] text-[20px] group-focus-within:text-[#D2A278] transition-colors">person</span>
                            </div>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Ej. Ana García"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-[#F7F3EF] dark:bg-[#3D342E] border border-[#E6DCD3] dark:border-[#52463D] rounded-xl focus:ring-2 focus:ring-[#D2A278]/20 focus:border-[#D2A278] text-[#3E3630] dark:text-[#EAE0D5] placeholder-[#8C7B70]/50 dark:placeholder-[#C2B2A3]/50 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#3E3630] dark:text-[#EAE0D5] ml-1" htmlFor="email">Correo electrónico</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#8C7B70] dark:text-[#C2B2A3] text-[20px] group-focus-within:text-[#D2A278] transition-colors">mail</span>
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="hola@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-[#F7F3EF] dark:bg-[#3D342E] border border-[#E6DCD3] dark:border-[#52463D] rounded-xl focus:ring-2 focus:ring-[#D2A278]/20 focus:border-[#D2A278] text-[#3E3630] dark:text-[#EAE0D5] placeholder-[#8C7B70]/50 dark:placeholder-[#C2B2A3]/50 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#3E3630] dark:text-[#EAE0D5] ml-1" htmlFor="password">Contraseña</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#8C7B70] dark:text-[#C2B2A3] text-[20px] group-focus-within:text-[#D2A278] transition-colors">lock</span>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-11 py-3.5 bg-[#F7F3EF] dark:bg-[#3D342E] border border-[#E6DCD3] dark:border-[#52463D] rounded-xl focus:ring-2 focus:ring-[#D2A278]/20 focus:border-[#D2A278] text-[#3E3630] dark:text-[#EAE0D5] placeholder-[#8C7B70]/50 dark:placeholder-[#C2B2A3]/50 transition-all outline-none"
                            />
                            <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8C7B70] dark:text-[#C2B2A3] hover:text-[#D2A278] dark:hover:text-[#D2A278] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#3E3630] dark:text-[#EAE0D5] ml-1" htmlFor="confirm_password">Confirmar contraseña</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#8C7B70] dark:text-[#C2B2A3] text-[20px] group-focus-within:text-[#D2A278] transition-colors">lock_reset</span>
                            </div>
                            <input
                                id="confirm_password"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-11 pr-11 py-3.5 bg-[#F7F3EF] dark:bg-[#3D342E] border border-[#E6DCD3] dark:border-[#52463D] rounded-xl focus:ring-2 focus:ring-[#D2A278]/20 focus:border-[#D2A278] text-[#3E3630] dark:text-[#EAE0D5] placeholder-[#8C7B70]/50 dark:placeholder-[#C2B2A3]/50 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-start gap-3 mt-2 px-1">
                        <div className="flex h-6 items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-[#D2A278] focus:ring-[#D2A278] dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="terms" className="text-[#8C7B70] dark:text-[#C2B2A3]">
                                Acepto los <a href="#" className="font-semibold text-[#D2A278] hover:text-[#D2A278]/80">Términos de servicio</a> y la <a href="#" className="font-semibold text-[#D2A278] hover:text-[#D2A278]/80">Política de privacidad</a>.
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#D2A278] hover:bg-[#D2A278]/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#D2A278]/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span>Crear cuenta</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-[#8C7B70] dark:text-[#C2B2A3]">
                    ¿Ya tienes una cuenta? {' '}
                    <button onClick={onBack} className="font-bold text-[#D2A278] hover:text-[#D2A278]/80 transition-colors">Inicia sesión</button>
                </p>
            </main>
            <div className="h-6 w-full"></div>
        </div>
    );
};

export default SignupView;
