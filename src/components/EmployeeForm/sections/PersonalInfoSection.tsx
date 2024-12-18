import React from 'react';
import { Input } from '../../ui/Input';
import { User, Mail } from 'lucide-react';
import type { EmployeeFormValues } from '../types';

interface PersonalInfoSectionProps {
  values: EmployeeFormValues;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function PersonalInfoSection({ values, onChange, errors }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          value={values.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          error={errors?.firstName}
          icon={<User size={20} />}
        />
        
        <Input
          label="Last Name"
          type="text"
          value={values.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          error={errors?.lastName}
          icon={<User size={20} />}
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors?.email}
        icon={<Mail size={20} />}
      />
    </div>
  );
}