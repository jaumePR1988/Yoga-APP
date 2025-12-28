
import { YogaClass, User, FinanceRecord, Retreat } from './types';

export const MOCK_CLASSES: YogaClass[] = [
  {
    id: '1',
    name: 'Vinyasa Flow Mañanero',
    coachId: 'c1',
    coachName: 'Ana García',
    time: '2023-10-24T08:00:00',
    duration: 60,
    capacity: 12,
    bookedCount: 8,
    description: 'Una clase dinámica para despertar el cuerpo con el saludo al sol.',
    type: 'Vinyasa',
    level: 'Intermedio',
    room: 'Sala Bambú',
    status: 'Programada'
  },
  {
    id: '2',
    name: 'Hatha Yoga Suave',
    coachId: 'c2',
    coachName: 'Marc Rossi',
    time: '2023-10-24T17:00:00',
    duration: 45,
    capacity: 15,
    bookedCount: 15,
    description: 'Posturas mantenidas para mejorar la flexibilidad y la calma mental.',
    type: 'Hatha',
    level: 'Principiante',
    room: 'Sala Loto',
    status: 'Finalizada'
  },
  {
    id: '3',
    name: 'Yin Yoga & Nidra',
    coachId: 'c3',
    coachName: 'Elena Gómez',
    time: '2023-10-24T19:30:00',
    duration: 90,
    capacity: 12,
    bookedCount: 10,
    description: 'Enfoque en los tejidos conectivos y relajación profunda.',
    type: 'Yin Yoga',
    level: 'Todos los niveles',
    room: 'Garden Room',
    status: 'Programada'
  }
];

export const MOCK_STUDENTS: User[] = [
  {
    id: 's1', name: 'Ana López', email: 'ana.lopez@email.com', role: 'STUDENT',
    quotaType: 'Bonsai', sessionsLeft: 4, avatar: 'https://picsum.photos/seed/s1/100/100',
    points: 450, badges: ['Práctica Diaria', 'Madrugadora'], weeklyGoal: 3, sessionsThisWeek: 2
  },
  {
    id: 's2', name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', role: 'STUDENT',
    quotaType: 'Bambú', sessionsLeft: 8, avatar: 'https://picsum.photos/seed/s2/100/100',
    points: 1200, badges: ['Guerrero', 'Top Reservas'], weeklyGoal: 5, sessionsThisWeek: 4
  },
  {
    id: 's3', name: 'Elena Torres', email: 'elena.t@email.com', role: 'STUDENT',
    quotaType: 'Bambú', sessionsLeft: 12, avatar: 'https://picsum.photos/seed/s3/100/100',
    points: 800, badges: ['Yogui Pro'], weeklyGoal: 4, sessionsThisWeek: 3
  },
];

export const MOCK_FINANCES: FinanceRecord[] = [
  { id: 'f1', type: 'INGRESO', amount: 1250, category: 'Cuotas', date: '2023-10-12', description: 'Cuotas Membresía' },
  { id: 'f2', type: 'GASTO', amount: 850, category: 'Alquiler', date: '2023-10-05', description: 'Alquiler Estudio' },
  { id: 'f3', type: 'GASTO', amount: 120, category: 'Servicios', date: '2023-10-03', description: 'Servicios (Agua/Luz)' },
  { id: 'f4', type: 'INGRESO', amount: 300, category: 'Privadas', date: '2023-10-01', description: 'Clases Privadas' },
];

export const MOCK_RETIREES: Retreat[] = [
  {
    id: 'r1', title: 'Despertar Espiritual', location: 'Valle Sagrado, Cusco',
    startDate: '2023-11-15', endDate: '2023-11-20', capacity: 20, enrolledCount: 18,
    status: 'Abierto', price: 1200, description: 'Un retiro transformador en el corazón de los Andes.'
  },
  {
    id: 'r2', title: 'Yoga & Surf Camp', location: 'Fuerteventura',
    startDate: '2023-12-15', endDate: '2023-12-20', capacity: 12, enrolledCount: 8,
    status: 'Abierto', price: 950, description: 'Combina la energía del océano con la paz del yoga.'
  },
];
