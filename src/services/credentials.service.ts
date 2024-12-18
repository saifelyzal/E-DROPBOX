import { supabase } from '../lib/supabase';
import type { CredentialFormData } from '../types/credentials';

export const credentialsService = {
  async uploadCredential({ title, description, file }: CredentialFormData) {
    if (!file) throw new Error('No file selected');

    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('credentials')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create database record
    const { error: insertError } = await supabase
      .from('employee_credentials')
      .insert([
        {
          title,
          description,
          file_path: fileName,
          file_name: file.name,
        },
      ]);

    if (insertError) throw insertError;
  },
};