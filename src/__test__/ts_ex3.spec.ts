import { move, Direction } from '../utils/ts_ex3';

describe('move', () => {
  it('should return "Moving up" when direction is Up', () => {
    expect(move(Direction.Up)).toBe('Moving up');
  });

  it('should return "Moving down" when direction is Down', () => {
    expect(move(Direction.Down)).toBe('Moving down');
  });

  it('should return "Moving left" when direction is Left', () => {
    expect(move(Direction.Left)).toBe('Moving left');
  });

  it('should return "Moving right" when direction is Right', () => {
    expect(move(Direction.Right)).toBe('Moving right');
  });
});
