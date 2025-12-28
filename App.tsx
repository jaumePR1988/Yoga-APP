import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, UserRole, YogaClass } from './types';
import LoginView from './views/LoginView';
import DashboardStudent from './views/DashboardStudent';
import ScheduleView from './views/ScheduleView';
import CommsView from './views/CommsView';
import StudentRetreatsView from './views/StudentRetreatsView';
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
import NotificationsView from './views/NotificationsView';
import { MOCK_CLASSES } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [loading, setLoading] = useState(true);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [selectedClass, setSelectedClass] = useState<YogaClass | null>(null);
  // Initializing with '1' to show a mock reservation by default as requested
  const [bookedClassIds, setBookedClassIds] = useState<string[]>(['1']);
  const [isBooking, setIsBooking] = useState(false); // State for Booking
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    console.log("Subscribing to auth changes...");
    const unsubscribe = authService.subscribeToAuthChanges(async (fbUser) => {
      console.log("Auth state changed:", fbUser?.uid);
      setLoading(true);
      if (fbUser) {
        try {
          console.log("Fetching user profile for:", fbUser.uid);
          const profile = await dbService.getUserProfile(fbUser.uid);
          console.log("User profile result:", profile);
          if (profile) {
            setCurrentUser(profile);
          } else {
            console.warn("Perfil no encontrado para UID:", fbUser.uid);
            alert("Error: Perfil de usuario no encontrado en la base de datos. Por favor, contacta soporte.");
            // Solo desconectamos si no estamos configurando
            if (!isSettingUp) {
              await authService.logout();
              setCurrentUser(null);
            }
          }
        } catch (error: any) {
          console.error("Error cargando perfil:", error);
          alert("Error cargando perfil: " + error.message);
        }
      } else {
        console.log("No user logged in, clearing session.");
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isSettingUp]);

  const handleLogin = async (email: string, pass: string) => {
    // Only set loading here if we want to block UI immediately, 
    // but the listener will also set it. 
    // We avoid setting it to false here to prevent race conditions with the listener.
    setLoading(true);
    try {
      console.log("Attempting login for:", email);
      await authService.login(email, pass);
      console.log("Login successful, waiting for auth listener...");
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Error al iniciar sesión: " + (error.message || error));
      setLoading(false); // Only stop loading on error
    }
  };

  const handleSetupTestUsers = async () => {
    if (!confirm("¿Crear/Reparar los 3 usuarios de prueba reales?")) return;

    setIsSettingUp(true);
    setLoading(true);

    const testUsers = [
      { email: 'admin@namaste.com', pass: 'yoga1234', role: 'ADMIN' as UserRole, name: 'Admin Namasté' },
      { email: 'coach@namaste.com', pass: 'yoga1234', role: 'COACH' as UserRole, name: 'Elena G. (Coach)' },
      { email: 'alumno@namaste.com', pass: 'yoga1234', role: 'STUDENT' as UserRole, name: 'Sofía Martínez' },
    ];

    try {
      // First, sign out current user to avoid conflicts
      await authService.logout();

      for (const u of testUsers) {
        let uid = '';

        try {
          // Try to create user
          const cred = await authService.signup(u.email, u.pass);
          uid = cred.user.uid;
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            console.log(`${u.email} ya existe en Auth, intentando login para reparar perfil...`);
            try {
              const loginCred = await authService.login(u.email, u.pass);
              uid = loginCred.user.uid;
            } catch (loginErr) {
              console.error(`No se pudo loguear con ${u.email} para reparar:`, loginErr);
              continue;
            }
          } else {
            console.error(`Error creando usuario ${u.email}:`, err);
            continue;
          }
        }

        if (uid) {
          console.log(`Creando/Actualizando perfil para ${u.email} (${uid})...`);
          await dbService.createUserProfile({
            id: uid,
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
        }
      }
      await authService.logout();
      alert("Usuarios configurados y perfiles reparados. Intenta entrar ahora.");
    } catch (error: any) {
      alert("Error general: " + error.message);
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

  const handleCancelBooking = (classId: string) => {
    if (!currentUser) return;
    // Logic: Restore session if > 1 hour before (Mock logic for now)
    const cls = MOCK_CLASSES.find(c => c.id === classId);
    if (!cls) return;

    const now = new Date();
    const classTime = new Date(cls.time);
    const diffHours = (classTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    let restoreSession = true;
    if (diffHours < 1) {
      if (!window.confirm("Falta menos de 1h para la clase. Si cancelas ahora, perderás la sesión. ¿Continuar?")) {
        return;
      }
      restoreSession = false;
    } else {
      if (!window.confirm("¿Seguro que quieres cancelar tu reserva?")) return;
    }

    setBookedClassIds(prev => prev.filter(id => id !== classId));

    if (restoreSession) {
      setCurrentUser({
        ...currentUser,
        sessionsLeft: (currentUser.sessionsLeft || 0) + 1,
        sessionsThisWeek: Math.max(0, (currentUser.sessionsThisWeek || 0) - 1)
      });
      alert("Reserva cancelada. Se ha devuelto la sesión a tu bono.");
    } else {
      alert("Reserva cancelada. No se ha devuelto la sesión por ser cancelación tardía.");
    }
  };

  // Mock global pending rating state
  const [pendingRating, setPendingRating] = useState<any>({
    id: 'mock-pending',
    className: 'Hatha Yoga Suave',
    time: 'Ayer',
    coach: 'Marc Rossi'
  });

  // Mock global notifications state (Shared between Admin and Student)
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 'notif-1',
      title: 'Bienvenida al nuevo curso',
      message: 'Estamos encantados de tenerte con nosotros. Recuerda que puedes reservar tus clases con hasta 1 semana de antelación.',
      date: 'Hace 2 días',
      sender: 'ADMIN',
      read: false,
      type: 'INFO'
    },
    {
      id: 'notif-2',
      title: 'Cambio de horario - Martes',
      message: 'La clase de Vinyasa de los martes pasa a ser a las 20:00h permanentemente. ¡Os esperamos!',
      date: 'Ayer',
      sender: 'COACH',
      read: false,
      type: 'ALERT'
    }
  ]);

  const handleAddNotification = (newNotif: any) => {
    setNotifications([newNotif, ...notifications]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };


  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-[#F9F7F2] text-[#A17A57] font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A17A57]"></div>
        <div className="text-lg font-medium animate-pulse">Conectando con Namasté Studio...</div>
        <button
          onClick={() => { setLoading(false); authService.logout().catch(() => { }); }}
          className="mt-8 text-xs text-gray-400 underline hover:text-red-400"
        >
          ¿Tarda demasiado? Cancelar / Restart
        </button>
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
                {/* Fallback Debug Info if no role matches or view is empty */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="fixed top-0 right-0 bg-black/80 text-white text-[10px] p-2 z-[9999] pointer-events-none">
                    Debug: Role={currentUser.role} | View={currentView}
                  </div>
                )}

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
                        onSendNotification={handleAddNotification}
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
                        pendingRating={pendingRating} // Pass shared state
                        onRateClass={(rating) => {
                          // Update shared state: clear pending rating
                          setPendingRating(null);
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
                        setView={setCurrentView}
                        onUpdateUser={(u) => setCurrentUser({ ...currentUser, ...u })}
                      />
                    )}
                    {currentView === 'schedule' && (
                      <ScheduleView
                        currentView={currentView}
                        setView={(v) => {
                          const cls = MOCK_CLASSES.find(c => c.id === v);
                          if (cls) {
                            setSelectedClass(cls);
                            setCurrentView('class_detail');
                          } else {
                            setCurrentView(v);
                          }
                        }}
                        pendingRating={pendingRating}
                        bookedClassIds={bookedClassIds}
                        onCancelBooking={handleCancelBooking}
                      />
                    )}
                    {currentView === 'comms' && (
                      <CommsView
                        currentView={currentView}
                        setView={setCurrentView}
                      />
                    )}
                    {currentView === 'retreats' && (
                      <StudentRetreatsView
                        currentView={currentView}
                        setView={(v) => {
                          // Allow navigation from Retreats to other main views
                          setCurrentView(v);
                        }}
                      />
                    )}
                    {currentView === 'notifications' && (
                      <NotificationsView
                        onBack={() => setCurrentView('home')}
                        pendingRating={pendingRating}
                        onRateClass={(rating) => {
                          alert(`Has valorado con ${rating} estrellas.`);
                          setPendingRating(null);
                        }}
                        notifications={notifications}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAllAsRead={handleMarkAllAsRead}
                      />
                    )}
                    {/* Fallback for other student views */}
                    {!['home', 'class_detail', 'profile', 'schedule', 'comms', 'retreats', 'notifications'].includes(currentView) && (
                      <DashboardStudent
                        user={currentUser}
                        onUpdateUser={(u) => setCurrentUser({ ...currentUser, ...u })}
                        currentView={currentView}
                        setView={setCurrentView}
                        pendingRating={pendingRating}
                        onRateClass={(rating) => setPendingRating(null)}
                      />
                    )}
                  </>
                )}

                {/* Panic Fallback: If role is valid but nothing rendered above (or role is invalid) */}
                {!['ADMIN', 'COACH', 'STUDENT'].includes(currentUser.role) && (
                  <div className="p-10 text-center">
                    <h2 className="text-xl font-bold text-red-500">Error de Rol</h2>
                    <p>Tu usuario tiene un rol desconocido: <strong>{currentUser.role}</strong></p>
                    <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-200 rounded">Cerrar Sesión</button>
                  </div>
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
