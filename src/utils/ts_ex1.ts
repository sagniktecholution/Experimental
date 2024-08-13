export interface Person {
  name: string;
  age: number;
}

export const greet = (person: Person): string => {
  return `Hello, ${person.name}. You are ${person.age} years old.`;
};

const person1: Person = { name: 'John', age: 30 };
console.log(greet(person1));
