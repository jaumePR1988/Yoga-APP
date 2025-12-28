import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StudentNavigation from '../components/StudentNavigation';
import { YogaClass } from '../types';
import { MOCK_CLASSES } from '../constants';

interface Props {
    currentView: string;
    setView: (view: string) => void;
    pendingRating?: any;
    bookedClassIds?: string[];
    onCancelBooking?: (id: string) => void;
}

const ScheduleView: React.FC<Props> = ({ currentView, setView, pendingRating, bookedClassIds = [], onCancelBooking }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Week State
    // Default to current week
    // 0 = Current Week, 1 = Next Week
    const [viewingWeek, setViewingWeek] = useState(0);

    const bookedClassesList = MOCK_CLASSES.filter(c => bookedClassIds.includes(c.id));

    // Unlock Status Calculation
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();
    // Unlock next week if it's Sunday (0) OR Saturday (6) >= 20h
    const nextWeekUnlocked = day === 0 || (day === 6 && hour >= 20);

    // Get current week days (Mon-Fri for this view to match design slots)
    const getWeekDays = () => {
        const today = new Date();
        const currentDay = today.getDay(); // 0=Sun, 1=Mon...
        const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
        const monday = new Date(today);
        monday.setDate(today.getDate() + distanceToMonday);

        // Apply Offset for Next Week
        if (viewingWeek === 'next') {
            monday.setDate(monday.getDate() + 7);
        }

        const weekDays = [];
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        for (let i = 0; i < 7; i++) { // Generating 7 days (Mon-Sun)
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            weekDays.push({
                name: dayNames[d.getDay()],
                num: d.getDate().toString(),
                date: d,
                active: d.toDateString() === selectedDate.toDateString()
            });
        }
        return weekDays;
    };

    const days = getWeekDays();

    // Standard Schedule Logic (Mocked "Admin" Definitions)
    // Martes (2) & Jueves (4): 20:00 - 21:00
    // Domingo (0): 09:00 - 10:00
    const getClassesForDate = (date: Date) => {
        const dayOfWeek = date.getDay();
        const classes: any[] = [];

        // Helper to set time
        const setTime = (h: number, m: number) => {
            const newDate = new Date(date);
            newDate.setHours(h, m, 0, 0);
            return newDate.toISOString();
        };

        if (dayOfWeek === 2 || dayOfWeek === 4) { // Martes / Jueves
            const template = MOCK_CLASSES.find(c => c.type === 'Vinyasa') || MOCK_CLASSES[0];
            classes.push({
                ...template,
                id: `std-${dayOfWeek}-${date.getDate()}`, // Unique-ish ID
                name: 'Vinyasa Flow Sunset',
                time: setTime(20, 0),
                duration: 60,
                status: 'Programada',
                bookedCount: dayOfWeek === 2 ? 8 : 10 // Randomize slightly
            });
        }

        if (dayOfWeek === 0) { // Domingo
            const template = MOCK_CLASSES.find(c => c.type === 'Vinyasa') || MOCK_CLASSES[0];
            classes.push({
                ...template,
                id: `std-${dayOfWeek}-${date.getDate()}`,
                name: 'Morning Glory Yoga',
                time: setTime(9, 0),
                duration: 60,
                status: 'Programada',
                bookedCount: 5,
                capacity: 20 // Sundays might have more capacity?
            });
        }

        return classes;
    };

    const scheduledClasses = getClassesForDate(selectedDate);



    return (
        <div className="w-full max-w-md mx-auto bg-[#F9F7F2] dark:bg-[#1C1917] min-h-screen shadow-2xl relative flex flex-col overflow-hidden font-display text-[#292524] dark:text-[#EAE0D5] transition-colors duration-200">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-[#fcfaf8]/95 dark:bg-[#1c1917]/95 backdrop-blur-md border-b border-[#e6decb] dark:border-gray-800 transition-all duration-300 pt-safe-top">
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-[26px] font-extrabold tracking-tight">Calendario</h1>
                        {/* Week Navigation Arrow */}
                        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700 ml-2">
                            <button
                                onClick={() => {
                                    setViewingWeek('current');
                                    // Reset to Monday of current week
                                    const today = new Date();
                                    const currentDay = today.getDay(); // 0=Sun, 1=Mon...
                                    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
                                    const monday = new Date(today);
                                    monday.setDate(today.getDate() + distanceToMonday);
                                    setSelectedDate(monday);
                                }}
                                className={`p-1 rounded-md transition-colors ${viewingWeek === 'current' ? 'bg-[#F9F7F2] text-black' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button
                                onClick={() => {
                                    if (nextWeekUnlocked) {
                                        setViewingWeek('next');
                                        // Auto-select Monday of next week
                                        // We know 'days' currently holds THIS week's days if we are in 'current'
                                        // So days[0].date is this week's Monday.
                                        const thisWeekMonday = days[0].date;
                                        const nextMon = new Date(thisWeekMonday);
                                        nextMon.setDate(nextMon.getDate() + 7);
                                        setSelectedDate(nextMon);
                                    }
                                }}
                                disabled={!nextWeekUnlocked}
                                className={`p-1 rounded-md transition-colors ${viewingWeek === 'next' ? 'bg-[#F9F7F2] text-black' : (nextWeekUnlocked ? 'text-gray-400 hover:text-gray-600' : 'text-gray-200 cursor-not-allowed')}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('notifications')}
                            className="relative p-2 rounded-full hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined">notifications</span>
                            {pendingRating && (
                                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#ff4d4d] ring-2 ring-white dark:ring-background-dark"></span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Days Strip */}
                <div className="px-4 pb-4 overflow-x-auto no-scrollbar mask-gradient-right">
                    <div className="flex gap-3 items-center">
                        {days.map((d) => (
                            <button
                                key={d.name}
                                onClick={() => setSelectedDate(d.date)}
                                className={`flex flex-col items-center justify-center shrink-0 w-[52px] h-[72px] rounded-2xl transition-all duration-300
                   ${d.active
                                        ? 'bg-[#A17A57] text-white shadow-xl shadow-[#A17A57]/30 scale-105'
                                        : 'bg-white dark:bg-gray-800 text-[#57534e]/60 dark:text-gray-400 hover:bg-white border border-transparent hover:shadow-md'
                                    } `}
                            >
                                <span className={`text-[10px] uppercase tracking-widest mb-1 ${d.active ? 'opacity-80 font-medium' : 'opacity-60 font-bold'}`}>{d.name}</span>
                                <span className={`text-[22px] leading-none ${d.active ? 'font-bold' : 'font-display'}`}>{d.num}</span>
                                {d.active && <div className="w-1 h-1 rounded-full bg-white/50 mt-1"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
                {/* Reserved Classes Section (Moved Up) */}
                <div className="px-5 mt-6 mb-8 border-b border-dashed border-[#e6decb] dark:border-gray-800 pb-6">
                    <h2 className="text-xl font-bold tracking-tight mb-3">Mis Reservas</h2>
                    {bookedClassesList.length === 0 ? (
                        <div className="text-center p-4 border border-dashed border-[#e6decb] dark:border-gray-700 rounded-2xl bg-[#fffaf4]/30">
                            <p className="text-xs text-[#57534e]/70 dark:text-gray-400">No tienes reservas activas.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {bookedClassesList.map(cls => (
                                <div key={cls.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#2C2623] rounded-2xl shadow-sm border border-[#e6decb]/50 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-[#A17A57]/10 rounded-xl">
                                            <span className="material-symbols-outlined text-[#A17A57] text-xl">event_available</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-[#292524] dark:text-white leading-tight">{cls.name}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-[#57534e] dark:text-gray-400 font-medium">
                                                    {new Date(cls.time).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 font-bold">
                                                    {cls.time.includes('T') ? cls.time.split('T')[1].substring(0, 5) : '00:00'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onCancelBooking && onCancelBooking(cls.id)}
                                        className="p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        title="Liberar Plaza"
                                    >
                                        <span className="material-symbols-outlined text-xl">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-5 pt-2 pb-2 flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-bold leading-tight">{viewingWeek === 'current' ? 'Esta Semana' : 'Próxima Semana'}</h2>
                        <p className="text-sm text-[#57534e] dark:text-gray-400 mt-1">
                            {(() => {
                                if (viewingWeek === 'next') return '3 clases disponibles'; // Fixed 3 for next week

                                const now = new Date();
                                const currentDay = now.getDay() === 0 ? 7 : now.getDay(); // Convert to Mon=1...Sun=7
                                const currentHour = now.getHours();

                                // Standard Slots: Tue(2)@20, Thu(4)@20, Sun(7)@09
                                const slots = [
                                    { day: 2, hour: 20 },
                                    { day: 4, hour: 20 },
                                    { day: 7, hour: 9 }
                                ];

                                const remaining = slots.filter(slot => {
                                    if (slot.day > currentDay) return true;
                                    if (slot.day === currentDay && slot.hour > currentHour) return true;
                                    return false;
                                }).length;

                                return `${remaining} clases restantes esta semana`;
                            })()}
                        </p>
                    </div>

                    {viewingWeek === 'current' ? (
                        nextWeekUnlocked ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100/50 border border-green-200 rounded-full animate-pulse-slow">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Semana Siguiente Abierta</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
                                <span className="material-symbols-outlined text-[12px] text-gray-400">lock</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Semana Siguiente Cerrada</span>
                            </div>
                        )
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#A17A57]/10 border border-[#A17A57]/20 rounded-full">
                            <span className="material-symbols-outlined text-[12px] text-[#A17A57]">event_available</span>
                            <span className="text-[10px] font-bold text-[#A17A57] uppercase tracking-wide">Última semana disponible</span>
                        </div>
                    )}

                </div>



                {/* Classes Timeline */}
                <div className="px-5 space-y-5 mt-2">
                    {scheduledClasses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 px-6 text-center border-2 border-dashed border-[#e6decb] dark:border-gray-700 rounded-3xl bg-[#fffaf4]/50 dark:bg-gray-800/30">
                            <span className="material-symbols-outlined text-4xl text-[#A17A57]/50 mb-3">event_busy</span>
                            <h3 className="text-lg font-bold text-[#57534e] dark:text-[#d6d3d1] mb-1">Hoy no hay clases</h3>
                            <p className="text-sm text-[#57534e]/70 dark:text-gray-400 mb-6">
                                Consulta nuestros horarios habituales:
                            </p>

                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#e6decb]/50 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#A17A57]/10 rounded-xl">
                                            <span className="material-symbols-outlined text-[#A17A57] text-lg">wb_twilight</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm text-[#292524] dark:text-white">Martes y Jueves</p>
                                            <p className="text-xs text-[#57534e] dark:text-gray-400">Vinyasa Flow</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-[#A17A57]">20:00 - 21:00</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#e6decb]/50 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#A17A57]/10 rounded-xl">
                                            <span className="material-symbols-outlined text-[#A17A57] text-lg">wb_sunny</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm text-[#292524] dark:text-white">Domingos</p>
                                            <p className="text-xs text-[#57534e] dark:text-gray-400">Morning Yoga</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-[#A17A57]">09:00 - 10:00</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {scheduledClasses.map((cls, idx) => (
                        <div key={cls.id} className="group relative flex gap-4 animate-fade-in-up" style={{ animationDelay: `${0.1 * (idx + 1)} s` }}>
                            {/* Time Column */}
                            <div className="flex flex-col items-center pt-3 w-10 shrink-0">
                                <span className="text-sm font-bold text-[#292524] dark:text-white">
                                    {cls.time.includes('T') ? cls.time.split('T')[1].substring(0, 5) : cls.time.substring(0, 5)}
                                </span>
                                <span className="text-[10px] font-bold text-[#57534e]/70 dark:text-gray-500 mb-2">
                                    {parseInt(cls.time.includes('T') ? cls.time.split('T')[1] : cls.time) < 12 ? 'AM' : 'PM'}
                                </span>
                                <div className="w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 rounded-full group-last:hidden"></div>
                            </div>

                            {/* Card */}
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-soft border border-[#e6decb]/50 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                                <div className="flex gap-4">
                                    <div className="relative w-[70px] h-[70px] shrink-0">
                                        <img
                                            className="w-full h-full object-cover rounded-2xl shadow-sm"
                                            src={`https://picsum.photos/seed/${cls.id}/200/200`}
                                            alt="Class"
                                        />
                                        <div className="absolute top-1 right-1 bg-white/90 dark:bg-black/60 backdrop-blur rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[12px] text-[#A17A57]">star</span>
                                            <span className="text-[10px] font-bold text-[#292524] dark:text-white">{cls.averageRating || '4.9'}</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-700 p-0.5 rounded-full">
                                            {cls.bookedCount >= cls.capacity ? (
                                                <span className="flex items-center justify-center w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold">!</span>
                                            ) : (
                                                <span className="flex items-center justify-center w-5 h-5 bg-[#A17A57] rounded-full text-white text-[10px] font-bold">
                                                    {cls.capacity - cls.bookedCount}
                                                </span>
                                            )}
                                        </div>
                                    </div >

                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-[17px] leading-tight truncate">{cls.name}</h3>
                                            <span className="material-symbols-outlined text-gray-300 text-[18px]">favorite</span>
                                        </div>
                                        <p className="text-sm text-[#57534e] dark:text-gray-400 mt-1 truncate">
                                            con {cls.coachName} • {cls.level}
                                        </p>

                                        {cls.bookedCount >= cls.capacity ? (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-red-400 font-medium">
                                                <span className="material-symbols-outlined text-[12px]">block</span>
                                                Clase Llena
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-orange-500 font-medium">
                                                <span className="material-symbols-outlined text-[12px] fill-current">local_fire_department</span>
                                                {cls.capacity - cls.bookedCount} cupos
                                            </div>
                                        )}
                                    </div>
                                </div >

                                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                                    <div className="text-xs text-[#57534e]/60 font-medium">{cls.duration} min • {cls.room}</div>
                                    <button
                                        onClick={() => setView(cls.id)}
                                        disabled={new Date(cls.time) < new Date()}
                                        className={`text-sm font-bold px-6 py-2 rounded-xl transition-all shadow-md 
                                            ${new Date(cls.time) < new Date()
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                                : (cls.bookedCount >= cls.capacity
                                                    ? 'bg-[#A17A57] hover:bg-[#8B6A4B] active:scale-95 text-white shadow-[#A17A57]/20'
                                                    : 'bg-[#A17A57] hover:bg-[#8B6A4B] active:scale-95 text-white shadow-[#A17A57]/20')
                                            }`}
                                    >
                                        {(() => {
                                            if (new Date(cls.time) < new Date()) return 'Finalizada';
                                            if (cls.bookedCount >= cls.capacity) return 'Lista Espera';
                                            return 'Reservar';
                                        })()}
                                    </button>
                                </div>
                            </div >
                        </div >
                    ))}


                </div >
            </main >

            <StudentNavigation currentView={currentView} setView={setView} />

        </div >
    );
};

export default ScheduleView;
