
import React from 'react';
import { UserRole } from '../types';

interface NavigationProps {
  role: UserRole;
  currentView: string;
  setView: (v: string) => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ role, currentView, setView, onLogout }) => {
  const getNavItems = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { id: 'home', label: 'Inicio', icon: 'grid_view' },
          { id: 'calendar', label: 'Calendario', icon: 'calendar_month' },
          { id: 'finances', label: 'Finanzas', icon: 'payments' },
          { id: 'retreats', label: 'Retiros', icon: 'nature_people' },
          { id: 'profile', label: 'Salir', icon: 'logout', action: onLogout },
        ];
      case 'COACH':
        return [
          { id: 'home', label: 'Clases', icon: 'dashboard' },
          { id: 'students', label: 'Alumnos', icon: 'groups' },
          { id: 'challenges', label: 'Retos', icon: 'trophy' },
          { id: 'messages', label: 'Mensaje', icon: 'campaign' },
          { id: 'profile', label: 'Salir', icon: 'logout', action: onLogout },
        ];
      default:
        return [
          { id: 'home', label: 'Inicio', icon: 'home' },
          { id: 'calendar', label: 'Agenda', icon: 'calendar_month' },
          { id: 'news', label: 'Noticias', icon: 'newspaper' },
          { id: 'profile', label: 'Perfil', icon: 'person' },
          { id: 'logout', label: 'Salir', icon: 'logout', action: onLogout },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-100 px-4 py-2 pb-6 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => item.action ? item.action() : setView(item.id)}
          className={`flex flex-col items-center gap-1 flex-1 transition-colors ${currentView === item.id ? 'text-primary' : 'text-stone-400'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${currentView === item.id ? 'fill-[1]' : ''}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
