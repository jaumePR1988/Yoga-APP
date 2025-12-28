
import { YogaClass, User, FinanceRecord, Retreat } from './types';

export const MOCK_CLASSES: YogaClass[] = [
  {
    id: '1',
    name: 'Vinyasa Flow Mañanero',
    coach: 'Ana García',
    time: '08:00 AM',
    duration: 60,
    capacity: 12,
    booked: 8,
    description: 'Una clase dinámica para despertar el cuerpo con el saludo al sol.',
    type: 'Vinyasa',
    level: 'Intermedio',
    room: 'Sala Bambú'
  },
  {
    id: '2',
    name: 'Hatha Yoga Suave',
    coach: 'Marc Rossi',
    time: '05:00 PM',
    duration: 45,
    capacity: 15,
    booked: 15,
    description: 'Posturas mantenidas para mejorar la flexibilidad y la calma mental.',
    type: 'Hatha',
    level: 'Principiante',
    room: 'Sala Loto'
  },
  {
    id: '3',
    name: 'Yin Yoga & Nidra',
    coach: 'Elena Gómez',
    time: '07:30 PM',
    duration: 90,
    capacity: 12,
    booked: 10,
    description: 'Enfoque en los tejidos conectivos y relajación profunda.',
    type: 'Yin Yoga',
    level: 'Todos los niveles',
    room: 'Garden Room'
  }
];

export const MOCK_STUDENTS: User[] = [
  { id: 's1', name: 'Ana López', email: 'ana.lopez@email.com', role: 'STUDENT', quotaType: 'Bonsai', sessionsLeft: 4, avatar: 'https://picsum.photos/seed/s1/100/100' },
  { id: 's2', name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', role: 'STUDENT', quotaType: 'Bambú', sessionsLeft: 8, avatar: 'https://picsum.photos/seed/s2/100/100' },
  { id: 's3', name: 'Elena Torres', email: 'elena.t@email.com', role: 'STUDENT', quotaType: 'Bambú', sessionsLeft: 12, avatar: 'https://picsum.photos/seed/s3/100/100' },
];

export const MOCK_FINANCES: FinanceRecord[] = [
  { id: 'f1', type: 'INGRESO', amount: 1250, category: 'Cuotas', date: '2023-10-12', label: 'Cuotas Membresía' },
  { id: 'f2', type: 'GASTO', amount: 850, category: 'Alquiler', date: '2023-10-05', label: 'Alquiler Estudio' },
  { id: 'f3', type: 'GASTO', amount: 120, category: 'Servicios', date: '2023-10-03', label: 'Servicios (Agua/Luz)' },
  { id: 'f4', type: 'INGRESO', amount: 300, category: 'Privadas', date: '2023-10-01', label: 'Clases Privadas' },
];

export const MOCK_RETIREES: Retreat[] = [
  { id: 'r1', name: 'Despertar Espiritual', location: 'Valle Sagrado, Cusco', startDate: '15 Nov', endDate: '20 Nov', capacity: 20, enrolled: 18, status: 'Activo', price: 1200 },
  { id: 'r2', name: 'Yoga & Surf Camp', location: 'Fuerteventura', startDate: '15 Dic', endDate: '20 Dic', capacity: 12, enrolled: 8, status: 'Activo', price: 950 },
];
