import { z } from 'zod';
import { DEPARTMENTS } from '../../types/employee';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phoneNumber: z.string()
    .regex(phoneRegex, 'Invalid phone number format')
    .min(1, 'Emergency contact phone is required')
});

export const employeeSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  department: z.enum(DEPARTMENTS as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid department' })
  }),
  position: z.string()
    .min(1, 'Position is required')
    .max(100, 'Position must be less than 100 characters'),
  employeeId: z.string()
    .min(1, 'Employee ID is required')
    .max(20, 'Employee ID must be less than 20 characters'),
  startDate: z.string()
    .min(1, 'Start date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  phoneNumber: z.string()
    .regex(phoneRegex, 'Invalid phone number format')
    .optional(),
  emergencyContact: emergencyContactSchema.optional()
});