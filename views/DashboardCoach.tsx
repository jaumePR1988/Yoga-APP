
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_STUDENTS } from '../constants.tsx';
import { User, YogaClass } from '../types';
import { dbService } from '../src/services/dbService';

interface Props {
  user: User;
  currentView: string;
  setView: (v: string) => void;
}

const DashboardCoach: React.FC<Props> = ({ user, currentView, setView }) => {
  const [isClassStarted, setIsClassStarted] = useState(false);
  const [checkedStudents, setCheckedStudents] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded for the prototype
  const nextClass = {
    title: 'Vinyasa Flow Intense',
    time: '10:00 AM',
    room: 'Sala Bambú',
    enrolled: 12,
    capacity: 15,
    level: 'Intermedio'
  };

  const handleStartClass = async () => {
    setLoading(true);
    try {
      // await dbService.updateClassStatus('1', 'En Curso');
      setIsClassStarted(true);
      setNotification("¡Clase iniciada! Los alumnos ahora pueden marcar asistencia.");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="px-6 pt-12 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar || "https://picsum.photos/seed/coach/100/100"}
              className="size-14 rounded-full border-2 border-white shadow-sm"
              alt="Coach"
            />
            <div className="absolute -bottom-1 -right-1 size-4 bg-[#A07851] border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-[#A07851] text-[10px] font-bold uppercase tracking-widest">Panel Coach</p>
            <h2 className="text-2xl font-bold yoga-font text-[#3C3633]">{user.name}</h2>
          </div>
        </div>
        <button className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3C3633] border border-gray-100 relative active:scale-95 transition-transform">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-3 right-3 size-2.5 bg-[#D48C70] border-2 border-white rounded-full"></span>
        </button>
      </header>

      {/* Stats Grid */}
      <section className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-[#3C3633]">124</span>
            <p className="text-[9px] text-[#7F746D] font-bold uppercase mt-1 tracking-tighter">Alumnos</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-[#3C3633]">3</span>
            <p className="text-[9px] text-[#7F746D] font-bold uppercase mt-1 tracking-tighter">Retos Act.</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
            <span className="text-2xl font-bold text-[#A07851]">4</span>
            <p className="text-[9px] text-[#7F746D] font-bold uppercase mt-1 tracking-tighter">Clases Hoy</p>
          </div>
        </div>
      </section>

      {/* Next Class Focus Card */}
      <section className="px-6 mb-8">
        <h3 className="text-lg font-bold text-[#3C3633] mb-4 yoga-font px-1">Tu próxima clase</h3>
        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-md">
          <div className="h-44 relative">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Next Class" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] text-white font-bold uppercase tracking-widest border border-white/30">
              {nextClass.room}
            </div>
            <div className="absolute bottom-4 left-5 text-white">
              <h4 className="text-xl font-bold">{nextClass.title}</h4>
              <p className="text-white/80 text-xs font-semibold">{nextClass.level} • {nextClass.time}</p>
            </div>
            <div className="absolute bottom-4 right-5 bg-white rounded-2xl p-2 px-3 text-center shadow-lg">
              <span className="text-sm font-bold text-[#A07851] leading-none">{nextClass.enrolled}/{nextClass.capacity}</span>
              <p className="text-[8px] text-[#7F746D] font-bold uppercase tracking-tighter leading-none">Inscritos</p>
            </div>
          </div>
          <div className="p-6">
            <button
              onClick={handleStartClass}
              disabled={isClassStarted || loading}
              className={`w-full py-4 rounded-[20px] font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isClassStarted
                  ? 'bg-[#94A684] text-white shadow-none cursor-default'
                  : 'bg-[#A07851] text-white shadow-lg shadow-[#A07851]/20'
                }`}
            >
              {isClassStarted ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Clase en Curso
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  Iniciar Sesión
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="px-6 pb-24">
        <h3 className="text-lg font-bold text-[#3C3633] mb-4 yoga-font px-1">Gestión Rápida</h3>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setView('coach_students')}
            className="bg-[#EFEDEA] rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:bg-[#A07851] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Alumnos</span>
          </div>
          <div
            onClick={() => setView('coach_challenges')}
            className="bg-[#EFEDEA] rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:bg-[#A07851] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Retos</span>
          </div>
          <div
            onClick={() => setView('coach_push')}
            className="bg-[#EFEDEA] rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:bg-[#A07851] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">send</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Push Notif.</span>
          </div>
          <div
            onClick={() => setView('coach_schedule')}
            className="bg-[#EFEDEA] rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:bg-[#A07851] group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">calendar_month</span>
            </div>
            <span className="font-bold text-sm text-[#3C3633]">Mi Agenda</span>
          </div>
        </div>
      </section>

      {/* Global Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 right-6 bg-[#3C3633] text-white text-xs font-bold py-4 px-6 rounded-2xl shadow-2xl z-[100] flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardCoach;
