
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, YogaClass } from '../types';
import { MOCK_CLASSES } from '../constants';

interface Props {
  user: User;
  currentView: string;
  setView: (v: string) => void;
}

const DashboardAdmin: React.FC<Props> = ({ user, currentView, setView }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="px-6 pt-12 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar || "https://picsum.photos/seed/admin/100/100"}
            className="size-14 rounded-full border-2 border-white shadow-sm"
            alt="Admin"
          />
          <div>
            <p className="text-[#D48C70] text-[10px] font-bold uppercase tracking-widest">Administración</p>
            <h2 className="text-2xl font-bold yoga-font text-[#3C3633]">{user.name}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3C3633] border border-gray-100 relative active:scale-95 transition-transform">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3C3633] border border-gray-100 relative active:scale-95 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-3 right-3 size-2.5 bg-[#D48C70] border-2 border-white rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Operational Stats */}
      <section className="px-6 mb-8">
        <div className="bg-[#3C3633] rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">monitoring</span>
          </div>

          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6 px-1">Resumen de Octubre</p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-4xl font-bold mb-1">6.8k</h3>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Ingresos Totales</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-1">142</h3>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Socios Activos</p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                <span className="text-xs font-bold text-white/80">+12% vs mes anterior</span>
              </div>
              <button onClick={() => setView('admin_finance')} className="text-[#A07851] text-xs font-bold uppercase tracking-widest bg-[#A07851]/10 px-4 py-2 rounded-xl">Detalles</button>
            </div>
          </div>
        </div>
      </section>

      {/* Management Grid */}
      <section className="px-6 pb-24">
        <h3 className="text-lg font-bold text-[#3C3633] mb-4 yoga-font px-1">Operaciones</h3>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setView('admin_classes')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group hover:bg-[#A07851]/5"
          >
            <div className="size-14 bg-[#A07851]/10 text-[#A07851] rounded-2xl flex items-center justify-center group-hover:bg-[#A07851] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">event_available</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Clases</span>
          </div>
          <div
            onClick={() => setView('admin_quotas')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group hover:bg-[#A07851]/5"
          >
            <div className="size-14 bg-[#94A684]/10 text-[#94A684] rounded-2xl flex items-center justify-center group-hover:bg-[#94A684] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">currency_exchange</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Cuotas</span>
          </div>
          <div
            onClick={() => setView('admin_retreats')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group hover:bg-[#A07851]/5"
          >
            <div className="size-14 bg-[#D48C70]/10 text-[#D48C70] rounded-2xl flex items-center justify-center group-hover:bg-[#D48C70] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">landscape</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Retiros</span>
          </div>
          <div
            onClick={() => setView('admin_comms')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group hover:bg-[#A07851]/5"
          >
            <div className="size-14 bg-[#3C3633]/10 text-[#3C3633] rounded-2xl flex items-center justify-center group-hover:bg-[#3C3633] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">campaign</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Mensajería</span>
          </div>
        </div>

        {/* Quick View Status */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-[#3C3633]">Estado de la Sala</h3>
            <span className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest">En tiempo real</span>
          </div>
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-[#3C3633]">Ocupación Hoy</p>
                <p className="text-xs font-bold text-[#A07851]">82%</p>
              </div>
              <div className="progress-container h-1.5 bg-gray-100">
                <div className="progress-bar w-[82%] h-full bg-[#A07851] rounded-full"></div>
              </div>
            </div>
            <div className="size-16 rounded-full border-4 border-[#A07851]/20 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#3C3633]">24</span>
              <span className="text-[7px] font-bold text-[#7F746D] uppercase tracking-tighter">Socios hoy</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
