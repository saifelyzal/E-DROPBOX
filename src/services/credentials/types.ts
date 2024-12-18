export interface Credential {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface CreateCredentialDTO {
  title: string;
  description: string;
  file: File;
}