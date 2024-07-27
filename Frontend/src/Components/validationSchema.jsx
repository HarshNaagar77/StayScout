
import { z } from 'zod';

export const bookingSchema = z.object({
  bName: z.string().min(1, 'Name is required'),
  bCheckIn: z.string().nonempty('Check-in date is required'),
  bCheckOut: z.string().nonempty('Check-out date is required'),
  bGuest: z.string().min(1, 'Number of guests is required'),
  bPhone: z.string().min(10, 'Phone number should be at least 10 digits long').regex(/^\d+$/, 'Phone number should contain only digits'),
  
});

export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').min(1, 'Password is required')
  });

export const loginSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
  });