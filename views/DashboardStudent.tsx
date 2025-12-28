import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, YogaClass } from '../types';
import { dbService } from '../src/services/dbService';
import { MOCK_CLASSES } from '../constants';
import StudentNavigation from '../components/StudentNavigation';

interface Props {
  user: User;
  onUpdateUser: (user: Partial<User>) => void;
  currentView: string;
  setView: (view: string) => void;
  pendingRating?: any;
  onRateClass?: (rating: number) => void;
}

const DashboardStudent: React.FC<Props> = ({ user, onUpdateUser, currentView, setView, pendingRating, onRateClass }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'schedule' | 'retreats' | 'profile'>('schedule');
  const [hoverRating, setHoverRating] = useState(0);

  // Mock Booked Classes State
  const [bookedClasses, setBookedClasses] = useState<any[]>([
    {
      id: 'mock-1',
      name: 'Vinyasa Flow Sunset',
      time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().replace(/T.*/, 'T20:00:00.000Z'), // 2 days from now
    }
  ]);

  const handleCancelBooking = (id: string) => {
    const classToCancel = bookedClasses.find(c => c.id === id);
    if (!classToCancel) return;

    const now = new Date();
    const classTime = new Date(classToCancel.time);
    const hoursDiff = (classTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    const isLateCancel = hoursDiff < 1;

    const message = isLateCancel
      ? '⚠️ Estás cancelando con menos de 1h de antelación. NO se te devolverá el crédito de la clase. ¿Seguro que quieres continuar?'
      : '¿Seguro que quieres liberar esta plaza? Se te devolverá el crédito.';

    if (confirm(message)) {
      setBookedClasses(prev => prev.filter(c => c.id !== id));

      // Only restore stats if NOT a late cancel
      if (!isLateCancel) {
        onUpdateUser({
          sessionsLeft: (user.sessionsLeft || 0) + 1,
          sessionsThisWeek: Math.max(0, (user.sessionsThisWeek || 0) - 1),
          sessionsThisMonth: Math.max(0, (user.sessionsThisMonth || 0) - 1)
        });
      }
    }
  };

  // Standard Schedule Logic for TODAY
  const getClassesForToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sun, 2=Tue, 4=Thu
    const classes: any[] = [];

    const setTime = (h: number, m: number) => {
      const d = new Date(today);
      d.setHours(h, m, 0, 0);
      return d.toISOString();
    };

    if (dayOfWeek === 2 || dayOfWeek === 4) { // Martes / Jueves
      const template = MOCK_CLASSES.find(c => c.type === 'Vinyasa') || MOCK_CLASSES[0];
      classes.push({
        ...template,
        id: `dash-std-${dayOfWeek}`,
        name: 'Vinyasa Flow Sunset',
        time: setTime(20, 0),
        duration: 60,
        status: 'Programada',
        bookedCount: dayOfWeek === 2 ? 8 : 10
      });
    }

    if (dayOfWeek === 0) { // Domingo
      const template = MOCK_CLASSES.find(c => c.type === 'Vinyasa') || MOCK_CLASSES[0];
      classes.push({
        ...template,
        id: `dash-std-${dayOfWeek}`,
        name: 'Morning Glory Yoga',
        time: setTime(9, 0),
        duration: 60,
        status: 'Programada',
        bookedCount: 5,
        capacity: 20
      });
    }
    return classes;
  };

  const todaysClasses = getClassesForToday();


  const handleBook = async (clsId: string) => {
    if (isBooking) return;
    setIsBooking(true);
    try {
      // Mock booking logic
      await dbService.bookClass(user.id, clsId);
      onUpdateUser({
        sessionsLeft: (user.sessionsLeft || 0) - 1,
        sessionsThisWeek: (user.sessionsThisWeek || 0) + 1,
        sessionsThisMonth: (user.sessionsThisMonth || 0) + 1
      });
      setBookingSuccess(clsId);
      setTimeout(() => setBookingSuccess(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBooking(false);
    }
  };

  // Mock a past booking pending rating
  // const [pendingRating, setPendingRating] = useState<any>({
  //   id: 'past-booking-1',
  //   className: 'Hatha Yoga Suave',
  //   time: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
  //   coach: 'Marc Rossi'
  // });

  const handleRateClass = (rating: number) => {
    // 1. "Save" the rating
    console.log(`Rated class ${pendingRating?.className} with ${rating} stars`);

    // 2. Mock update of class average (Visual feedback)
    // Find the class in todaysClasses if it exists, or just trigger a re-render/toast
    // For demo purposes, we'll update the first class in 'todaysClasses' to show the effect if user looks there,
    // or just show a success message.

    // In a real app this would PUT to /api/bookings/:id/rate and re-fetch classes.
    // Here we will just clear the pending rating to dismiss the card.
    // setPendingRating(null);
    // Use prop if available
    if (onRateClass) {
      onRateClass(rating);
      alert(`¡Gracias! Has valorado ${pendingRating?.className} con ${rating} estrellas.`);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200">

      {/* Header */}
      <header className="relative z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-safe-top">
        <div className="flex items-center justify-between p-5 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-primary"
                style={{ backgroundImage: `url("${user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXs5DD1eaORmEQ2UzrjTr64R3ExnFRZ_9DeXxSVJbTav660kzY2G9pilOdGrhYYICUlNeUP4-YpCA_9n4qmYK_mIzG__DM36Bjo5Cd1RYMNAVC0ZEUV58H0C4jlU2Gx4TiV-0_2LdmkpSqSYyggaRQpq4niCpx0UJhiFQXRr8Zug9t3Zw4ObKIbucxAjWTnL4G4CkktJv7vPVLh-QkOwhpvXslDrz2EC2fKaEqZ3nteeVKvyonOLUshwuCjYV28ibLwNpEf5KZ92eE'}")` }}
              >
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
            </div>
            <div>
              <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-medium">Bienvenida de nuevo</p>
              <h2 className="text-xl font-bold leading-tight">Namaste, {user.name.split(' ')[0]} 🌿</h2>
            </div>
          </div>
          <button
            onClick={() => setView('notifications')}
            className="relative flex items-center justify-center size-10 rounded-full bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {/* Show red dot if there is a pending rating (using the local pendingRating state to simulate) */}
            {pendingRating && <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>}
          </button>
        </div>

        {/* Rate Last Class Card (Pending Rating) */}
        {pendingRating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-5 mb-4 p-4 rounded-2xl bg-white dark:bg-[#2C2623] shadow-lg border border-[#e6decb]/50 dark:border-gray-700 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#A17A57]"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#A17A57] uppercase tracking-wider mb-1">Tu última clase</p>
                <h3 className="font-bold text-lg text-[#292524] dark:text-white leading-tight">¿Qué tal fue {pendingRating.className}?</h3>
                <p className="text-sm text-[#57534e] dark:text-gray-400 mt-0.5">con {pendingRating.coach}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 justify-center bg-[#f5f0eb] dark:bg-gray-800/50 rounded-xl p-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRateClass(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-3xl transition-all focus:outline-none hover:scale-110 
                    ${star <= hoverRating ? 'text-[#A17A57]' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Calendar Strip - Single Day (Today) + Quote */}
        <div className="px-5 py-4 flex items-center gap-4">
          <div className="flex flex-col h-16 w-16 shrink-0 items-center justify-center gap-1 rounded-2xl bg-primary shadow-lg shadow-primary/30 cursor-default">
            <p className="text-white text-xs font-medium capitalize">
              {new Date().toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}
            </p>
            <p className="text-white text-lg font-bold">
              {new Date().getDate()}
            </p>
          </div>

          <div className="flex-1 text-center flex items-center justify-center">
            <p className="font-display italic text-lg leading-snug text-[#57534e] dark:text-[#d6d3d1]">
              "El yoga es el viaje del ser, a través del ser y hacia el ser."
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pb-24 overflow-y-auto hide-scrollbar no-scrollbar">
        {/* Monthly Progress */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#CD9B5E] to-[#A67C48] p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <span className="material-symbols-outlined text-[150px]">spa</span>
          </div>
          <div className="relative z-10">
            {(() => {
              // Logic for Monthly Progress
              const today = new Date();
              const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

              const weeklyLimit = user.quotaType === 'Bonsai' ? 2 : (user.quotaType === 'Bambú' ? 3 : 0);
              // Calculate estimated max classes for the month based on weekly limit
              // Approximation: (Days / 7) * limit
              const maxMonthlyClasses = weeklyLimit > 0 ? Math.round((daysInMonth / 7) * weeklyLimit) : 0;

              const currentMonthlySessions = user.sessionsThisMonth || user.sessionsThisWeek || 0; // Fallback to week if month misses
              const progressPct = maxMonthlyClasses > 0 ? Math.min(100, (currentMonthlySessions / maxMonthlyClasses) * 100) : 0;

              return (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Tu progreso mensual</p>
                      <h3 className="text-2xl font-bold mt-1">{currentMonthlySessions} de {maxMonthlyClasses} Clases</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                      <span className="material-symbols-outlined text-white">trending_up</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <span className="text-xs font-bold">{Math.round(progressPct)}%</span>
                  </div>
                  <p className="text-xs text-white/90 mt-2">
                    {weeklyLimit > 0
                      ? `Límite semanal: ${weeklyLimit} clases (${user.quotaType})`
                      : 'Sin límite establecido'}
                  </p>
                </>
              );
            })()}
          </div>
        </div>





        {/* Explore Section */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-bold tracking-tight mb-4">Explora</h2>

          <div className="flex flex-col gap-6">
            {/* Instructors Widget - Instructor of the Month/Week */}
            <div className="relative w-full h-80 rounded-[32px] overflow-hidden group shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop")' }} // Elena G. (Yoga Portrait)
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  Instructor Destacado
                </div>
                <h3 className="text-2xl font-bold leading-tight mb-2">Elena G.</h3>
                <p className="font-display italic text-lg leading-snug opacity-90">
                  "El yoga no trata de tocarse los pies, trata de lo que aprendes en el camino."
                </p>
              </div>
            </div>

            {/* Admin Visual Reels */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-bold text-[#292524] dark:text-white">Momentos Namasté</h3>
                <span className="text-xs text-primary font-bold cursor-pointer hover:underline">Ver todo</span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 px-1 hide-scrollbar snap-x snap-mandatory">
                {[
                  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400", // Group class (Reused Login BG - 100% works)
                  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=400", // Retreat (Kept)
                  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400", // Meditation (Kept)
                  "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=400"  // Studio/Mat (Classic Yoga)
                ].map((img, i) => (
                  <div key={i} className="snap-center shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-md group relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Momento ${i}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <StudentNavigation currentView={currentView} setView={setView} />
    </div>
  );
};

export default DashboardStudent;
