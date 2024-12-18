import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { credentialsService } from '../../services/credentials';
import { isAppError } from '../../utils/error';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EmployeeDetailsForm } from '../EmployeeForm/EmployeeDetailsForm';
import { EmergencyContactForm } from '../EmployeeForm/EmergencyContactForm';
import { employeeSchema } from '../../services/employee/validation';
import type { CreateEmployeeDTO } from '../../types/employee';

export function CredentialUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState<CreateEmployeeDTO>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    employeeId: '',
    startDate: '',
    phoneNumber: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: ''
    }
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleEmployeeDetailsChange = (field: string, value: string) => {
    setEmployeeDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setEmployeeDetails(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value
      }
    }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    setValidationErrors({});

    try {
      // Validate employee details
      await employeeSchema.parseAsync(employeeDetails);

      await credentialsService.createCredential({
        title,
        description,
        file,
        employeeDetails
      });

      setSuccess(true);
      setFile(null);
      setTitle('');
      setDescription('');
      setEmployeeDetails({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        position: '',
        employeeId: '',
        startDate: '',
        phoneNumber: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phoneNumber: ''
        }
      });
    } catch (err) {
      console.error('Error uploading credential:', err);
      if (err instanceof Error) {
        setError(isAppError(err) ? err.message : err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Employee Credential</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Employee credential uploaded successfully!
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Document Details</h3>
            
            <Input
              label="Document Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Document File
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required
                accept={[
                  'application/pdf',
                  'image/jpeg',
                  'image/png',
                  'image/jpg',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ].join(',')}
              />
            </div>
          </div>

          <div className="space-y-6">
            <EmployeeDetailsForm
              values={employeeDetails}
              onChange={handleEmployeeDetailsChange}
              errors={validationErrors}
            />
            
            <EmergencyContactForm
              values={employeeDetails.emergencyContact!}
              onChange={handleEmergencyContactChange}
              errors={validationErrors}
            />
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          icon={<Upload size={20} />}
          className="w-full"
          disabled={!file}
        >
          Upload Credential
        </Button>
      </form>
    </div>
  );
}