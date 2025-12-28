
import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_RETIREES } from '../constants.tsx';

interface Props {
    onBack: () => void;
    setView: (v: string) => void;
}

const AdminRetreatsList: React.FC<Props> = ({ onBack, setView }) => {
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
                    <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Retiros</h1>
                </div>
                <button className="size-12 bg-[#3C3633] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <section className="px-6 pb-24">
                <div className="flex items-center justify-between mb-6 px-1">
                    <h3 className="font-bold text-[#3C3633]">Próximos Eventos</h3>
                    <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest">{MOCK_RETIREES.length} Activos</span>
                </div>

                <div className="space-y-8">
                    {MOCK_RETIREES.map((r, i) => (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[40px] overflow-hidden shadow-md border border-gray-100"
                        >
                            <div className="h-48 relative">
                                <img src={`https://picsum.photos/seed/${r.id}/600/400`} className="w-full h-full object-cover" alt={r.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {r.status}
                                </div>
                                <div className="absolute bottom-4 left-6 text-white">
                                    <h4 className="text-2xl font-bold yoga-font">{r.title}</h4>
                                    <p className="text-white/80 text-xs font-semibold">{r.location}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#A07851] text-lg">calendar_month</span>
                                        <span className="text-xs font-bold text-[#3C3633]">{r.startDate} - {r.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#94A684] text-lg">groups</span>
                                        <span className="text-xs font-bold text-[#3C3633]">{r.enrolledCount}/{r.capacity} Pax</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setView(`retreat_detail_${r.id}`)}
                                        className="flex-1 btn-primary py-4 text-sm"
                                    >
                                        Gestionar
                                    </button>
                                    <button className="size-14 bg-[#FAF9F6] text-[#7F746D] rounded-[20px] flex items-center justify-center border border-gray-100 active:scale-95 transition-transform">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminRetreatsList;
