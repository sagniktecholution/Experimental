import { describe, expect, it } from 'vitest';
import { greet, Person } from '../utils/ts_ex1';

describe('greet', () => {
  it('should greet a person with their name and age', () => {
    const person: Person = { name: 'John', age: 30 };
    const greeting = greet(person);
    expect(greeting).toBe('Hello, John. You are 30 years old.');
  });

  it('should greet a person with a different name and age', () => {
    const person: Person = { name: 'Jane', age: 25 };
    const greeting = greet(person);
    expect(greeting).toBe('Hello, Jane. You are 25 years old.');
  });
});
