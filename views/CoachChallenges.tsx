
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onBack: () => void;
}

const CoachChallenges: React.FC<Props> = ({ onBack }) => {
    const challenges = [
        { title: 'Reto 30 días Yoga', participants: 45, status: 'Activo', progress: 65, color: '#A07851' },
        { title: 'Flexibilidad Extrema', participants: 22, status: 'Próximamente', progress: 0, color: '#94A684' },
        { title: 'Mindfulness 7 d', participants: 89, status: 'Finalizado', progress: 100, color: '#D48C70' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Retos Comunidad</h1>
                </div>
                <button className="size-12 bg-[#A07851] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <section className="px-6 flex-1">
                <div className="flex items-center justify-between mb-6 px-1">
                    <h3 className="font-bold text-[#3C3633]">Gestionar Retos</h3>
                    <span className="text-[#A07851] text-xs font-bold underline">Historial</span>
                </div>

                <div className="space-y-6 mb-20">
                    {challenges.map((c, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: c.color }}>
                                        <span className="material-symbols-outlined text-2xl">emoji_events</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#3C3633]">{c.title}</h4>
                                        <p className="text-[10px] text-[#7F746D] font-bold uppercase tracking-widest">{c.participants} Participantes</p>
                                    </div>
                                </div>
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.status === 'Activo' ? 'bg-green-50 text-green-600' :
                                        c.status === 'Finalizado' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                    {c.status}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-[#7F746D]">Progreso General</span>
                                    <span className="text-[#3C3633]">{c.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#FAF9F6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${c.progress}%` }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: c.color }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button className="flex-1 py-3 text-xs font-bold text-[#7F746D] bg-[#FAF9F6] rounded-xl hover:bg-gray-100 transition-colors">Ver Detalles</button>
                                <button className="flex-1 py-3 text-xs font-bold text-white bg-[#3C3633] rounded-xl hover:bg-black transition-colors">Enviar Notif.</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CoachChallenges;
