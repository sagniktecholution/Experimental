export const getArray = <T>(items: T[]): T[] => {
  return new Array<T>().concat(items);
};

const numArray = getArray([1, 2, 3, 4]);
const strArray = getArray(['a', 'b', 'c', 'd']);

console.log(numArray);
console.log(strArray);
