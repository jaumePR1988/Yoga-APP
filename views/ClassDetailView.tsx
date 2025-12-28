import React from 'react';
import { motion } from 'framer-motion';
import { YogaClass } from '../types';

interface Props {
    cls: YogaClass;
    onBack: () => void;
    onBook: () => void;
    isBooking: boolean;
    isBooked: boolean;
}

const ClassDetailView: React.FC<Props> = ({ cls, onBack, onBook, isBooking, isBooked }) => {
    // Generate a consistent random image based on ID or just use picsum with seed
    const heroImage = `https://picsum.photos/seed/${cls.id}hero/1000/1000`;
    const coachImage = `https://picsum.photos/seed/${cls.coachId}/200/200`;

    // Calculate formatted date and time
    const dateObj = new Date(cls.time);
    const dateStr = dateObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
    const timeStr = cls.time.includes('T') ? cls.time.split('T')[1].substring(0, 5) : cls.time;
    // Calculate end time approx based on duration
    const [hours, minutes] = timeStr.split(':').map(Number);
    const endMinutes = minutes + cls.duration;
    const endHour = hours + Math.floor(endMinutes / 60);
    const endMinFinal = endMinutes % 60;
    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMinFinal.toString().padStart(2, '0')}`;

    const occupancyPercent = cls.capacity > 0 ? ((cls.bookedCount / cls.capacity) * 100) : 0;

    return (
        <div className="relative flex min-h-screen flex-col pb-24 w-full max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden font-display text-[#292524] dark:text-gray-100">
            {/* Header / Hero Image */}
            <div className="relative w-full h-80 shrink-0 group/header">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${heroImage}")` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>
                {/* Top Nav */}
                <div className="absolute top-0 left-0 w-full px-4 pt-safe-top flex justify-between items-center z-10 mt-4">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-colors active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-[24px]">share</span>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-[24px]">favorite</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 -mt-8 flex flex-col gap-6 rounded-t-[32px] bg-background-light dark:bg-background-dark px-6 pt-8 min-h-[500px]">

                {/* Title & Badge */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#292524] dark:text-white capitalize">
                            {cls.name}
                        </h1>
                        <div className="flex flex-col items-center justify-center shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 backdrop-blur-sm">
                            <span className="text-xs font-bold text-primary uppercase tracking-wide">Nivel</span>
                            <span className="text-sm font-bold text-[#292524] dark:text-white">{cls.level || 'Intermedio'}</span>
                        </div>
                    </div>
                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-sm text-[#8f6540] dark:text-primary/80">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            <span>{cls.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                            <span>320 kcal</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span>4.9 (124)</span>
                        </div>
                    </div>
                </div>

                {/* Coach Card */}
                <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#292524] p-3 shadow-sm border border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                        <div
                            className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-white dark:border-[#292524] shadow-sm"
                            style={{ backgroundImage: `url("${coachImage}")` }}
                        ></div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-[#292524] dark:text-white">{cls.coachName}</p>
                            <p className="text-xs text-[#8f6540] dark:text-primary/80">Instructora Certificada</p>
                        </div>
                    </div>
                    <button className="mr-1 rounded-full bg-[#f5f0eb] dark:bg-[#44403c] p-2 text-primary transition hover:bg-primary/20">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>

                {/* Capacity Bar */}
                <div className="flex flex-col gap-2 rounded-2xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-[#292524] p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#292524] dark:text-white">Aforo de la clase</span>
                        <span className="font-bold text-primary">{cls.capacity - cls.bookedCount} plazas disponibles</span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-700">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${occupancyPercent}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-xs text-stone-500 dark:text-stone-400">{cls.bookedCount} de {cls.capacity} ocupadas</p>
                </div>

                {/* Details Grid */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-[#292524] dark:text-white">Detalles</h3>
                    <div className="grid gap-3">
                        <div className="flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-stone-50 dark:hover:bg-[#292524]/50">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eadd] dark:bg-[#292524] text-primary">
                                <span className="material-symbols-outlined">calendar_today</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Fecha y Hora</p>
                                <p className="text-base font-semibold text-[#292524] dark:text-white capitalize">{dateStr} • {timeStr} - {endTimeStr}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-stone-50 dark:hover:bg-[#292524]/50">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eadd] dark:bg-[#292524] text-primary">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Ubicación</p>
                                <p className="text-base font-semibold text-[#292524] dark:text-white">{cls.room || 'Sala Bambú'}</p>
                                <p className="mt-1 text-xs text-primary underline decoration-primary/30 underline-offset-2">Ver en mapa</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 pb-8">
                    <h3 className="text-lg font-bold text-[#292524] dark:text-white">Sobre la clase</h3>
                    <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                        {cls.description || 'Una clase dinámica diseñada para despertar el cuerpo con el saludo al sol y secuencias fluidas. Trabajaremos la flexibilidad, el equilibrio y la fuerza del core.\n\nPor favor, intenta llegar 10 minutos antes para acomodarte. Recuerda traer tu propia esterilla y botella de agua. ¡Namasté!'}
                    </p>
                </div>
            </div>

            {/* Sticky Bottom Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md mx-auto bg-white/90 dark:bg-[#1c1917]/95 backdrop-blur-lg border-t border-stone-100 dark:border-stone-800 p-4 pb-safe-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Precio total</span>
                        <span className="text-xl font-bold text-[#292524] dark:text-white">15,00€</span>
                    </div>
                    <button
                        onClick={onBook}
                        disabled={isBooking || isBooked || cls.bookedCount >= cls.capacity}
                        className={`flex-1 rounded-xl px-6 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/20
                            ${isBooked
                                ? 'bg-green-600 hover:bg-green-700'
                                : cls.bookedCount >= cls.capacity
                                    ? 'bg-stone-400 cursor-not-allowed shadow-none'
                                    : 'bg-primary hover:bg-[#6d4c30]'
                            }`}
                    >
                        {isBooking ? 'Procesando...' : isBooked ? '¡Plaza Reservada!' : (cls.bookedCount >= cls.capacity ? 'Clase Completa' : 'Reservar Plaza')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailView;
