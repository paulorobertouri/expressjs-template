import { describe, it, expect } from 'vitest';
import { AuthService } from '../../src/services/index.js';

describe('AuthService', () => {
  const authService = new AuthService();

  it('should issue a valid token', () => {
    const token = authService.issueToken('test-user');
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  it('should validate a token successfully', () => {
    const token = authService.issueToken('test-user');
    const claims = authService.validateToken(token);
    expect(claims).toBeTruthy();
    expect(claims?.sub).toBe('test-user');
  });

  it('should reject an invalid token', () => {
    const claims = authService.validateToken('invalid.token.here');
    expect(claims).toBeNull();
  });

  it('should reject a token signed with a different secret', () => {
    const token = authService.issueToken('test-user');
    const authServiceWithDifferentSecret = new AuthService();
    process.env.JWT_SECRET =
      'different-secret-key-at-least-32-characters-long-for-hs256';
    const differentService = new AuthService();
    const claims = differentService.validateToken(token);
    expect(claims).toBeNull();
  });
});
