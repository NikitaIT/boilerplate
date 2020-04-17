export function resultOrDefaultIf<TCondition, T, TDefault>(
  condition: TCondition | null | undefined,
  fn: (condition: TCondition) => T,
  def: TDefault,
): T | TDefault {
  if (isNotNullOrUndefined(condition) && condition) {
    return fn(condition);
  }
  return def;
}
export function isNotNullOrUndefined<T>(x: T | null | undefined): x is T {
  return x !== null && isNotUndefined(x);
}
export function isNullOrUndefined<T>(
  x: T | null | undefined,
): x is null | undefined {
  return !isNotNullOrUndefined(x);
}
export function isNotUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
export function isNotEmpty<T>(x: T | ''): x is T {
  return x !== '';
}

export function isNotEmptyList<T>(
  getter: (x: T) => ArrayLike<unknown>,
): (x: T) => boolean {
  return (x: T): boolean => getter(x).length !== 0;
}
