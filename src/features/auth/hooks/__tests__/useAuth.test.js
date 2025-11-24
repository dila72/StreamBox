/**
 * useAuth Hook Tests
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { useAuth } from '../useAuth';
import { createTestStore } from '../../../utils/testUtils';

describe('useAuth Hook', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should return initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should have login and logout functions', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });
});
