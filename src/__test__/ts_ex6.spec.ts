import { UserProfile } from '../utils/ts_ex6';

describe('UserProfile', () => {
  it('should have all properties from User and Employee', () => {
    const userProfile: UserProfile = {
      name: 'Alice',
      age: 25,
      employeeID: 12345,
    };
    expect(userProfile).toHaveProperty('name');
    expect(userProfile).toHaveProperty('age');
    expect(userProfile).toHaveProperty('employeeID');
  });
});
