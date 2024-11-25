import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '../types';
import { createBooking as apiCreateBooking, getUserBookings, cancelBooking as apiCancelBooking } from '../api';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserBookings();
    }
  }, [user]);

  const loadUserBookings = async () => {
    if (user) {
      try {
        const response = await getUserBookings(user.id);
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      }
    }
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'status'>) => {
    try {
      const response = await apiCreateBooking(bookingData);
      setBookings([...bookings, response.data]);
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const response = await apiCancelBooking(bookingId);
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? response.data : booking
      ));
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    }
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      cancelBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}