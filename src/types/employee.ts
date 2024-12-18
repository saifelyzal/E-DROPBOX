export interface EmployeeDetails {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  employeeId: string;
  startDate: string;
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

export type CreateEmployeeDTO = Omit<EmployeeDetails, 'id'>;

export interface Department {
  id: string;
  name: string;
}

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Legal',
  'Research & Development'
] as const;