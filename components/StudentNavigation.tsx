import React from 'react';

interface Props {
    currentView: string;
    setView: (view: string) => void;
}

const StudentNavigation: React.FC<Props> = ({ currentView, setView }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1C1917]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 pb-safe pt-2 px-2">
            <div className="flex items-end justify-between max-w-md mx-auto h-16 relative">

                {/* Home */}
                <button
                    onClick={() => setView('home')}
                    className={`group flex flex-col items-center gap-1 w-14 transition-colors ${currentView === 'home' ? 'text-[#A0785A] dark:text-[#A0785A]' : 'text-gray-400 dark:text-gray-500 hover:text-[#A0785A]'}`}
                >
                    <span className={`material-symbols-outlined text-2xl transition-transform ${currentView === 'home' ? 'scale-110 fill-1' : 'group-hover:scale-110'}`}>home</span>
                    <span className="text-[10px] font-medium">Inicio</span>
                </button>

                {/* Schedule */}
                <button
                    onClick={() => setView('schedule')}
                    className={`group flex flex-col items-center gap-1 w-14 transition-colors ${currentView === 'schedule' ? 'text-[#A0785A] dark:text-[#A0785A]' : 'text-gray-400 dark:text-gray-500 hover:text-[#A0785A]'}`}
                >
                    <span className={`material-symbols-outlined text-2xl transition-transform ${currentView === 'schedule' ? 'scale-110 fill-1' : 'group-hover:scale-110'}`}>calendar_month</span>
                    <span className="text-[10px] font-medium">Clases</span>
                </button>

                {/* Central Prominent Button: RETREATS */}
                <div className="relative -top-5">
                    <button
                        onClick={() => setView('retreats')}
                        className="group flex flex-col items-center justify-center gap-1"
                    >
                        <div className={`
                            flex items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-[#FAFAF9] dark:border-[#1C1917] transition-all active:scale-95
                            ${currentView === 'retreats'
                                ? 'bg-[#A0785A] text-white'
                                : 'bg-white dark:bg-[#292524] text-[#A0785A]'}
                        `}>
                            <span className="material-symbols-outlined text-[28px]">landscape</span>
                        </div>
                        <span className={`text-[10px] font-bold mt-1 ${currentView === 'retreats' ? 'text-[#A0785A]' : 'text-gray-400 dark:text-gray-500'}`}>Retiros</span>
                    </button>
                    {/* Optional Notification Dot */}
                    <span className="absolute top-0 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-[#1C1917]"></span>
                    </span>
                </div>

                {/* News / Comms */}
                <button
                    onClick={() => setView('comms')}
                    className={`group flex flex-col items-center gap-1 w-14 transition-colors ${currentView === 'comms' ? 'text-[#A0785A] dark:text-[#A0785A]' : 'text-gray-400 dark:text-gray-500 hover:text-[#A0785A]'}`}
                >
                    <span className={`material-symbols-outlined text-2xl transition-transform ${currentView === 'comms' ? 'scale-110 fill-1' : 'group-hover:scale-110'}`}>newspaper</span>
                    <span className="text-[10px] font-medium">Noticias</span>
                </button>

                {/* Profile */}
                <button
                    onClick={() => setView('profile')}
                    className={`group flex flex-col items-center gap-1 w-14 transition-colors ${currentView === 'profile' ? 'text-[#A0785A] dark:text-[#A0785A]' : 'text-gray-400 dark:text-gray-500 hover:text-[#A0785A]'}`}
                >
                    <span className={`material-symbols-outlined text-2xl transition-transform ${currentView === 'profile' ? 'scale-110 fill-1' : 'group-hover:scale-110'}`}>person</span>
                    <span className="text-[10px] font-medium">Perfil</span>
                </button>

            </div>
        </nav>
    );
};

export default StudentNavigation;
