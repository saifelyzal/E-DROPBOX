import { AuthService } from './auth.service';

const authService = new AuthService();

export { authService };
export * from './types';
export * from './errors';
export * from './constants';