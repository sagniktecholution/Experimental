import { describe, expect, it } from 'vitest';
import { doubleNumbers } from '../utils/ts_ex2';

describe('doubleNumbers', () => {
  it('should double each number in an array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = doubleNumbers(numbers);
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
  });

  it('should handle an empty array', () => {
    const numbers: number[] = [];
    const doubled = doubleNumbers(numbers);
    expect(doubled).toEqual([]);
  });
});
