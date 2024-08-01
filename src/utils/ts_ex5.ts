type ID = number | string;

export const printID = (id: ID): string => {
  if (typeof id === 'string') {
    return `Your ID is a string: ${id}`;
  } else {
    return `Your ID is a number: ${id}`;
  }
};

console.log(printID(123));
console.log(printID('ABC123'));
