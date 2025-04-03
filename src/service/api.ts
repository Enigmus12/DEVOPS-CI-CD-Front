// src/services/api.ts
import axios from 'axios';



/**
 * API service for handling authentication and booking operations.
 * Utilizes axios for HTTP requests and includes interceptors for token management.
 * @module api
 */
// Configuración base para axios
const API_BASE_URL = 'https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a las solicitudes autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Make sure headers exists before trying to set a property on it
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios para generar y limpiar bookings
export const bookingGenerateService = {
  generateBookings: async (min = 100, max = 1000) => {
    const response = await api.post(`/generate-service/generate-bookings?min=${min}&max=${max}`);
    return response.data;
  },
};

// Servicios para autenticación y usuarios
export const authService = {
  login: async (credentials: { userId: string; password: string }) => {
    const response = await api.post('/user-service/login', credentials);
    return response.data;
  },
  
  register: async (userData: { 
    userId: string; 
    email: string; 
    password: string; 
    passwordConfirmation: string 
  }) => {
    const response = await api.post('/user-service/register', userData);
    return response.data;
  },
  
  getAllUsers: async () => {
    const response = await api.get('/user-service/users');
    return response.data;
  },
  
  getUser: async (userId: string) => {
    const response = await api.get(`/user-service/users/${userId}`);
    return response.data;
  },
  
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/user-service/users/${userId}`);
    return response.data;
  }
};

// Servicios para reservas (bookings)
export const bookingService = {
  getAllBookings: async () => {
    const response = await api.get('/booking-service/bookings');
    return response.data;
  },
  
  getMyReservations: async () => {
    const response = await api.get('/booking-service/my-reservations');
    return response.data;
  },
  
  getBooking: async (bookingId: string) => {
    const response = await api.get(`/booking-service/bookings/${bookingId}`);
    return response.data;
  },
  
  createBooking: async (bookingData: any) => {
    const response = await api.post('/booking-service/bookings', bookingData);
    return response.data;
  },
  
  deleteBooking: async (bookingId: string) => {
    const response = await api.delete(`/booking-service/bookings/${bookingId}`);
    return response.data;
  },
  
  makeReservation: async (bookingId: string) => {
    const response = await api.put(`/booking-service/bookings/make/${bookingId}`);
    return response.data;
  },
  
  cancelReservation: async (bookingId: string) => {
    const response = await api.put(`/booking-service/bookings/cancel/${bookingId}`);
    return response.data;
  }
};

export default api;