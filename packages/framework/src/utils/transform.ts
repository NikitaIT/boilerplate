export function exec(x: () => void): void {
  x();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function combine<T>(args: Array<(x: any) => any>): (x: any) => T {
  return args.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc, f) => (x: any): any => acc(f(x)),
    (x) => x,
  );
}
export function groupBy<T, TKey, TValue = T>(
  list: T[],
  keyGetter: (x: T) => TKey,
  valueGetter?: (x: T) => TValue,
): Map<TKey, TValue[]> {
  const map = new Map();
  const resultOrResult = (item: T) => (valueGetter ? valueGetter(item) : item);
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [resultOrResult(item)]);
    } else {
      collection.push(resultOrResult(item));
    }
  });
  return map;
}

export function unique<T>(values?: ReadonlyArray<T> | null): T[] {
  return Array.from(new Set(values));
}
export function byId<T>(
  id: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  castId?: (x: any) => any,
): (x: { id: T }) => boolean {
  if (!castId) {
    return (x: { id: T }): boolean => x.id === id;
  }
  const tmpId = castId(id);
  return (x: { id: T }): boolean => castId(x.id) === tmpId;
}
/**
 * Удобен для создания comparator
 * @param f1 (x: MyType) => x.id
 * @param f2 (a, b) => a - b
 */
export function mapArgs2<TArg, TK, S>(
  f1: (x: TArg) => TK,
  f2: (a: TK, b: TK) => S,
): (a: TArg, b: TArg) => S {
  return (a: TArg, b: TArg): S => f2(f1(a), f1(b));
}
