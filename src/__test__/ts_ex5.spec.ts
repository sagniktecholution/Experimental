import { describe, expect, it } from 'vitest';
import { printID } from '../utils/ts_ex5';

describe('printID', () => {
  it('should correctly identify and print a number ID', () => {
    expect(printID(123)).toBe('Your ID is a number: 123');
  });

  it('should correctly identify and print a string ID', () => {
    expect(printID('ABC123')).toBe('Your ID is a string: ABC123');
  });
});
