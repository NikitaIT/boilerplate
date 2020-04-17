export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (refEqual(a, b)) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.
  if (isEntityArray(a) && isEntityArray(b)) {
    return orderedArraysEqual(
      a.sort((a1, b1) => a1.id - b1.id),
      b.sort((a1, b1) => a1.id - b1.id),
    );
  }
  return orderedArraysEqual(a, b);
}
function orderedArraysEqual<T>(a: T[], b: T[]) {
  for (let i = 0; i < a.length; ++i) {
    if (!equal(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
function isEntityArray<T>(a: T[]): a is Array<T & { id: number }> {
  return a.length > 0 && typeof a[0] === 'object' && 'id' in a[0];
}
export function equal<T>(a: T, b: T): boolean {
  if (refEqual(a, b)) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return arraysEqual(a, b);
  }
  if (a == null || b == null) {
    return false;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const aK = Object.keys(a).sort();
    const bK = Object.keys(b).sort();
    if (!arraysEqual(aK, bK)) {
      return false;
    }

    return Object.entries(a).every(([key, value]) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      equal((b as any)[key], value),
    );
  }
  return false;
}
export function refEqual<T>(a: T, b: T): boolean {
  return a === b;
}
