
import React from 'react';
import { MOCK_CLASSES } from '../constants.tsx';

interface Props {
  currentView: string;
  setView: (v: string) => void;
}

const DashboardStudent: React.FC<Props> = ({ currentView, setView }) => {
  return (
    <div className="flex flex-col gap-6 pt-12">
      <header className="px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/sofia/100/100" className="size-12 rounded-full border-2 border-primary" alt="Avatar" />
          <div>
            <p className="text-stone-400 text-xs font-medium">Bienvenida de nuevo</p>
            <h2 className="text-xl font-bold leading-tight">Namaste, Sofia 🌿</h2>
          </div>
        </div>
        <button className="size-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
        </button>
      </header>

      <section className="px-6">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <span className="material-symbols-outlined absolute right-[-20px] top-[-20px] text-[150px] opacity-10">spa</span>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium">Tu progreso semanal</p>
            <h3 className="text-2xl font-bold mt-1">3 Clases</h3>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4 rounded-full"></div>
              </div>
              <span className="text-xs font-bold">75%</span>
            </div>
            <p className="text-xs text-white/90 mt-2 italic">¡Genial! Estás cerca de tu meta.</p>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Clases de Hoy</h2>
          <button className="text-primary text-sm font-bold">Ver todo</button>
        </div>
        <div className="space-y-4">
          {MOCK_CLASSES.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl p-3 shadow-sm border border-stone-100 flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={`https://picsum.photos/seed/${cls.id}/200/200`} className="w-full h-full object-cover" alt={cls.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-md">{cls.type}</span>
                    <span className="text-xs text-stone-400 font-medium">{cls.duration} min</span>
                  </div>
                  <h3 className="font-bold text-stone-900 mt-1">{cls.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{cls.time} • {cls.coach}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                   <button className="text-xs font-bold px-4 py-1.5 bg-primary text-white rounded-lg shadow-sm">Reservar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-4">
        <h2 className="text-lg font-bold mb-4">Explora</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-bamboo-mid/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors">
            <div className="size-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-3xl">self_improvement</span>
            </div>
            <span className="font-bold text-sm">Instructores</span>
          </div>
          <div className="aspect-square bg-bamboo-mid/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors">
            <div className="size-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-3xl">video_library</span>
            </div>
            <span className="font-bold text-sm">Videos</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardStudent;
