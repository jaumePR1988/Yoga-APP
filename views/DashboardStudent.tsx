
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CLASSES } from '../constants.tsx';
import { User, YogaClass } from '../types';
import { dbService } from '../src/services/dbService';

interface Props {
  user: User;
  onUpdateUser: (u: Partial<User>) => void;
  currentView: string;
  setView: (v: string) => void;
}

const DashboardStudent: React.FC<Props> = ({ user, onUpdateUser, currentView, setView }) => {
  const [classes] = useState<YogaClass[]>(MOCK_CLASSES);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const days = [
    { day: 'Lun', date: 12, active: true },
    { day: 'Mar', date: 13 },
    { day: 'Mié', date: 14 },
    { day: 'Jue', date: 15 },
    { day: 'Vie', date: 16 },
    { day: 'Sáb', date: 17 },
  ];

  const handleBook = async (cls: YogaClass) => {
    if (isBooking) return;
    setIsBooking(true);
    setBookingError(null);

    try {
      await dbService.bookClass(user.id, cls.id);
      onUpdateUser({
        sessionsLeft: (user.sessionsLeft || 0) - 1,
        sessionsThisWeek: (user.sessionsThisWeek || 0) + 1
      });
      setBookingSuccess(cls.id);
      setTimeout(() => setBookingSuccess(null), 3000);
    } catch (err: any) {
      setBookingError(err.toString());
      setTimeout(() => setBookingError(null), 4000);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="px-6 pt-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar || `https://picsum.photos/seed/${user.name}/100/100`}
              className="size-14 rounded-full border-2 border-white shadow-sm"
              alt="Avatar"
            />
            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-[#7F746D] text-xs font-medium">Bienvenida de nuevo</p>
            <h2 className="text-2xl font-bold yoga-font text-[#3C3633]">Namaste, {user.name.split(' ')[0]} 🌿</h2>
          </div>
        </div>
        <button className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3C3633] border border-gray-100 relative active:scale-95 transition-transform">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-3 right-3 size-2.5 bg-[#D48C70] border-2 border-white rounded-full"></span>
        </button>
      </header>

      {/* Calendar Strip */}
      <section className="px-6 mb-8">
        <div className="flex justify-between items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {days.map((d, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center min-w-[54px] h-[72px] rounded-2xl transition-all ${d.active
                  ? 'bg-[#A07851] text-white shadow-lg shadow-[#A07851]/20'
                  : 'bg-white text-[#7F746D] border border-gray-100 shadow-sm'
                }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider mb-1">{d.day}</span>
              <span className="text-xl font-bold">{d.date}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Card */}
      <section className="px-6 mb-8">
        <div className="relative rounded-[32px] p-6 text-white shadow-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #A07851 0%, #7D5D3F 100%)' }}>
          {/* Abstract leaf decoration */}
          <div className="absolute top-[-20px] right-[-20px] opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[180px]">spa</span>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Tu progreso semanal</p>
                <h3 className="text-3xl font-bold">{user.sessionsThisWeek || 0} Clases</h3>
              </div>
              <div className="size-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">trending_up</span>
              </div>
            </div>

            <div className="progress-container mb-2 bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((user.sessionsThisWeek || 0) / (user.weeklyGoal || 4)) * 100}%` }}
                className="progress-bar bg-white h-full rounded-full"
              ></motion.div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-white/90 font-medium">¡Genial! Estás cerca de tu meta.</p>
              <span className="text-xs font-bold">{Math.min(100, Math.round(((user.sessionsThisWeek || 0) / (user.weeklyGoal || 4)) * 100))}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Classes List */}
      <section className="px-6 mb-24 flex-1">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-bold text-[#3C3633] yoga-font">Clases de Hoy</h2>
          <button className="text-[#A07851] text-sm font-bold">Ver todo</button>
        </div>

        <div className="space-y-4">
          {classes.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card flex gap-4 p-4 items-center"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative group">
                <img
                  src={`https://picsum.photos/seed/${cls.id}/300/300`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={cls.name}
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[10px] text-yellow-500 fill-1">star</span>
                  <span className="text-[10px] font-bold text-[#3C3633]">4.8</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-[#A07851] bg-[#A07851]/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {cls.status === 'Confirmada' ? 'Confirmada' : 'Disponible'}
                  </span>
                  <span className="text-[10px] font-bold text-[#7F746D] px-1">{cls.duration} min</span>
                </div>
                <h3 className="font-bold text-[#3C3633] truncate mb-1">{cls.name}</h3>
                <div className="flex items-center gap-1 text-[11px] text-[#7F746D]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>{cls.time.includes('T') ? cls.time.split('T')[1].substring(0, 5) : cls.time} • {cls.coachName}</span>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleBook(cls)}
                    disabled={bookingSuccess === cls.id || cls.bookedCount >= cls.capacity}
                    className={`text-xs font-bold px-5 py-2 rounded-xl transition-all ${bookingSuccess === cls.id
                        ? 'bg-[#E8E0CC] text-[#A07851] cursor-default'
                        : cls.bookedCount >= cls.capacity
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#A07851] text-white hover:bg-[#7D5D3F] active:scale-95'
                      }`}
                  >
                    {bookingSuccess === cls.id ? 'Confirmada' : 'Reservar'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Section */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl font-bold text-[#3C3633] yoga-font mb-4 px-1">Explora</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#EFEDEA] rounded-[28px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group">
              <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl">self_improvement</span>
              </div>
              <span className="font-bold text-sm text-[#3C3633]">Instructores</span>
            </div>
            <div className="bg-[#EFEDEA] rounded-[28px] p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer group">
              <div className="size-14 bg-white rounded-full flex items-center justify-center text-[#A07851] shadow-sm border border-white/50 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl">video_library</span>
              </div>
              <span className="font-bold text-sm text-[#3C3633]">Videos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nav Placeholder (would usually be in App.tsx) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex items-center justify-between z-40 rounded-t-[32px] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => setView('home')} className="flex flex-col items-center gap-1 text-[#A07851]">
          <span className="material-symbols-outlined fill-1">home</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button onClick={() => setView('schedule')} className="flex flex-col items-center gap-1 text-[#7F746D]">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-bold">Agenda</span>
        </button>

        <div className="relative -top-3">
          <button className="size-14 bg-[#A07851] rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>

        <button onClick={() => setView('favorites')} className="flex flex-col items-center gap-1 text-[#7F746D]">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] font-bold">Favoritos</span>
        </button>
        <button onClick={() => setView('profile')} className="flex flex-col items-center gap-1 text-[#7F746D]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardStudent;
