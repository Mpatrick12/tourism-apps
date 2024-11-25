import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Calendar } from 'lucide-react';
import { experiences } from '../data/experiences';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [selectedDate, setSelectedDate] = React.useState('');
  const [participants, setParticipants] = React.useState(1);
  
  const experience = experiences.find(exp => exp.id === id);
  
  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Experience not found</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/');
      return;
    }

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      experienceId: experience.id,
      userId: user.id,
      date: selectedDate,
      status: 'confirmed' as const,
      participants
    };

    addBooking(booking);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="relative h-96">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{experience.title}</h1>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                {experience.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                {experience.duration}
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 text-yellow-400 fill-current" />
                {experience.rating} / 5.0
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">{experience.description}</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
              <li>Expert local guides and instructors</li>
              <li>All necessary equipment and materials</li>
              <li>Traditional welcome refreshments</li>
              <li>Photo opportunities</li>
              <li>Certificate of completion</li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ${experience.price}
                <span className="text-base font-normal text-gray-600">
                  {experience.category === 'accommodation' ? ' / night' : ' / person'}
                </span>
              </h3>
              
              <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                    Number of Participants
                  </label>
                  <select
                    id="participants"
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price ({participants} {participants === 1 ? 'person' : 'people'})</span>
                    <span>${experience.price * participants}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Service fee</span>
                    <span>${Math.round(experience.price * participants * 0.1)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${Math.round(experience.price * participants * 1.1)}</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {user ? 'Book Now' : 'Sign in to Book'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}