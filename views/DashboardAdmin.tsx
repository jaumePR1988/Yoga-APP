
import React from 'react';
import { MOCK_FINANCES, MOCK_RETIREES } from '../constants.tsx';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid, Tooltip } from 'recharts';

interface Props {
  currentView: string;
  setView: (v: string) => void;
}

const DashboardAdmin: React.FC<Props> = ({ currentView, setView }) => {
  const chartData = [
    { name: 'May', ingresos: 4000, gastos: 2400 },
    { name: 'Jun', ingresos: 3000, gastos: 1398 },
    { name: 'Jul', ingresos: 2000, gastos: 9800 },
    { name: 'Ago', ingresos: 2780, gastos: 3908 },
    { name: 'Sep', ingresos: 1890, gastos: 4800 },
    { name: 'Oct', ingresos: 2390, gastos: 3800 },
  ];

  if (currentView === 'finances') {
    return (
      <div className="flex flex-col gap-6 pt-12 px-6">
        <h1 className="text-2xl font-bold">Finanzas Globales</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
            <span className="text-xs font-bold text-stone-400 uppercase">Ingresos Oct</span>
            <p className="text-2xl font-bold text-green-600 mt-1">$6.8k</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
            <span className="text-xs font-bold text-stone-400 uppercase">Gastos Oct</span>
            <p className="text-2xl font-bold text-red-600 mt-1">$2.5k</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm h-64">
          <h3 className="text-sm font-bold mb-4">Resumen Semestral</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <Bar dataKey="ingresos" fill="#A67C52" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gastos" fill="#E8E0CC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Movimientos Recientes</h3>
          {MOCK_FINANCES.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-stone-50">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center ${item.type === 'INGRESO' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.type === 'INGRESO' ? 'arrow_downward' : 'arrow_upward'}</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[10px] text-stone-400 uppercase">{item.date}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${item.type === 'INGRESO' ? 'text-green-600' : 'text-red-600'}`}>
                {item.type === 'INGRESO' ? '+' : '-'}${item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'retreats') {
    return (
      <div className="flex flex-col gap-6 pt-12 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Retiros</h1>
          <button className="bg-primary text-white p-2 rounded-full shadow-lg">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <div className="space-y-6">
          {MOCK_RETIREES.map(r => (
            <div key={r.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-stone-100">
              <div className="h-40 relative">
                <img src={`https://picsum.photos/seed/${r.id}/600/300`} className="w-full h-full object-cover" alt={r.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{r.name}</h3>
                  <p className="text-xs opacity-90">{r.location}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                  {r.enrolled}/{r.capacity} Pax
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase">Estado</p>
                  <span className={`text-xs font-bold ${r.status === 'Activo' ? 'text-green-600' : 'text-stone-400'}`}>{r.status}</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-bold text-stone-500 bg-stone-100 px-4 py-2 rounded-xl">Editar</button>
                  <button className="text-xs font-bold text-white bg-primary-dark px-4 py-2 rounded-xl">Gestionar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-bamboo-mid/10 p-6 rounded-3xl border border-dashed border-primary/30 text-center">
           <span className="material-symbols-outlined text-4xl text-primary/50 mb-2">room_service</span>
           <h4 className="font-bold text-stone-600">Visualizador de Habitaciones</h4>
           <p className="text-xs text-stone-400 mt-2">Próximamente: Gráfico interactivo de distribución de camas y participantes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-12 px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/admin/100/100" className="size-12 rounded-full border-2 border-primary" alt="Admin" />
          <div>
            <h1 className="text-xl font-bold">Hola, Admin</h1>
            <p className="text-xs text-stone-400">Control total del estudio</p>
          </div>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined text-stone-600">notifications</span>
          <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></span>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center gap-2 group cursor-pointer hover:border-primary transition-colors">
          <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">add_circle</span>
          </div>
          <span className="text-sm font-bold">Crear Clase</span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center gap-2 group cursor-pointer hover:border-primary transition-colors">
          <div className="size-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">manage_accounts</span>
          </div>
          <span className="text-sm font-bold">Usuarios</span>
        </div>
      </section>

      <section className="bg-primary/5 p-5 rounded-3xl border border-primary/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Ocupación Hoy</h3>
          <span className="text-xs font-bold text-primary">82% Capacidad</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-green-500"></div>
            <div className="flex-1 text-xs font-bold">Mañana: Vinyasa Flow</div>
            <div className="text-[10px] text-stone-400">12/12 Lleno</div>
          </div>
          <div className="flex items-center gap-3 text-stone-400">
            <div className="size-2 rounded-full bg-stone-200"></div>
            <div className="flex-1 text-xs font-bold">Tarde: Hatha Relax</div>
            <div className="text-[10px]">8/15 Disponible</div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Atajos Rápidos</h3>
        <button onClick={() => setView('finances')} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-400">insights</span>
            <span className="text-sm font-bold">Análisis Financiero</span>
          </div>
          <span className="material-symbols-outlined text-stone-300">chevron_right</span>
        </button>
        <button onClick={() => setView('retreats')} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-400">landscape</span>
            <span className="text-sm font-bold">Próximos Retiros</span>
          </div>
          <span className="material-symbols-outlined text-stone-300">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardAdmin;
