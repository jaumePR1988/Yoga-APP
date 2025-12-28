
export type UserRole = 'STUDENT' | 'COACH' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  quotaType?: 'Bonsai' | 'Bambú' | 'Ninguna';
  sessionsLeft?: number;
  avatar?: string;
  points: number;
  badges: string[];
  weeklyGoal: number;
  sessionsThisWeek: number;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

export interface YogaClass {
  id: string;
  name: string;
  coachId: string;
  coachName: string;
  time: Date | any;
  duration: number; // in minutes
  capacity: number;
  bookedCount: number;
  description: string;
  type: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
  room: string;
  status: 'Programada' | 'En curso' | 'Finalizada' | 'Cancelada';
}

export interface Booking {
  id: string;
  studentId: string;
  classId: string;
  status: 'Confirmada' | 'Cancelada' | 'Asistida';
  createdAt: Date | any;
}

export interface Retreat {
  id: string;
  title: string;
  location: string;
  startDate: Date | any;
  endDate: Date | any;
  price: number;
  capacity: number;
  enrolledCount: number;
  status: 'Borrador' | 'Abierto' | 'Finalizado';
  description: string;
  imageUrl?: string;
  totalRevenue?: number;
  fixedCosts?: {
    rent: number;
    staff: number;
  };
  perParticipantCosts?: {
    food: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  metric: 'Sesiones' | 'Horas' | 'Calorías' | 'Asistencia';
  goalValue: number;
  currentValue: number;
  participants: string[];
}

export interface FinanceRecord {
  id: string;
  type: 'INGRESO' | 'GASTO';
  category: string;
  amount: number;
  date: Date | any;
  description: string;
}
