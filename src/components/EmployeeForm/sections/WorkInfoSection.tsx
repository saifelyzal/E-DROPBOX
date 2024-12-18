import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Building2, Briefcase, CreditCard, Calendar } from 'lucide-react';
import { DEPARTMENTS } from '../../../types/employee';
import type { EmployeeFormValues } from '../types';

interface WorkInfoSectionProps {
  values: EmployeeFormValues;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function WorkInfoSection({ values, onChange, errors }: WorkInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Work Information</h3>

      <Select
        label="Department"
        value={values.department}
        onChange={(e) => onChange('department', e.target.value)}
        error={errors?.department}
        icon={<Building2 size={20} />}
      >
        <option value="">Select Department</option>
        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </Select>

      <Input
        label="Position"
        type="text"
        value={values.position}
        onChange={(e) => onChange('position', e.target.value)}
        error={errors?.position}
        icon={<Briefcase size={20} />}
      />

      <Input
        label="Employee ID"
        type="text"
        value={values.employeeId}
        onChange={(e) => onChange('employeeId', e.target.value)}
        error={errors?.employeeId}
        icon={<CreditCard size={20} />}
      />

      <Input
        label="Start Date"
        type="date"
        value={values.startDate}
        onChange={(e) => onChange('startDate', e.target.value)}
        error={errors?.startDate}
        icon={<Calendar size={20} />}
      />
    </div>
  );
}