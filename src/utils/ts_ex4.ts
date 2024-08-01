const tuple: [string, number] = ['Age', 30];

const printTuple = (t: [string, number]): string => {
  return `${t[0]}: ${t[1]}`;
};

console.log(printTuple(tuple));
