
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CLASSES } from '../constants';

interface Props {
    onBack: () => void;
}

const AdminClassManagement: React.FC<Props> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('Hoy');
    const tabs = ['Hoy', 'Semana', 'Histórico'];

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#FAF9F6]/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Gestión de Clases</h1>
                </div>
                <button className="size-12 bg-[#3C3633] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <section className="px-6 mb-8">
                <div className="flex items-center gap-2 p-1.5 bg-[#EFEDEA] rounded-[24px]">
                    {tabs.map(t => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all ${activeTab === t ? 'bg-white text-[#3C3633] shadow-sm' : 'text-[#7F746D]'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="space-y-4">
                    {MOCK_CLASSES.map((cls, i) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="premium-card p-5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-[#3C3633] text-lg">{cls.name}</h4>
                                    <p className="text-xs text-[#7F746D] font-medium">{cls.coachName} • {cls.room}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${cls.status === 'Programada' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {cls.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-[#FAF9F6] p-2.5 rounded-2xl text-center border border-gray-50 text-[#3C3633]">
                                    <p className="text-[10px] font-bold uppercase text-[#7F746D] mb-0.5 tracking-tighter">Hora</p>
                                    <p className="text-sm font-bold">{cls.time.includes('T') ? cls.time.split('T')[1].substring(0, 5) : cls.time}</p>
                                </div>
                                <div className="bg-[#FAF9F6] p-2.5 rounded-2xl text-center border border-gray-50 text-[#3C3633]">
                                    <p className="text-[10px] font-bold uppercase text-[#7F746D] mb-0.5 tracking-tighter">Cupos</p>
                                    <p className="text-sm font-bold">{cls.bookedCount}/{cls.capacity}</p>
                                </div>
                                <div className="bg-[#FAF9F6] p-2.5 rounded-2xl text-center border border-gray-50 text-[#3C3633]">
                                    <p className="text-[10px] font-bold uppercase text-[#7F746D] mb-0.5 tracking-tighter">Tipo</p>
                                    <p className="text-sm font-bold">{cls.type}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-3 bg-[#EFEDEA] text-[#3C3633] text-xs font-bold rounded-xl active:scale-95 transition-transform">Gestionar Alumnos</button>
                                <button className="size-11 flex items-center justify-center bg-[#FAF9F6] text-[#7F746D] rounded-xl border border-gray-100">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button className="size-11 flex items-center justify-center bg-[#FAF9F6] text-red-400 rounded-xl border border-gray-100">
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminClassManagement;
