
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface Props {
    user: User;
    onLogout: () => void;
    onBack: () => void;
}

const StudentProfileView: React.FC<Props> = ({ user, onLogout, onBack }) => {
    const stats = [
        { label: 'Asistidas', value: '24', icon: 'task' },
        { label: 'Racha', value: '5 d', icon: 'local_fire_department' },
        { label: 'Nivel', value: 'Pro', icon: 'potted_plant' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            {/* Header */}
            <header className="px-6 pt-12 flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold yoga-font">Mi Perfil</h1>
                <button
                    onClick={onLogout}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">logout</span>
                </button>
            </header>

            {/* Profile Card */}
            <section className="px-6 mb-8">
                <div className="premium-card flex flex-col items-center py-8">
                    <div className="relative mb-4">
                        <img
                            src={user.avatar || `https://picsum.photos/seed/${user.name}/200/200`}
                            className="size-28 rounded-full border-4 border-[#FAF9F6] shadow-md"
                            alt="Profile"
                        />
                        <div className="absolute bottom-0 right-0 size-8 bg-[#A07851] text-white rounded-full flex items-center justify-center border-4 border-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-[#3C3633] mb-1">{user.name}</h2>
                    <p className="text-[#7F746D] text-sm mb-6 uppercase tracking-widest font-bold text-[10px]">Alumno Premium</p>

                    <div className="flex w-full px-4 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="flex-1 bg-[#FAF9F6] rounded-2xl p-3 flex flex-col items-center border border-gray-50">
                                <span className="material-symbols-outlined text-[#A07851] text-xl mb-1">{s.icon}</span>
                                <span className="text-sm font-bold text-[#3C3633]">{s.value}</span>
                                <span className="text-[9px] text-[#7F746D] font-bold uppercase">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscription Card */}
            <section className="px-6 mb-8">
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#3C3633]">Suscripción Activa</h3>
                        <span className="px-3 py-1 bg-[#94A684]/10 text-[#94A684] rounded-full text-[10px] font-bold uppercase tracking-widest">Al día</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-14 bg-[#A07851]/10 text-[#A07851] rounded-2xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-[#3C3633]">Plan {user.quotaType}</p>
                            <p className="text-xs text-[#7F746D]">Próxima renovación: 12 Nov 2023</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-sm text-[#3C3633] font-bold">{user.sessionsLeft} Sesiones restantes</p>
                        <button className="text-[#A07851] font-bold text-sm">Gestionar</button>
                    </div>
                </div>
            </section>

            {/* Badges Section */}
            <section className="px-6 mb-12">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-bold text-[#3C3633]">Insignias Obtenidas</h3>
                    <span className="text-[#A07851] text-xs font-bold">Ver todas</span>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    {user.badges.map((badge, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="min-w-[100px] aspect-square bg-white rounded-3xl flex flex-col items-center justify-center p-4 border border-gray-100 shadow-sm gap-2"
                        >
                            <div className="size-12 bg-[#E8E0CC] rounded-full flex items-center justify-center text-[#A07851]">
                                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#3C3633] text-center leading-tight truncate w-full">{badge}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer Settings */}
            <section className="px-6 pb-20 space-y-3">
                <button className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#7F746D]">settings</span>
                        <span className="text-sm font-bold text-[#3C3633]">Configuración</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </button>
                <button className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#7F746D]">history</span>
                        <span className="text-sm font-bold text-[#3C3633]">Historial de Clases</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </button>
            </section>
        </div>
    );
};

export default StudentProfileView;
