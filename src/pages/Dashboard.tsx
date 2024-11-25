import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { experiences } from '../data/experiences';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet. Start exploring experiences!</p>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => {
                const experience = experiences.find(e => e.id === booking.experienceId);
                if (!experience) return null;

                return (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{experience.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {experience.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {experience.duration}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}