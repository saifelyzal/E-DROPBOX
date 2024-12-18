export interface EmergencyContactValues {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  employeeId: string;
  startDate: string;
  phoneNumber: string;
  emergencyContact?: EmergencyContactValues;
}

export interface FormSectionProps {
  values: EmployeeFormValues;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}