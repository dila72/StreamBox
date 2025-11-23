/**
 * useMount Hook
 * Runs an effect only once when component mounts
 */

import { useEffect } from 'react';

export const useMount = (effect) => {
  useEffect(() => {
    return effect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
