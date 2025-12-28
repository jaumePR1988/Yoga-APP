
export type UserRole = 'STUDENT' | 'COACH' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  quotaType?: 'Bonsai' | 'Bambú';
  sessionsLeft?: number;
  avatar?: string;
}

export interface YogaClass {
  id: string;
  name: string;
  coach: string;
  time: string;
  duration: number;
  capacity: number;
  booked: number;
  description: string;
  type: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
  room: string;
}

export interface Retreat {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  status: 'Activo' | 'Borrador' | 'Finalizado';
  price: number;
}

export interface FinanceRecord {
  id: string;
  type: 'INGRESO' | 'GASTO';
  amount: number;
  category: string;
  date: string;
  label: string;
}
