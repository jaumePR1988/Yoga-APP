
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    onBack: () => void;
}

const AdminRetreatFinanceView: React.FC<Props> = ({ onBack }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Finanzas de Retiro</h1>
            </header>

            <section className="px-6 mb-8">
                <div className="bg-[#3C3633] rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Beneficio Neto Previsto</p>
                        <h2 className="text-5xl font-bold mb-4">$1,850.00</h2>
                        <div className="px-4 py-1.5 bg-[#94A684] text-white text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">security</span>
                            Meta {'>'} $300 OK
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 space-y-6">
                <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-[#3C3633] mb-6">Desglose de Costos</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-bold text-[#7F746D]">Alquiler Espacio</span>
                            <span className="text-sm font-bold text-[#3C3633]">$1,200.00</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-bold text-[#7F746D]">Staff / Cocina</span>
                            <span className="text-sm font-bold text-[#3C3633]">$850.00</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-bold text-[#7F746D]">Marketing / Ads</span>
                            <span className="text-sm font-bold text-[#3C3633]">$150.00</span>
                        </div>
                        <div className="flex justify-between items-center py-2 pt-4 border-t border-gray-50">
                            <span className="text-sm font-bold text-[#3C3633]">Total Costos Fijos</span>
                            <span className="text-sm font-bold text-[#D48C70]">$2,200.00</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-[#3C3633] mb-6">Cálculo por Participante</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-[#7F746D]">Precio Venta</span>
                            <span className="text-sm font-bold text-[#94A684]">$350.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-[#7F746D]">Costo Comida / Pax</span>
                            <span className="text-sm font-bold text-[#D48C70]">-$125.00</span>
                        </div>
                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                            <p className="text-xs font-bold text-[#3C3633]">Punto de Equilibrio (Break-even)</p>
                            <span className="px-3 py-1 bg-[#EFEDEA] rounded-lg text-sm font-bold">12 Pax</span>
                        </div>
                    </div>
                </div>

                <button className="w-full py-5 bg-[#A07851] text-white rounded-[24px] font-bold shadow-lg shadow-[#A07851]/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">description</span>
                    Exportar Informe Financiero
                </button>
            </section>
        </div>
    );
};

export default AdminRetreatFinanceView;
