
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_STUDENTS } from '../constants.tsx';

interface Props {
    retreatId: string;
    onBack: () => void;
    setView: (v: string) => void;
}

const AdminRetreatDetailView: React.FC<Props> = ({ retreatId, onBack, setView }) => {
    const [activeTab, setActiveTab] = useState('Participantes');

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            {/* Header Overlay */}
            <div className="relative h-[30vh]">
                <img src="https://picsum.photos/seed/retreat-detail/800/400" className="w-full h-full object-cover" alt="Retreat" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-12 left-6 right-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="size-12 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        onClick={() => setView('admin_retreat_finance')}
                        className="px-4 py-2 bg-[#94A684] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg"
                    >
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Finanzas del Retiro
                    </button>
                </div>
                <div className="absolute bottom-6 left-8 text-white">
                    <h1 className="text-3xl font-bold yoga-font">Despertar Espiritual</h1>
                    <p className="text-white/80 text-sm font-semibold">Cusco, Perú • Nov 2023</p>
                </div>
            </div>

            {/* Tabs */}
            <section className="px-6 py-4 sticky top-0 bg-[#FAF9F6] z-20">
                <div className="flex gap-6 border-b border-gray-100">
                    {['Participantes', 'Rooming', 'Actividades'].map(t => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === t ? 'text-[#A07851]' : 'text-[#7F746D]'
                                }`}
                        >
                            {t}
                            {activeTab === t && (
                                <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-[#A07851] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Tab Content: Participantes */}
            {activeTab === 'Participantes' && (
                <section className="px-6 py-6 pb-24">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-xs font-bold text-[#7F746D] uppercase tracking-widest px-1">18/20 Pax Confirmados</p>
                        <button className="text-[#A07851] text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            Nuevo Pax
                        </button>
                    </div>

                    <div className="space-y-4">
                        {MOCK_STUDENTS.map((s, i) => (
                            <div key={s.id} className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="relative">
                                    <img src={s.avatar} className="size-14 rounded-full" alt={s.name} />
                                    <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white ${i % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}>
                                        <span className="material-symbols-outlined text-[10px] text-white">
                                            {i % 2 === 0 ? 'check' : 'pending'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#3C3633]">{s.name}</h4>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[8px] font-bold text-[#D48C70] bg-[#D48C70]/10 px-2 py-0.5 rounded-full uppercase">Vegana</span>
                                        <span className="text-[8px] font-bold text-red-400 bg-red-50 px-2 py-0.5 rounded-full uppercase">Alérg. Frutos</span>
                                    </div>
                                </div>
                                <button className="size-10 bg-[#FAF9F6] text-[#7F746D] rounded-xl flex items-center justify-center border border-gray-100">
                                    <span className="material-symbols-outlined text-xl">more_vert</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'Rooming' && (
                <section className="px-6 py-8 pb-24">
                    <div className="bg-[#3C3633] rounded-[40px] p-8 text-white min-h-[400px]">
                        <h3 className="yoga-font text-2xl mb-8">Mapa de Habitaciones</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <div key={num} className="bg-white/10 border border-white/20 rounded-3xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/20 transition-all">
                                    <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest">Hab. {num}</span>
                                    <div className="flex gap-1">
                                        <div className="size-2 rounded-full bg-green-400"></div>
                                        <div className="size-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <p className="text-[9px] font-bold text-white/80">Ocupada</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AdminRetreatDetailView;
