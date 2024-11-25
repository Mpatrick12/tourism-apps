import express from 'express';
import cors from 'cors';
import { experiences } from './data.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage for users and bookings
let users = [];
let bookings = [];

// Get all experiences
app.get('/api/experiences', (req, res) => {
  res.json(experiences);
});

// Get single experience
app.get('/api/experiences/:id', (req, res) => {
  const experience = experiences.find(exp => exp.id === req.params.id);
  if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json(experience);
});

// User registration
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find(u => u.email === email);
  
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = {
    id: String(users.length + 1),
    name,
    email,
    password // In a real app, this should be hashed
  };

  users.push(user);
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
});

// User login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Create booking
app.post('/api/bookings', (req, res) => {
  const { experienceId, userId, date, participants } = req.body;
  
  const booking = {
    id: String(bookings.length + 1),
    experienceId,
    userId,
    date,
    participants,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  res.status(201).json(booking);
});

// Get user bookings
app.get('/api/bookings/user/:userId', (req, res) => {
  const userBookings = bookings.filter(booking => booking.userId === req.params.userId);
  res.json(userBookings);
});

// Cancel booking
app.patch('/api/bookings/:id/cancel', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  booking.status = 'cancelled';
  res.json(booking);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});