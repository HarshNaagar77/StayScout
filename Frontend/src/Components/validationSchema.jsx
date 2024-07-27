
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

export const placeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    price: z.string().min(1, 'Price is required').regex(/^\d+$/, 'Price must be a valid number'),
    guest: z.string().min(1, 'Number of guests is required').regex(/^\d+$/, 'Number of guests must be a valid number'),
    checkIn: z.string().min(1, 'Check-In date is required'),
    checkOut: z.string().min(1, 'Check-Out date is required'),
    selectedServices: z.array(z.string()).nonempty('At least one service must be selected'),
    selectedCategory: z.string().nonempty('Category is required'),
    additionalDetails: z.array(z.string())
  });