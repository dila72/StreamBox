/**
 * useMovies Hook Tests
 */

import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { useMovies } from '../useMovies';
import { createTestStore } from '../../../utils/testUtils';

describe('useMovies Hook', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should return initial movies state', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    expect(result.current.trending).toEqual([]);
    expect(result.current.popular).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should have movie fetching functions', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    expect(typeof result.current.getTrending).toBe('function');
    expect(typeof result.current.getPopular).toBe('function');
    expect(typeof result.current.search).toBe('function');
  });

  it('should have computed properties', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    expect(typeof result.current.hasTrendingMovies).toBe('boolean');
    expect(typeof result.current.hasSearchResults).toBe('boolean');
  });
});
