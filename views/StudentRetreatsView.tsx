import React from 'react';
import StudentNavigation from '../components/StudentNavigation';

interface Props {
    currentView: string;
    setView: (view: string) => void;
}

const StudentRetreatsView: React.FC<Props> = ({ currentView, setView }) => {
    return (
        <div className="bg-[#FAFAF9] dark:bg-[#1C1917] min-h-screen flex flex-col font-display antialiased transition-colors duration-200">
            <header className="sticky top-0 z-50 bg-[#FAFAF9]/95 dark:bg-[#1C1917]/95 backdrop-blur-sm transition-colors duration-200 pt-safe-top">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => setView('home')}
                        className="flex size-10 items-center justify-center rounded-full text-[#292524] dark:text-[#F5F5F4] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-[#292524] dark:text-[#F5F5F4]">Retiros Exclusivos</h1>
                    <div className="size-10"></div>
                </div>
            </header>

            <main className="flex-1 px-4 pb-24 space-y-6">
                <article className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#292524] shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwVVmRgkZ6sIED1a-bChD0Ic8n0xCCHKtZ5WoirpzJTZITtV_j0yD9qBp0JhECrfcyiT5fJ-91aE8WpWElOichYlkpUrIMJWuHPrGqOkKWTvY1q1xOc5_HZeRmNEF30LQ1kKYmJ4igiOnLSrbI7FehZEvlly0y3rcKVVSaEPjrFlbr9bW7hP67p5RewDfgbgwEVC9hW0C9UIxzaQzT6TqkrvZRdPMJKxcuzZAKn8GoNm9Wko97tGey98_Lw1pWosJbmNCYkW-FMzYh")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#A0785A] text-white shadow-sm">
                                DISPONIBLE
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <h2 className="text-xl font-bold text-[#292524] dark:text-[#F5F5F4] leading-tight mb-2">
                            Retiro de Solsticio de Verano
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            Meditation, Asanas y Naturaleza. Un fin de semana para reconectar.
                        </p>
                        <button className="w-full h-10 rounded-xl bg-[#A0785A] text-white font-bold text-sm shadow-lg shadow-[#A0785A]/30 transition-transform active:scale-[0.98]">
                            Ver Información
                        </button>
                    </div>
                </article>
            </main>

            <StudentNavigation currentView={currentView} setView={setView} />
        </div>
    );
};

export default StudentRetreatsView;
