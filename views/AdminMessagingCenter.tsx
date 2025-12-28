
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onBack: () => void;
    onSendNotification: (notif: any) => void;
}

const AdminMessagingCenter: React.FC<Props> = ({ onBack, onSendNotification }) => {
    const [selectedTopic, setSelectedTopic] = useState('Anuncios');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const handleSend = () => {
        if (!title.trim() || !message.trim()) {
            alert('Por favor, rellena título y mensaje.');
            return;
        }

        const newNotif = {
            id: `notif-${Date.now()}`,
            title,
            message,
            date: 'Ahora mismo',
            sender: 'ADMIN',
            type: selectedTopic === 'Urgentes' ? 'ALERT' : 'INFO',
            read: false
        };

        onSendNotification(newNotif);
        alert('Mensaje enviado a toda la comunidad exitosamente.');
        setTitle('');
        setMessage('');
        onBack();
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            <header className="px-6 pt-12 pb-6 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="size-12 bg-white rounded-full flex items-center justify-center text-[#3C3633] shadow-sm border border-gray-100"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold yoga-font text-[#3C3633]">Centro de Mensajes</h1>
            </header>

            <section className="px-6 pt-4 flex-1">
                <div className="bg-white rounded-[40px] p-8 shadow-md border border-gray-100">
                    <div className="mb-8">
                        <label className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest mb-4 block px-1">Canal de Comunicación</label>
                        <div className="flex flex-wrap gap-2">
                            {['Anuncios', 'Promociones', 'Retiros', 'Newsletter', 'Urgentes'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTopic(t)}
                                    className={`px-4 py-2.5 rounded-2xl text-[11px] font-bold transition-all ${selectedTopic === t
                                        ? 'bg-[#3C3633] text-white shadow-lg'
                                        : 'bg-[#FAF9F6] text-[#7F746D] border border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="text-[10px] font-bold text-[#7F746D] uppercase tracking-widest mb-4 block px-1">Nueva Comunicación</label>
                        <input
                            type="text"
                            placeholder="Asunto llamativo..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-2xl py-4 px-5 mb-4 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm font-bold"
                        />
                        <textarea
                            rows={6}
                            placeholder="Escribe aquí el contenido principal de tu mensaje a la comunidad..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-[32px] py-4 px-5 focus:ring-2 focus:ring-[#A07851]/20 outline-none text-sm resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-[#94A684]/5 rounded-3xl border border-dashed border-[#94A684]/30 mb-8">
                        <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-[#94A684] shadow-sm">
                            <span className="material-symbols-outlined">image</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-[#3C3633]">Adjuntar Imagen</p>
                            <p className="text-[10px] text-[#7F746D]">Banner promocional o foto</p>
                        </div>
                        <button className="text-[#A07851] text-xs font-bold px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">Subir</button>
                    </div>

                    <button
                        onClick={handleSend}
                        className="w-full btn-primary py-5 text-lg shadow-xl shadow-[#A07851]/30 flex items-center justify-center gap-2"
                    >
                        Enviar a la Comunidad
                        <span className="material-symbols-outlined">rocket_launch</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AdminMessagingCenter;
