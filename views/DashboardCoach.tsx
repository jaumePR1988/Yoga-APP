
import React from 'react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '../constants.tsx';

interface Props {
  currentView: string;
  setView: (v: string) => void;
}

const DashboardCoach: React.FC<Props> = ({ currentView, setView }) => {
  return (
    <div className="flex flex-col gap-6 pt-12">
      <header className="px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/coach/100/100" className="size-12 rounded-full border-2 border-primary-dark" alt="Coach" />
          <div>
            <p className="text-stone-400 text-xs font-medium uppercase tracking-widest">Namaste</p>
            <h2 className="text-xl font-bold leading-tight">Elena Rivera</h2>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center text-stone-600">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <section className="px-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-stone-900">124</span>
            <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">Alumnos</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-stone-900">3</span>
            <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">Retos</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-stone-900">4</span>
            <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">Hoy</p>
          </div>
        </div>
      </section>

      <section className="px-6">
        <h3 className="text-lg font-bold mb-4">Siguiente Clase</h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-md">
          <div className="h-40 relative">
            <img src="https://picsum.photos/seed/yoga-next/400/200" className="w-full h-full object-cover" alt="Class" />
            <div className="absolute top-2 left-2 bg-stone-900/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold">Sala Bambú</div>
            <div className="absolute bottom-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-[10px] font-bold">En 30 min</div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold">Vinyasa Flow</h4>
                <p className="text-stone-500 text-sm">Intermedio • 10:00 AM</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">12/15</span>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Inscritos</p>
              </div>
            </div>
            <button className="w-full py-3 bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary-dark/20 active:scale-[0.98] transition-transform">
              Iniciar Clase
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Alumnos Inscritos</h3>
          <button className="text-primary text-xs font-bold">Exportar Lista</button>
        </div>
        <div className="space-y-3">
          {MOCK_STUDENTS.map(student => (
            <div key={student.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-100 shadow-sm">
              <img src={student.avatar} className="size-10 rounded-full" alt={student.name} />
              <div className="flex-1">
                <h4 className="text-sm font-bold">{student.name}</h4>
                <p className="text-[10px] text-stone-400 font-medium">{student.quotaType} • Al día</p>
              </div>
              <button className="size-8 rounded-full bg-stone-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              </button>
              <button className="text-[10px] font-bold px-3 py-1.5 bg-primary/10 text-primary rounded-lg">Check-in</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardCoach;
