
import { z } from 'zod';

export const bookingSchema = z.object({
  bName: z.string().min(1, 'Name is required'),
  bCheckIn: z.string().nonempty('Check-in date is required'),
  bCheckOut: z.string().nonempty('Check-out date is required'),
  bGuest: z.string().min(1, 'Number of guests is required'),
  bPhone: z.string().min(10, 'Phone number should be at least 10 digits long').regex(/^\d+$/, 'Phone number should contain only digits'),
  
});
