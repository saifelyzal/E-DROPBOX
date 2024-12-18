import React from 'react';
import { Input } from '../ui/Input';
import { FileText } from 'lucide-react';

interface DocumentUploadSectionProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
}

export function DocumentUploadSection({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onFileChange
}: DocumentUploadSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Document Details</h3>
      
      <Input
        label="Document Title"
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
        maxLength={100}
        icon={<FileText size={20} />}
      />

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
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
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
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
  );
}