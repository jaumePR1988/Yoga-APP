
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_STUDENTS } from '../constants.tsx';

interface Props {
    onBack: () => void;
}

const AdminQuotaManagement: React.FC<Props> = ({ onBack }) => {
    const [search, setSearch] = useState('');

    const filtered = MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Gestión de Cuotas</h1>
            </header>

            <section className="px-6 mb-8">
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#7F746D] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Buscar socio..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm font-medium"
                    />
                </div>
            </section>

            <section className="px-6 mb-10 overflow-x-auto no-scrollbar flex gap-4">
                <div className="min-w-[160px] bg-[#A07851] p-6 rounded-[32px] text-white shadow-lg">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Plan Bambú</h4>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-[10px] uppercase font-bold mt-4 tracking-tighter">Socios activos</p>
                </div>
                <div className="min-w-[160px] bg-[#94A684] p-6 rounded-[32px] text-white shadow-lg">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Plan Bonsái</h4>
                    <p className="text-2xl font-bold">53</p>
                    <p className="text-[10px] uppercase font-bold mt-4 tracking-tighter">Socios activos</p>
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-bold text-[#3C3633]">Listado de Socios</h3>
                    <button className="text-[#A07851] text-xs font-bold flex items-center gap-1">
                        Ajustes globales <span className="material-symbols-outlined text-sm">settings</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {filtered.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-sm flex items-center gap-4"
                        >
                            <img src={s.avatar} className="size-14 rounded-full" alt={s.name} />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#3C3633]">{s.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${s.quotaType === 'Bambú' ? 'bg-[#A07851]/10 text-[#A07851]' : 'bg-[#94A684]/10 text-[#94A684]'
                                        }`}>
                                        Plan {s.quotaType}
                                    </span>
                                    <span className="text-[10px] text-[#7F746D] font-bold uppercase tracking-tighter">
                                        {s.sessionsLeft} Sesiones
                                    </span>
                                </div>
                            </div>
                            <button className="size-11 bg-[#FAF9F6] text-[#3C3633] rounded-2xl flex items-center justify-center border border-gray-100 active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-xl">payments</span>
                            </button>
                            <button className="size-11 bg-[#3C3633] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-xl">edit</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminQuotaManagement;
