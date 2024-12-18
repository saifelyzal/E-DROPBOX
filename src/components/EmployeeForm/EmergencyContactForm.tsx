import React from 'react';
import { Input } from '../ui/Input';
import { Phone, User, Heart } from 'lucide-react';
import type { EmergencyContactValues } from './types';

interface EmergencyContactFormProps {
  values: EmergencyContactValues;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function EmergencyContactForm({ values, onChange, errors }: EmergencyContactFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Emergency Contact</h3>
      
      <Input
        label="Contact Name"
        type="text"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors?.name}
        icon={<User size={20} />}
      />
      
      <Input
        label="Relationship"
        type="text"
        value={values.relationship}
        onChange={(e) => onChange('relationship', e.target.value)}
        error={errors?.relationship}
        icon={<Heart size={20} />}
      />
      
      <Input
        label="Contact Phone"
        type="tel"
        value={values.phoneNumber}
        onChange={(e) => onChange('phoneNumber', e.target.value)}
        error={errors?.phoneNumber}
        icon={<Phone size={20} />}
        placeholder="+1234567890"
      />
    </div>
  );
}