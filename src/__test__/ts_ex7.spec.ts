import { describe, expect, it } from 'vitest';
import { getArray } from '../utils/ts_ex7';

describe('getArray', () => {
  it('should return a new array with the given items for numbers', () => {
    const result = getArray([1, 2, 3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should return a new array with the given items for strings', () => {
    const result = getArray(['a', 'b', 'c', 'd']);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });
});
