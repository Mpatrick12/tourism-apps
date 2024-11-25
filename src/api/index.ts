import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getExperiences = () => api.get('/experiences');
export const getExperience = (id: string) => api.get(`/experiences/${id}`);
export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (name: string, email: string, password: string) => 
  api.post('/auth/register', { name, email, password });
export const createBooking = (booking: any) => api.post('/bookings', booking);
export const getUserBookings = (userId: string) => api.get(`/bookings/user/${userId}`);
export const cancelBooking = (bookingId: string) => api.patch(`/bookings/${bookingId}/cancel`);