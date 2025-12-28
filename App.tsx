import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, UserRole, YogaClass } from './types';
import LoginView from './views/LoginView';
import DashboardStudent from './views/DashboardStudent';
import DashboardCoach from './views/DashboardCoach';
import DashboardAdmin from './views/DashboardAdmin';
import Navigation from './components/Navigation';
import PageTransition from './components/PageTransition';
import { authService } from './src/services/authService';
import { dbService } from './src/services/dbService';
import ClassDetailView from './views/ClassDetailView';
import StudentProfileView from './views/StudentProfileView';
import SignupView from './views/SignupView';
import CoachClassStudents from './views/CoachClassStudents';
import CoachChallenges from './views/CoachChallenges';
import CoachNotificationsPush from './views/CoachNotificationsPush';
import AdminClassManagement from './views/AdminClassManagement';
import AdminQuotaManagement from './views/AdminQuotaManagement';
import AdminFinanceDashboard from './views/AdminFinanceDashboard';
import AdminRetreatsList from './views/AdminRetreatsList';
import AdminRetreatDetailView from './views/AdminRetreatDetailView';
import AdminRetreatFinanceView from './views/AdminRetreatFinanceView';
import AdminMessagingCenter from './views/AdminMessagingCenter';
import { MOCK_CLASSES } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [loading, setLoading] = useState(true);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [selectedClass, setSelectedClass] = useState<YogaClass | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges(async (fbUser) => {
      setLoading(true);
      if (fbUser) {
        try {
          const profile = await dbService.getUserProfile(fbUser.uid);
          if (profile) {
            setCurrentUser(profile);
          } else {
            console.warn("Perfil no encontrado para UID:", fbUser.uid);
            // Solo desconectamos si no estamos configurando
            if (!isSettingUp) setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error cargando perfil:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isSettingUp]);

  const handleLogin = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await authService.login(email, pass);
    } catch (error: any) {
      alert("Error al iniciar sesión: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleSetupTestUsers = async () => {
    if (!confirm("¿Crear los 3 usuarios de prueba reales?")) return;

    setIsSettingUp(true);
    setLoading(true);

    const testUsers = [
      { email: 'admin@namaste.com', pass: 'yoga1234', role: 'ADMIN' as UserRole, name: 'Admin Namasté' },
      { email: 'coach@namaste.com', pass: 'yoga1234', role: 'COACH' as UserRole, name: 'Elena G. (Coach)' },
      { email: 'alumno@namaste.com', pass: 'yoga1234', role: 'STUDENT' as UserRole, name: 'Sofía Martínez' },
    ];

    try {
      for (const u of testUsers) {
        try {
          const cred = await authService.signup(u.email, u.pass);
          await dbService.createUserProfile({
            id: cred.user.uid,
            email: u.email,
            name: u.name,
            role: u.role,
            sessionsLeft: u.role === 'STUDENT' ? 10 : 0,
            quotaType: u.role === 'STUDENT' ? 'Bambú' : 'Ninguna',
            points: u.role === 'STUDENT' ? 500 : 0,
            badges: u.role === 'STUDENT' ? ['Explorador'] : [],
            weeklyGoal: u.role === 'STUDENT' ? 3 : 0,
            sessionsThisWeek: 0,
            updatedAt: new Date()
          });
          await authService.logout();
        } catch (err: any) {
          if (err.code !== 'auth/email-already-in-use') throw err;
          console.log(`${u.email} ya existe.`);
        }
      }
      alert("Usuarios creados. Clave: yoga1234");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSettingUp(false);
      setLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await authService.signup(email, pass);
      await dbService.createUserProfile({
        id: cred.user.uid,
        email,
        name,
        role: 'STUDENT',
        sessionsLeft: 10,
        quotaType: 'Bambú',
        points: 0,
        badges: [],
        weeklyGoal: 3,
        sessionsThisWeek: 0,
        updatedAt: new Date()
      });
      alert("Registro exitoso. ¡Bienvenido!");
    } catch (error: any) {
      alert("Error en el registro: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      setCurrentView('home');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBookFromDetail = async () => {
    if (!currentUser || !selectedClass || isBooking) return;
    setIsBooking(true);
    try {
      await dbService.bookClass(currentUser.id, selectedClass.id);
      setCurrentUser({
        ...currentUser,
        sessionsLeft: (currentUser.sessionsLeft || 0) - 1,
        sessionsThisWeek: (currentUser.sessionsThisWeek || 0) + 1
      });
      setBookedClassIds([...bookedClassIds, selectedClass.id]);
      alert('¡Clase reservada!');
    } catch (err: any) {
      alert(err.toString());
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-100 text-stone-400 font-sans italic">
        Conectando con Namasté Studio...
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#FAF9F6] font-sans">
      <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col h-[100dvh] overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {!currentUser ? (
              <PageTransition key={authMode}>
                {authMode === 'login' ? (
                  <LoginView
                    onLogin={handleLogin}
                    onSetupTestUsers={handleSetupTestUsers}
                    isSettingUp={isSettingUp}
                    onGoToSignup={() => setAuthMode('signup')}
                  />
                ) : (
                  <SignupView
                    onSignup={handleSignup}
                    onBack={() => setAuthMode('login')}
                  />
                )}
              </PageTransition>
            ) : (
              <PageTransition key={currentUser.role + currentView + (selectedClass?.id || '')}>
                {currentUser.role === 'ADMIN' && (
                  <>
                    {currentView === 'home' && (
                      <DashboardAdmin
                        user={currentUser}
                        currentView={currentView}
                        setView={setCurrentView}
                      />
                    )}
                    {currentView === 'admin_classes' && (
                      <AdminClassManagement
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {currentView === 'admin_quotas' && (
                      <AdminQuotaManagement
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {currentView === 'admin_finance' && (
                      <AdminFinanceDashboard
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {currentView === 'admin_retreats' && (
                      <AdminRetreatsList
                        onBack={() => setCurrentView('home')}
                        setView={setCurrentView}
                      />
                    )}
                    {currentView.startsWith('retreat_detail_') && (
                      <AdminRetreatDetailView
                        retreatId={currentView.replace('retreat_detail_', '')}
                        onBack={() => setCurrentView('admin_retreats')}
                        setView={setCurrentView}
                      />
                    )}
                    {currentView === 'admin_retreat_finance' && (
                      <AdminRetreatFinanceView
                        onBack={() => setCurrentView('admin_retreats')}
                      />
                    )}
                    {currentView === 'admin_comms' && (
                      <AdminMessagingCenter
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {/* Fallback for other admin views */}
                    {!['home', 'admin_classes', 'admin_quotas', 'admin_finance', 'admin_retreats', 'admin_comms', 'admin_retreat_finance'].includes(currentView) && !currentView.startsWith('retreat_detail_') && (
                      <DashboardAdmin user={currentUser} currentView={currentView} setView={setCurrentView} />
                    )}
                  </>
                )}
                {currentUser.role === 'COACH' && (
                  <>
                    {currentView === 'home' && (
                      <DashboardCoach
                        user={currentUser}
                        currentView={currentView}
                        setView={setCurrentView}
                      />
                    )}
                    {currentView === 'coach_students' && (
                      <CoachClassStudents
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {currentView === 'coach_challenges' && (
                      <CoachChallenges
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {currentView === 'coach_push' && (
                      <CoachNotificationsPush
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {/* Fallback for other coach views */}
                    {!['home', 'coach_students', 'coach_challenges', 'coach_push'].includes(currentView) && (
                      <DashboardCoach user={currentUser} currentView={currentView} setView={setCurrentView} />
                    )}
                  </>
                )}
                {currentUser.role === 'STUDENT' && (
                  <>
                    {currentView === 'home' && (
                      <DashboardStudent
                        user={currentUser}
                        onUpdateUser={(u) => setCurrentUser({ ...currentUser, ...u })}
                        currentView={currentView}
                        setView={(v) => {
                          if (v === 'profile') setCurrentView('profile');
                          else {
                            const cls = MOCK_CLASSES.find(c => c.id === v);
                            if (cls) {
                              setSelectedClass(cls);
                              setCurrentView('class_detail');
                            } else {
                              setCurrentView(v);
                            }
                          }
                        }}
                      />
                    )}
                    {currentView === 'class_detail' && selectedClass && (
                      <ClassDetailView
                        cls={selectedClass}
                        onBack={() => setCurrentView('home')}
                        onBook={handleBookFromDetail}
                        isBooking={isBooking}
                        isBooked={bookedClassIds.includes(selectedClass.id)}
                      />
                    )}
                    {currentView === 'profile' && (
                      <StudentProfileView
                        user={currentUser}
                        onLogout={handleLogout}
                        onBack={() => setCurrentView('home')}
                      />
                    )}
                    {/* Fallback for other student views */}
                    {!['home', 'class_detail', 'profile'].includes(currentView) && (
                      <DashboardStudent
                        user={currentUser}
                        onUpdateUser={(u) => setCurrentUser({ ...currentUser, ...u })}
                        currentView={currentView}
                        setView={setCurrentView}
                      />
                    )}
                  </>
                )}
              </PageTransition>
            )}
          </AnimatePresence>
        </main>

        {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'COACH') && (
          <Navigation
            role={currentUser.role}
            currentView={currentView}
            setView={setCurrentView}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default App;
