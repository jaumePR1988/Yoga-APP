
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
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[45vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={`https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1000`}
                        className="w-full h-full object-cover"
                        alt={cls.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </motion.div>

                {/* Top Controls */}
                <div className="absolute top-12 left-6 right-6 flex justify-between items-center z-10">
                    <button
                        onClick={onBack}
                        className="size-12 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button className="size-12 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform">
                        <span className="material-symbols-outlined">favorite</span>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative -mt-20 z-10 bg-white rounded-t-[40px] px-8 pt-10 pb-20 flex-1"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-[10px] font-bold text-[#A07851] bg-[#A07851]/10 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                            {cls.type}
                        </span>
                        <h1 className="text-3xl font-bold yoga-font text-[#3C3633] leading-tight">{cls.name}</h1>
                    </div>
                    <div className="bg-[#FAF9F6] p-3 rounded-2xl flex flex-col items-center border border-gray-100">
                        <span className="text-xl font-bold text-[#3C3633]">4.9</span>
                        <div className="flex text-yellow-500 scale-75">
                            <span className="material-symbols-outlined text-sm fill-1">star</span>
                        </div>
                    </div>
                </div>

                {/* Coach Intro */}
                <div className="flex items-center gap-3 mb-8">
                    <img src={`https://picsum.photos/seed/${cls.coachId}/100/100`} className="size-10 rounded-full" alt={cls.coachName} />
                    <div>
                        <p className="text-[#3C3633] text-sm font-bold">{cls.coachName}</p>
                        <p className="text-[#7F746D] text-[10px] font-semibold uppercase tracking-tighter">Instructor Certificado</p>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#FAF9F6] p-4 rounded-3xl flex flex-col items-center gap-1 border border-gray-50">
                        <span className="material-symbols-outlined text-[#A07851]">schedule</span>
                        <span className="text-sm font-bold text-[#3C3633]">{cls.duration} min</span>
                        <span className="text-[9px] text-[#7F746D] font-bold uppercase">Duración</span>
                    </div>
                    <div className="bg-[#FAF9F6] p-4 rounded-3xl flex flex-col items-center gap-1 border border-gray-50">
                        <span className="material-symbols-outlined text-[#D48C70]">local_fire_department</span>
                        <span className="text-sm font-bold text-[#3C3633]">320</span>
                        <span className="text-[9px] text-[#7F746D] font-bold uppercase">Kcal</span>
                    </div>
                    <div className="bg-[#FAF9F6] p-4 rounded-3xl flex flex-col items-center gap-1 border border-gray-50">
                        <span className="material-symbols-outlined text-[#94A684]">groups</span>
                        <span className="text-sm font-bold text-[#3C3633]">{cls.capacity - cls.bookedCount}</span>
                        <span className="text-[9px] text-[#7F746D] font-bold uppercase">Cupos</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                    <h2 className="text-lg font-bold text-[#3C3633] mb-3">Sobre la clase</h2>
                    <p className="text-[#7F746D] text-sm leading-relaxed">
                        {cls.description || 'Una experiencia inmersiva diseñada para conectar cuerpo y mente a través del movimiento fluido y la respiración consciente. Ideal para todos los niveles.'}
                    </p>
                </div>

                {/* Location / Meta */}
                <div className="flex items-center gap-4 p-4 bg-[#FAF9F6] rounded-3xl border border-gray-100 mb-20">
                    <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-[#A07851] shadow-sm">
                        <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#3C3633]">{cls.room}</p>
                        <p className="text-[11px] text-[#7F746D]">Planta Principal • Namasté Studio</p>
                    </div>
                </div>
            </motion.div>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50 rounded-t-[32px]">
                <div className="max-w-md mx-auto flex items-center justify-between gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[#7F746D] font-bold uppercase tracking-wider">Plan Activo</span>
                        <span className="text-lg font-bold text-[#3C3633]">1 Sesión</span>
                    </div>
                    <button
                        onClick={onBook}
                        disabled={isBooking || isBooked || cls.bookedCount >= cls.capacity}
                        className={`flex-1 btn-primary py-4 ${isBooked ? 'bg-[#94A684] shadow-none cursor-default' :
                                cls.bookedCount >= cls.capacity ? 'bg-gray-300 shadow-none cursor-not-allowed' : ''
                            }`}
                    >
                        {isBooking ? 'Procesando...' : isBooked ? '¡Ya estás dentro!' : 'Reservar Plaza'}
                        {!isBooked && cls.bookedCount < cls.capacity && <span className="material-symbols-outlined">trending_flat</span>}
                        {isBooked && <span className="material-symbols-outlined">check</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailView;
