/**
 * useFavorites Hook Tests
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { useFavorites } from '../useFavorites';
import { createTestStore, mockMovie } from '../../../utils/testUtils';

describe('useFavorites Hook', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should return initial favorites state', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should have toggle favorite function', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(typeof result.current.toggleFavorite).toBe('function');
    expect(typeof result.current.isFavorite).toBe('function');
  });

  it('should check if movie is favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    const isFav = result.current.isFavorite(mockMovie.id);
    expect(typeof isFav).toBe('boolean');
  });
});
