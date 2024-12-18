import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { DEPARTMENTS } from '../../types/employee';
import { Mail, User, Building2, Briefcase, CreditCard, Calendar, Phone } from 'lucide-react';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { WorkInfoSection } from './sections/WorkInfoSection';
import type { EmployeeFormValues } from './types';

interface EmployeeDetailsFormProps {
  values: EmployeeFormValues;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function EmployeeDetailsForm({ values, onChange, errors }: EmployeeDetailsFormProps) {
  return (
    <div className="space-y-6">
      <PersonalInfoSection
        values={values}
        onChange={onChange}
        errors={errors}
      />
      
      <WorkInfoSection
        values={values}
        onChange={onChange}
        errors={errors}
      />

      <div className="space-y-4">
        <Input
          label="Phone Number (Optional)"
          type="tel"
          value={values.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          error={errors?.phoneNumber}
          icon={<Phone size={20} />}
          placeholder="+1234567890"
        />
      </div>
    </div>
  );
}