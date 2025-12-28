import React from 'react';
import { motion } from 'framer-motion';
import { AppNotification } from '../types';

interface Props {
    onBack: () => void;
    pendingRating?: {
        id: string;
        className: string;
        time: string;
        coach: string;
    } | null;
    onRateClass: (rating: number) => void;
    notifications: AppNotification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

const NotificationsView: React.FC<Props> = ({ onBack, pendingRating, onRateClass, notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    const markAsRead = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkAsRead(id);
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-[#FAF9F6] dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-[#FAF9F6]/95 dark:bg-background-dark/95 backdrop-blur-sm pt-safe-top">
                <div className="flex items-center justify-between p-5 pb-2">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-text-main-dark transition-transform active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <h2 className="text-xl font-bold leading-tight">Comunicaciones</h2>
                    </div>
                    <button
                        onClick={onMarkAllAsRead}
                        className="text-xs font-bold text-[#A17A57] px-3 py-1.5 bg-[#A17A57]/10 rounded-full hover:bg-[#A17A57]/20 transition-colors"
                    >
                        Leer todo
                    </button>
                </div>
            </header>

            <main className="flex-1 px-5 pt-4 pb-24 overflow-y-auto hide-scrollbar no-scrollbar">

                {/* Section: Actions (Pendientes) */}
                {pendingRating && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-[#A17A57] uppercase tracking-wider mb-3 px-1">Pendiente</h3>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 rounded-2xl bg-white dark:bg-[#2C2623] shadow-md border-l-4 border-l-[#A17A57] relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-[#292524] dark:text-white leading-tight">Valorar clase</h3>
                                    <p className="text-sm text-[#57534e] dark:text-gray-400 mt-1">¿Qué tal fue <strong>{pendingRating.className}</strong>?</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 justify-start">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => onRateClass(star)}
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
                    </div>
                )}

                {/* Section: Official Communications */}
                <div>
                    <h3 className="text-sm font-bold text-[#57534e] dark:text-gray-400 uppercase tracking-wider mb-4 px-1">Comunicaciones Oficiales</h3>

                    <div className="space-y-4">
                        {notifications.map((item) => (
                            <div
                                key={item.id}
                                className={`p-4 bg-white dark:bg-[#2C2623] rounded-2xl shadow-sm border transition-colors
                            ${item.read ? 'border-gray-100 dark:border-gray-800 opacity-75' : 'border-[#e6decb] dark:border-gray-700'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                    ${item.sender === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {item.sender === 'ADMIN' ? 'Admin' : 'Coach'}
                                        </div>
                                        <span className="text-xs text-gray-400">• {item.date}</span>
                                    </div>
                                    {!item.read && (
                                        <button
                                            onClick={(e) => markAsRead(item.id, e)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#A17A57]"
                                            title="Marcar como leído"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                        </button>
                                    )}
                                </div>
                                <h4 className={`font-bold text-base text-[#292524] dark:text-white mb-1 leading-tight ${item.read ? 'font-normal' : ''}`}>{item.title}</h4>
                                <p className="text-sm text-[#57534e]/80 dark:text-gray-400 leading-relaxed">{item.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default NotificationsView;
