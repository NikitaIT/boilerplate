export function trim(x: string): string {
  return x.trim();
}
// приводить к верхнему регистру для сравнения, а не к нижнему
export function toUpperCase(target: string): string {
  return target.toUpperCase();
}
export function includes(target: string, searchString: string): boolean {
  return target.includes(searchString);
}
export function sub(a: number, b: number): number {
  return a - b;
}
export function toId<T>(x: { id: T }): T {
  return x.id;
}
export function toSplitedBy(
  splitter: { [Symbol.split](string: string, limit?: number): string[] },
  limit?: number,
): (x: string) => string[] {
  return (x: string): string[] => x.split(splitter, limit);
}
