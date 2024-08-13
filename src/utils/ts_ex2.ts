const numbers: number[] = [1, 2, 3, 4, 5];

export const doubleNumbers = (arr: number[]): number[] => {
  return arr.map((num) => num * 2);
};

const doubled: number[] = doubleNumbers(numbers);
console.log(doubled);
