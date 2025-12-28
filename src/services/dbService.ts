import { db } from '../firebase/config';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    query,
    where,
    onSnapshot,
    runTransaction,
    Timestamp
} from 'firebase/firestore';
import { User, YogaClass, Booking } from '../../types';

export const dbService = {
    // Perfiles
    getUserProfile: async (uid: string) => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as User : null;
    },

    createUserProfile: async (user: User) => {
        const docRef = doc(db, 'users', user.id);
        return setDoc(docRef, {
            ...user,
            updatedAt: Timestamp.now()
        });
    },

    updateUserProfile: async (uid: string, data: Partial<User>) => {
        const docRef = doc(db, 'users', uid);
        return updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
    },

    // Clases
    getClasses: (callback: (classes: YogaClass[]) => void) => {
        const q = query(collection(db, 'classes'));
        return onSnapshot(q, (querySnapshot) => {
            const classes = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as YogaClass));
            callback(classes);
        });
    },

    // Reservas con Transacción
    bookClass: async (studentId: string, classId: string) => {
        const userRef = doc(db, 'users', studentId);
        const classRef = doc(db, 'classes', classId);
        const bookingRef = doc(collection(db, 'bookings'));

        return runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            const classDoc = await transaction.get(classRef);

            if (!userDoc.exists() || !classDoc.exists()) {
                throw "Documento no encontrado";
            }

            const userData = userDoc.data() as User;
            const classData = classDoc.data() as YogaClass;

            if (userData.sessionsLeft <= 0) {
                throw "No tienes sesiones disponibles";
            }

            if (classData.bookedCount >= classData.capacity) {
                throw "La clase está llena";
            }

            // Actualizar usuario
            transaction.update(userRef, {
                sessionsLeft: userData.sessionsLeft - 1,
                updatedAt: Timestamp.now()
            });

            // Actualizar clase
            transaction.update(classRef, {
                bookedCount: (classData.bookedCount || 0) + 1,
                updatedAt: Timestamp.now()
            });

            // Crear reserva
            transaction.set(bookingRef, {
                studentId,
                classId,
                status: 'Confirmada',
                createdAt: Timestamp.now()
            });
        });
    },
    // Coach: Actualizar estado de clase
    updateClassStatus: async (classId: string, status: 'Programada' | 'En Curso' | 'Finalizada') => {
        const classRef = doc(db, 'classes', classId);
        return updateDoc(classRef, {
            status,
            updatedAt: Timestamp.now()
        });
    },

    // Coach: Obtener alumnos inscritos en una clase
    getEnrolledStudents: (classId: string, callback: (bookings: (Booking & { studentName?: string; studentAvatar?: string })[]) => void) => {
        const q = query(collection(db, 'bookings'), where('classId', '==', classId));
        return onSnapshot(q, async (querySnapshot) => {
            const bookings = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Booking));

            // Nota: En una app real, haríamos un Join o traeríamos la info de los usuarios por separado.
            // Para el prototipo, asumimos que los datos del estudiante están en el documento o se traen aparte.
            callback(bookings);
        });
    },

    // Coach: Realizar Check-in
    checkInStudent: async (bookingId: string) => {
        const bookingRef = doc(db, 'bookings', bookingId);
        return updateDoc(bookingRef, {
            checkedIn: true,
            checkInTime: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
    }
};
