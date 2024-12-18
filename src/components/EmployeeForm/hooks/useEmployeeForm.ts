import { useState } from 'react';
import { employeeSchema } from '../../../services/employee/validation';
import type { EmployeeFormValues } from '../types';

export function useEmployeeForm(initialValues: EmployeeFormValues) {
  const [values, setValues] = useState<EmployeeFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = async () => {
    try {
      await employeeSchema.parseAsync(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const newErrors: Record<string, string> = {};
        if ('errors' in error && Array.isArray(error.errors)) {
          error.errors.forEach((err: any) => {
            if (err.path && err.message) {
              newErrors[err.path.join('.')] = err.message;
            }
          });
        }
        setErrors(newErrors);
      }
      return false;
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    reset
  };
}