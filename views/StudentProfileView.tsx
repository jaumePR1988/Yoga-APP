import React, { useRef } from 'react';
import { User } from '../types';
import StudentNavigation from '../components/StudentNavigation';
import { dbService } from '../src/services/dbService';

interface Props {
    user: User;
    onLogout: () => void;
    onBack: () => void;
    setView: (view: string) => void;
    onUpdateUser: (user: Partial<User>) => void;
}

const StudentProfileView: React.FC<Props> = ({ user, onLogout, onBack, setView, onUpdateUser }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock History Data for visual fidelity
    const recentClasses = [
        { id: 1, name: 'Vinyasa Flow', instructor: 'Ana', time: '18:00 - 19:00', day: '12', month: 'Mar', status: 'Completada' },
        { id: 2, name: 'Hatha Yoga', instructor: 'Carlos', time: '09:00 - 10:00', day: '10', month: 'Mar', status: 'Completada' },
        { id: 3, name: 'Meditación Guiada', instructor: 'Elena', time: '20:00', day: '05', month: 'Mar', status: 'Cancelada' },
    ];

    // --- Stats Logic ---
    const today = new Date();
    const currentDay = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysUntilNextMonth = daysInMonth - currentDay;

    // Cycle Progress (0% at day 1, 100% at last day)
    const cycleProgress = Math.round((currentDay / daysInMonth) * 100);

    // Classes Remaining Logic
    // Quota limits (mock logic based on previous steps)
    const weeklyLimit = user.quotaType === 'Bonsai' ? 2 : (user.quotaType === 'Bambú' ? 3 : 999);
    // Approx Monthly Limit
    const maxMonthlyClasses = weeklyLimit > 20 ? 99 : Math.round(weeklyLimit * 4.33); // 99 for unlimited/high

    // Classes Used (Attended/Completed)
    // We assume sessionsThisWeek in User object tracks 'used' sessions for now, or sessionsThisMonth if available
    // But User type only has sessionsThisWeek and sessionsThisMonth (optional)
    const classesUsed = user.sessionsThisMonth || 0;

    // Remaining
    const classesRemaining = Math.max(0, maxMonthlyClasses - classesUsed);


    // --- Handlers ---
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Convert to Base64 (Data URL) for simple persistence without Storage bucket
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;

            // 1. Update UI immediately
            onUpdateUser({ avatar: base64String });

            // 2. Persist to DB
            try {
                await dbService.updateUserProfile(user.id, { avatar: base64String });
                console.log("Avatar updated successfully");
            } catch (error) {
                console.error("Error updating avatar:", error);
                alert("Error al guardar la foto. Inténtalo de nuevo.");
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#241E19] dark:text-gray-100 min-h-screen flex flex-col pb-24">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 px-4 pt-safe-top pb-3 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#241E19] dark:text-white"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight text-[#241E19] dark:text-white">Mi Perfil</h1>
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#241E19] dark:text-white">
                    <span className="material-symbols-outlined text-2xl">settings</span>
                </button>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col gap-6">
                {/* Profile Header */}
                <section className="flex flex-col items-center gap-4 py-2">
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <div
                            className="w-28 h-28 rounded-full bg-cover bg-center border-4 border-white dark:border-[#26201B] shadow-md transition-transform group-hover:scale-105"
                            style={{ backgroundImage: `url('${user.avatar || `https://picsum.photos/seed/${user.name}/200/200`}')` }}
                        ></div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-[#26201B] flex items-center justify-center hover:bg-[#856345] transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <div className="text-center w-full">
                        <h2 className="text-2xl font-bold text-[#241E19] dark:text-white">{user.name}</h2>

                        {/* Centered Plan Badge */}
                        <div className="flex justify-center mt-2">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F0EBE6] dark:bg-[#3E2F24] text-sm font-bold text-[#5E4B35] dark:text-[#DBCFB0]">
                                <span className="material-symbols-outlined text-sm">spa</span>
                                Plan {user.quotaType || 'Básico'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Clases Restantes</span>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-bold text-[#241E19] dark:text-white tracking-tight">
                                    {user.quotaType === 'Bonsai' || user.quotaType === 'Bambú'
                                        ? classesRemaining
                                        : '∞'}
                                </span>
                                <span className="text-lg text-gray-400 font-medium mb-1">
                                    {user.quotaType === 'Bonsai' || user.quotaType === 'Bambú'
                                        ? `/ ${maxMonthlyClasses}`
                                        : ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Asistidas este mes</span>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-bold text-primary tracking-tight">{classesUsed}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-[#241E19] dark:text-white">Progreso del ciclo ({new Date().toLocaleString('es-ES', { month: 'long' })})</span>
                            <span className="text-xs font-bold text-primary bg-[#F5F1EB] dark:bg-[#3E2F24]/50 px-2 py-0.5 rounded">{cycleProgress}%</span>
                        </div>
                        <div className="w-full bg-[#F0EBE6] dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-primary h-2.5 rounded-full transition-all duration-1000"
                                style={{ width: `${cycleProgress}%` }}
                            ></div>
                        </div>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Tu plan se renueva en {daysUntilNextMonth} {daysUntilNextMonth === 1 ? 'día' : 'días'}.
                        </p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined">person_edit</span>
                        </div>
                        <span className="text-xs font-semibold">Editar</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">credit_card</span>
                        </div>
                        <span className="text-xs font-semibold">Pagos</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <span className="text-xs font-semibold">Historial</span>
                    </button>
                </section>

                {/* Recent Classes */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-lg font-bold text-[#241E19] dark:text-white">Clases Recientes</h3>
                        <a className="text-sm font-semibold text-primary hover:text-[#856345] transition-colors cursor-pointer">Ver todo</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        {recentClasses.map((cls) => (
                            <div key={cls.id} className={`flex items-center p-3 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 ${cls.status === 'Cancelada' ? 'opacity-75' : ''}`}>
                                <div className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg mr-4 ${cls.status === 'Cancelada' ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-[#F0EBE6] dark:bg-[#3E2F24] text-primary'}`}>
                                    <span className="text-lg font-bold leading-none">{cls.day}</span>
                                    <span className={`text-[10px] uppercase font-bold leading-none ${cls.status === 'Cancelada' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{cls.month}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#241E19] dark:text-white truncate">{cls.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">con {cls.instructor} • {cls.time}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium 
                                        ${cls.status === 'Completada'
                                            ? 'bg-[#F5F1EB] dark:bg-[#3E2F24]/40 text-[#5E4B35] dark:text-[#C4B295]'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                                        {cls.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-4 flex justify-center pb-8">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-bold"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Cerrar Sesión
                    </button>
                </div>
            </main>
            <StudentNavigation currentView="profile" setView={setView} />
        </div>
    );
};

export default StudentProfileView;
