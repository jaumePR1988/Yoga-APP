
import React, { useState } from 'react';
import { User, UserRole } from './types';
import LoginView from './views/LoginView';
import DashboardStudent from './views/DashboardStudent';
import DashboardCoach from './views/DashboardCoach';
import DashboardAdmin from './views/DashboardAdmin';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');

  const handleLogin = (role: UserRole) => {
    // Basic mock login
    const mockUser: User = {
      id: '1',
      name: role === 'ADMIN' ? 'Admin Studio' : role === 'COACH' ? 'Coach Elena' : 'Sofía Martínez',
      email: 'user@yoga.com',
      role: role,
      quotaType: 'Bambú',
      sessionsLeft: 8
    };
    setCurrentUser(mockUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'ADMIN': return <DashboardAdmin currentView={currentView} setView={setCurrentView} />;
      case 'COACH': return <DashboardCoach currentView={currentView} setView={setCurrentView} />;
      case 'STUDENT': return <DashboardStudent currentView={currentView} setView={setCurrentView} />;
      default: return <div>Role error</div>;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-stone-100 font-sans">
      <div className="w-full max-w-md bg-bamboo-light shadow-2xl relative flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {renderDashboard()}
        </main>
        
        <Navigation 
          role={currentUser.role} 
          currentView={currentView} 
          setView={setCurrentView} 
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default App;
