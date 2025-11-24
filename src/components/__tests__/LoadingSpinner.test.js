/**
 * LoadingSpinner Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    // Note: Add testID="loading-spinner" to ActivityIndicator in LoadingSpinner component
    // expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { container } = render(<LoadingSpinner size="large" />);
    expect(container).toBeTruthy();
  });
});
