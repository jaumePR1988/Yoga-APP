
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onBack: () => void;
}

const CoachNotificationsPush: React.FC<Props> = ({ onBack }) => {
    const [selectedGroup, setSelectedGroup] = useState('Todos');
    const groups = ['Todos', 'Vinyasa Flow', 'Hatha Relax', 'Principiantes', 'Premium'];

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Notificaciones Push</h1>
            </header>

            <section className="px-6 pt-4 flex-1">
                <div className="bg-white rounded-[40px] p-8 shadow-md border border-gray-100">
                    <div className="mb-8">
                        <label className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest mb-3 block px-1">Segmento de Alumnos</label>
                        <div className="flex flex-wrap gap-2">
                            {groups.map(g => (
                                <button
                                    key={g}
                                    onClick={() => setSelectedGroup(g)}
                                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${selectedGroup === g
                                            ? 'bg-[#A07851] text-white shadow-md'
                                            : 'bg-[#FAF9F6] text-[#7F746D] border border-gray-100'
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest mb-3 block px-1">Mensaje de Notificación</label>
                        <input
                            type="text"
                            placeholder="Título del mensaje"
                            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-2xl py-4 px-5 mb-4 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm font-bold"
                        />
                        <textarea
                            rows={5}
                            placeholder="Escribe aquí el contenido de la notificación push..."
                            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-[28px] py-4 px-5 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm resize-none"
                        />
                    </div>

                    <div className="bg-[#FAF9F6] rounded-3xl p-5 border border-dashed border-[#A07851]/30 flex items-center gap-4 mb-8">
                        <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-[#A07851] shadow-sm">
                            <span className="material-symbols-outlined">schedule_send</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#3C3633]">Programar envío</p>
                            <p className="text-[10px] text-[#7F746D]">Deja listo tu mensaje para después</p>
                        </div>
                        <input type="checkbox" className="ml-auto w-10 text-[#A07851]" />
                    </div>

                    <button className="w-full btn-primary py-5 text-lg shadow-xl shadow-[#A07851]/30">
                        Enviar a {selectedGroup}
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>

                <div className="mt-10 px-4">
                    <h3 className="font-bold text-[#3C3633] mb-4">Últimos envíos</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'Nueva clase de Yin Yoga!', date: 'Ayer, 18:30', group: 'Todos' },
                            { title: 'Recordatorio Reto 30 días', date: 'Lun, 09:00', group: 'Reto 30' },
                        ].map((h, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-sm font-bold text-[#3C3633]">{h.title}</p>
                                    <p className="text-[10px] text-[#7F746D] uppercase font-bold tracking-tighter">{h.group} • {h.date}</p>
                                </div>
                                <span className="material-symbols-outlined text-[#94A684]">done_all</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoachNotificationsPush;
