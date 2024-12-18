import { supabase } from '../../lib/supabase';
import { BaseService } from '../base.service';
import { storageService } from '../storage';
import { credentialSchema } from './validation';
import type { CreateCredentialDTO, Credential } from './types';
import { AppError } from '../../utils/error';

export class CredentialsService extends BaseService {
  async createCredential(data: CreateCredentialDTO): Promise<Credential> {
    return this.handleServiceError(async () => {
      // Validate credential data
      await credentialSchema.parseAsync({
        title: data.title,
        description: data.description
      });

      // Upload file first
      const fileResult = await storageService.uploadFile(data.file);

      // Create database record
      const { data: credential, error } = await supabase
        .from('employee_credentials')
        .insert([
          {
            title: data.title,
            description: data.description,
            file_path: fileResult.path,
            file_name: fileResult.name,
            file_type: fileResult.type,
            file_size: fileResult.size
          }
        ])
        .select()
        .single();

      if (error) {
        throw new AppError(
          'Failed to create credential record',
          'DATABASE_ERROR',
          error
        );
      }

      return credential;
    });
  }
}