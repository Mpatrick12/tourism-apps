export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  image: string;
  category: 'tour' | 'accommodation' | 'cultural';
  rating: number;
  available: boolean;
}

export interface Booking {
  id: string;
  experienceId: string;
  userId: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  participants: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}