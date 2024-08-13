export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const move = (direction: Direction): string => {
  switch (direction) {
    case Direction.Up:
      return 'Moving up';
    case Direction.Down:
      return 'Moving down';
    case Direction.Left:
      return 'Moving left';
    case Direction.Right:
      return 'Moving right';
    default:
      return '';
  }
};

console.log(move(Direction.Up));
