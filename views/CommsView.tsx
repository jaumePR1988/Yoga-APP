import React from 'react';
import StudentNavigation from '../components/StudentNavigation';

interface Props {
    currentView: string;
    setView: (view: string) => void;
}

const CommsView: React.FC<Props> = ({ currentView, setView }) => {
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
                    <h1 className="text-lg font-bold text-[#292524] dark:text-[#F5F5F4]">Noticias</h1>
                    <button className="flex size-10 items-center justify-center rounded-full text-[#292524] dark:text-[#F5F5F4] hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>
                <div className="flex gap-3 px-4 pb-4 overflow-x-auto hide-scrollbar snap-x no-scrollbar">
                    <button className="snap-start shrink-0 h-9 px-5 rounded-full bg-[#A0785A] text-white font-medium text-sm shadow-sm transition-transform active:scale-95">
                        Todos
                    </button>
                    <button className="snap-start shrink-0 h-9 px-5 rounded-full bg-white dark:bg-[#292524] text-[#292524] dark:text-[#F5F5F4] border border-gray-100 dark:border-gray-800 font-medium text-sm transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-white/5">
                        Talleres
                    </button>
                    <button className="snap-start shrink-0 h-9 px-5 rounded-full bg-white dark:bg-[#292524] text-[#292524] dark:text-[#F5F5F4] border border-gray-100 dark:border-gray-800 font-medium text-sm transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-white/5">
                        Horarios
                    </button>
                    <button className="snap-start shrink-0 h-9 px-5 rounded-full bg-white dark:bg-[#292524] text-[#292524] dark:text-[#F5F5F4] border border-gray-100 dark:border-gray-800 font-medium text-sm transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-white/5">
                        Consejos
                    </button>
                    <button className="snap-start shrink-0 h-9 px-5 rounded-full bg-white dark:bg-[#292524] text-[#292524] dark:text-[#F5F5F4] border border-gray-100 dark:border-gray-800 font-medium text-sm transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-white/5">
                        Comunidad
                    </button>
                </div>
            </header>
            <main className="flex-1 px-4 pb-24 space-y-6">
                <article className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#292524] shadow-sm dark:shadow-none dark:border dark:border-white/5 transition-all hover:shadow-md">
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwVVmRgkZ6sIED1a-bChD0Ic8n0xCCHKtZ5WoirpzJTZITtV_j0yD9qBp0JhECrfcyiT5fJ-91aE8WpWElOichYlkpUrIMJWuHPrGqOkKWTvY1q1xOc5_HZeRmNEF30LQ1kKYmJ4igiOnLSrbI7FehZEvlly0y3rcKVVSaEPjrFlbr9bW7hP67p5RewDfgbgwEVC9hW0C9UIxzaQzT6TqkrvZRdPMJKxcuzZAKn8GoNm9Wko97tGey98_Lw1pWosJbmNCYkW-FMzYh")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#A0785A] text-white shadow-sm">
                                DESTACADO
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold tracking-wide text-[#A0785A]">RETIROS</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">Hace 2 horas</span>
                        </div>
                        <h2 className="text-xl font-bold text-[#292524] dark:text-[#F5F5F4] leading-tight mb-3">
                            Retiro de Solsticio de Verano
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                            Únete a nosotros para celebrar la llegada del verano con un retiro de fin de semana lleno de meditación, asanas al aire libre y conexión con la naturaleza.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-[#A0785A]/10 dark:bg-[#A0785A]/20 hover:bg-[#A0785A]/20 dark:hover:bg-[#A0785A]/30 text-[#A0785A] dark:text-[#A0785A] font-bold text-sm transition-colors">
                            Leer más
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </div>
                </article>
                <div className="flex flex-col gap-4">
                    <article className="flex flex-col sm:flex-row bg-white dark:bg-[#292524] rounded-xl p-4 gap-4 shadow-sm border border-transparent dark:border-white/5 hover:border-[#A0785A]/20 dark:hover:border-[#A0785A]/20 transition-all">
                        <div className="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjTobfCwMwpCb8PVTlo6Q9suh9_noyz3SNnhvtar-bEB_vyVi1gxbK-9vNhu9c1CQ6XpnL8qe3J49p_vTvLW9AvskCpJQvS53IH-POFOrjaq7PWOLJJlByJYuZQvPlKNjjlJMvI_L9CkYiOcNzMgvfO6DWThiOMq1ZZIbyq1mdZdPrdnhLUvdlK8X2tuvNx7-1DvsZqaZ4yIWLaiS2mvkRs7fo27xZ4rIg9WNQztBjo1XDnUJpaAfQacGNe8yVH6HyVa9XI6WffGh6")' }}
                            ></div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#8D6E63] dark:text-[#D7CCC8] uppercase tracking-wider">AVISO</span>
                                    <span className="text-xs text-gray-400">Ayer</span>
                                </div>
                                <h3 className="text-base font-bold text-[#292524] dark:text-[#F5F5F4] leading-tight mb-2">
                                    Actualización de Horarios - Agosto
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-normal">
                                    Hemos añadido nuevas clases de Vinyasa Flow por la tarde y modificado los horarios de Hatha matutino.
                                </p>
                            </div>
                        </div>
                    </article>
                    <article className="flex flex-col sm:flex-row bg-white dark:bg-[#292524] rounded-xl p-4 gap-4 shadow-sm border border-transparent dark:border-white/5 hover:border-[#A0785A]/20 dark:hover:border-[#A0785A]/20 transition-all">
                        <div className="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbpylEAgL8hQMkkgxNQR3MydsIXxbRF8ppI5RgQCDNA3nLzRycpxBwmUNxZrCgus8cHBzgO0keDQkRD7VbNU8COPDU4jHK0m2Y4vewNdewKf8RkpV5D1JIr3rMIgGTUZK1NoRPsENCUfuO4PONfenovRrpmrI-kH3JNg0nXcBaY3fAfeuZUKcnNkJo49OeIRrZwdn8q7NRcnJWsS7YEsgh6zC-ppEAQaFCmfnL2nYkC6K2G1AKIE2I5sNbnu1bddutuxuwP4p7lqd5")' }}
                            ></div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#8D6E63] dark:text-[#D7CCC8] uppercase tracking-wider">BIENESTAR</span>
                                    <span className="text-xs text-gray-400">24 Jul</span>
                                </div>
                                <h3 className="text-base font-bold text-[#292524] dark:text-[#F5F5F4] leading-tight mb-2">
                                    5 Técnicas de Respiración
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-normal">
                                    Aprende a calmar tu mente y reducir la ansiedad con estos simples ejercicios de pranayama que puedes hacer en casa.
                                </p>
                            </div>
                        </div>
                    </article>
                    <article className="flex flex-col sm:flex-row bg-white dark:bg-[#292524] rounded-xl p-4 gap-4 shadow-sm border border-transparent dark:border-white/5 hover:border-[#A0785A]/20 dark:hover:border-[#A0785A]/20 transition-all">
                        <div className="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsSmP8qwrmu2nUXRi48rqnLS76h11rafq4tQwRs8dwfOdHIZXqlPtT9GNNWpj_4EknVTgJ_KT1F6r_I1wXL4GY7bR21cpo4h7rf6pwMLa0hD7RA7clig6Nw7bWWNwRDFWQ2gDuYYdGgOdGmuo4kuY6HDnJ_82Nme3_haZ1QMSC-rkJGnWrH4rk4kEGeWiYM--1p2qbJfnMsr1EHbVSxwChjY7puRCwzzxZ4d-cTaz2jKJev8V9NTK7YhU0zHd4rSV2FapKouG_sG5Z")' }}
                            ></div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#8D6E63] dark:text-[#D7CCC8] uppercase tracking-wider">EQUIPO</span>
                                    <span className="text-xs text-gray-400">20 Jul</span>
                                </div>
                                <h3 className="text-base font-bold text-[#292524] dark:text-[#F5F5F4] leading-tight mb-2">
                                    Bienvenida a Elena, nuestra nueva instructora
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-normal">
                                    Estamos emocionados de expandir nuestra familia con Elena, experta en Ashtanga y movilidad.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="flex items-center justify-center pt-4 pb-8">
                    <span className="text-sm text-gray-400 dark:text-gray-600 font-medium">Estás al día</span>
                </div>
            </main>
            <StudentNavigation currentView={currentView} setView={setView} />
        </div>
    );
};

export default CommsView;
