export interface Credential {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_name: string;
  created_at: string;
}

export interface CredentialFormData {
  title: string;
  description: string;
  file: File | null;
}