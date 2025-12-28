
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_STUDENTS } from '../constants.tsx';

interface Props {
    onBack: () => void;
}

const CoachClassStudents: React.FC<Props> = ({ onBack }) => {
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const filteredStudents = MOCK_STUDENTS.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleCheck = (id: string) => {
        if (checkedIds.includes(id)) setCheckedIds(checkedIds.filter(i => i !== id));
        else setCheckedIds([...checkedIds, id]);
    };

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
                    <div>
                        <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Asistencia</h1>
                        <p className="text-[10px] text-[#7F746D] font-bold uppercase tracking-wider">Vinyasa Flow • 10:00 AM</p>
                    </div>
                </div>
                <button className="text-[#A07851] text-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">download</span>
                    CSV
                </button>
            </header>

            <section className="px-6 mb-6">
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#7F746D] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Buscar alumno..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm"
                    />
                </div>
            </section>

            <section className="px-6 pb-32">
                <div className="flex items-center justify-between mb-4 px-1">
                    <p className="text-xs font-bold text-[#7F746D] uppercase tracking-widest">{filteredStudents.length} Inscritos</p>
                    <p className="text-xs font-bold text-[#A07851] uppercase tracking-widest">{checkedIds.length} Presentes</p>
                </div>

                <div className="space-y-3">
                    {filteredStudents.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-center gap-4 p-4 rounded-[28px] border transition-all ${checkedIds.includes(s.id) ? 'bg-[#94A684]/5 border-[#94A684]/20' : 'bg-white border-gray-100 shadow-sm'
                                }`}
                        >
                            <img src={s.avatar} className="size-12 rounded-full border-2 border-white shadow-sm" alt={s.name} />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#3C3633]">{s.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[9px] font-bold text-[#7F746D] uppercase tracking-wider">{s.quotaType}</span>
                                    {s.badges.length > 0 && <span className="size-1.5 rounded-full bg-[#A07851]"></span>}
                                    <span className="text-[9px] font-bold text-[#A07851] uppercase tracking-wider">{s.badges[0]}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleCheck(s.id)}
                                className={`size-10 rounded-full flex items-center justify-center transition-all ${checkedIds.includes(s.id)
                                        ? 'bg-[#94A684] text-white shadow-lg shadow-[#94A684]/20'
                                        : 'bg-[#FAF9F6] text-[#7F746D] border border-gray-100 hover:border-[#A07851]/30'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px] font-bold">
                                    {checkedIds.includes(s.id) ? 'check' : 'person_check'}
                                </span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sticky Summary */}
            <div className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-30 rounded-t-[32px]">
                <div className="flex justify-between items-center max-w-md mx-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[#7F746D] font-bold uppercase tracking-widest">Asistencia Final</span>
                        <span className="text-lg font-bold text-[#3C3633]">{Math.round((checkedIds.length / MOCK_STUDENTS.length) * 100)}% Completada</span>
                    </div>
                    <button className="btn-primary px-8">Cerrar Clase</button>
                </div>
            </div>
        </div>
    );
};

export default CoachClassStudents;
