interface User {
  name: string;
  age: number;
}

interface Employee {
  employeeID: number;
}

export type UserProfile = User & Employee;

const userProfile: UserProfile = {
  name: 'Alice',
  age: 25,
  employeeID: 12345,
};

console.log(userProfile);
