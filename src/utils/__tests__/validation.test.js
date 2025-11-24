/**
 * validation utility tests
 */

import { validateField, validateForm, loginSchema, registerSchema } from '../validation';

describe('Validation Utils', () => {
  describe('loginSchema', () => {
    it('should validate correct login credentials', async () => {
      const validData = {
        username: 'testuser',
        password: 'Test1234',
      };

      const result = await validateForm(loginSchema, validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should reject short username', async () => {
      const invalidData = {
        username: 'ab',
        password: 'Test1234',
      };

      const result = await validateForm(loginSchema, invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.username).toBeDefined();
    });

    it('should reject short password', async () => {
      const invalidData = {
        username: 'testuser',
        password: 'Test1',
      };

      const result = await validateForm(loginSchema, invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBeDefined();
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', async () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'Test1234',
        confirmPassword: 'Test1234',
      };

      const result = await validateForm(registerSchema, validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should reject invalid email', async () => {
      const result = await validateField(registerSchema, 'email', 'invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject weak password', async () => {
      const result = await validateField(registerSchema, 'password', 'weakpass');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject mismatched passwords', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'Test1234',
        confirmPassword: 'Different1234',
      };

      const result = await validateForm(registerSchema, invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should return isValid true for valid field', async () => {
      const result = await validateField(loginSchema, 'username', 'validuser');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error message for invalid field', async () => {
      const result = await validateField(loginSchema, 'username', 'ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });
});
