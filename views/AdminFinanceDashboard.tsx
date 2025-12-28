
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MOCK_FINANCES } from '../constants.tsx';

interface Props {
    onBack: () => void;
}

const AdminFinanceDashboard: React.FC<Props> = ({ onBack }) => {
    const chartData = [
        { name: 'May', ingresos: 4000, gastos: 2400 },
        { name: 'Jun', ingresos: 3000, gastos: 1398 },
        { name: 'Jul', ingresos: 2000, gastos: 9800 },
        { name: 'Ago', ingresos: 2780, gastos: 3908 },
        { name: 'Sep', ingresos: 1890, gastos: 4800 },
        { name: 'Oct', ingresos: 6800, gastos: 2500 },
    ];

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
                    <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Finanzas</h1>
                </div>
                <button className="text-[#A07851] text-sm font-bold flex items-center gap-1 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                    PDF
                </button>
            </header>

            <section className="px-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest block mb-2 px-1">Ingresos Oct</span>
                        <h3 className="text-3xl font-bold text-[#94A684]">$6.8k</h3>
                        <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-[#94A684]">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            +12% vs Sep
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest block mb-2 px-1">Gastos Oct</span>
                        <h3 className="text-3xl font-bold text-[#D48C70]">$2.5k</h3>
                        <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-[#D48C70]">
                            <span className="material-symbols-outlined text-xs">trending_down</span>
                            -3% vs Sep
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 mb-8">
                <div className="bg-white rounded-[40px] p-8 shadow-md border border-gray-100 h-80">
                    <div className="flex justify-between items-center mb-8 px-1">
                        <h3 className="font-bold text-[#3C3633]">Evolución Semestral</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full bg-[#A07851]"></div>
                                <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-tighter">Ingresos</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full bg-[#E8E0CC]"></div>
                                <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-tighter">Gastos</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="70%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#FAF9F6' }}
                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontSize: '10px' }}
                            />
                            <Bar dataKey="ingresos" fill="#A07851" radius={[6, 6, 0, 0]} barSize={20} />
                            <Bar dataKey="gastos" fill="#E8E0CC" radius={[6, 6, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="px-6 pb-24">
                <h3 className="font-bold text-[#3C3633] mb-4 px-1">Movimientos Recientes</h3>
                <div className="space-y-3">
                    {MOCK_FINANCES.map((f, i) => (
                        <motion.div
                            key={f.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[28px] p-4 flex items-center justify-between border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-2xl flex items-center justify-center ${f.type === 'INGRESO' ? 'bg-[#94A684]/10 text-[#94A684]' : 'bg-[#D48C70]/10 text-[#D48C70]'
                                    }`}>
                                    <span className="material-symbols-outlined text-2xl">
                                        {f.type === 'INGRESO' ? 'add_circle' : 'do_not_disturb_on'}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#3C3633]">{f.description}</h4>
                                    <p className="text-[10px] text-[#7F746D] font-bold uppercase tracking-wider">{f.date} • {f.category}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${f.type === 'INGRESO' ? 'text-[#94A684]' : 'text-[#D48C70]'
                                }`}>
                                {f.type === 'INGRESO' ? '+' : '-'}${f.amount}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminFinanceDashboard;
