export function getRangeOf<T>(length: number, map: (i: number) => T): T[] {
  return Array.from(new Array(length), (x: undefined, i: number) => map(i));
}

export function getRandomWithUpperBound(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}
