export interface ReadonlyExtendedSet<T> extends ReadonlySet<T> {
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      set: Set<T>,
    ) => T,
    initialValue?: T,
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      set: Set<T>,
    ) => U,
    initialValue: U,
  ): U;
  map<U>(callbackfn: (value: T, index: number) => U): U[];
  find<S extends T>(
    predicate: (this: void, value: T, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): S | undefined;
  find(predicate: (value: T, index: number) => boolean): T | undefined;
  some<S extends T>(
    predicate: (this: void, value: T, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): boolean;
  some(predicate: (value: T, index: number) => boolean): boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter(callbackfn: (value: T, index: number) => any): T[];
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void): void;
}

// /**
//  * @internal
//  */
export class ExtendedSet<T> extends Set<T> implements ReadonlyExtendedSet<T> {
  public reduce<U = T>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      index: number,
      set: Set<T>,
    ) => U,
    initialValue?: U,
  ): U {
    let prevValue = initialValue;
    if (typeof prevValue === 'undefined') {
      if (this.size === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      prevValue = (this.values().next().value as unknown) as U;
    }
    let index = 0;
    for (const value of this.values()) {
      prevValue = callbackfn(prevValue, value, index++, this);
    }
    return prevValue;
  }

  public map<U>(callbackfn: (value: T, index: number) => U): U[] {
    const result: U[] = [];
    let index = 0;
    for (const value of this.values()) {
      result.push(callbackfn(value, index++));
    }
    return result;
  }

  public find<S extends T>(
    predicate: (this: void, value: T, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): S | undefined;
  public find(predicate: (value: T, index: number) => boolean): T | undefined {
    let index = 0;
    for (const value of this.values()) {
      if (predicate(value, index++)) {
        return value;
      }
    }
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filter(callbackfn: (value: T, index: number) => any): T[] {
    const result: T[] = [];
    let index = 0;
    for (const value of this.values()) {
      if (callbackfn(value, index++)) {
        result.push(value);
      }
    }
    return result;
  }

  public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void): void {
    for (const value of this.values()) {
      callbackfn(value, value, this);
    }
  }

  public some<S extends T>(
    predicate: (this: void, value: T, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): boolean;
  public some(predicate: (value: T, index: number) => boolean): boolean {
    return (
      this.find(predicate as (value: T, index: number) => value is T) ===
      undefined
    );
  }
}
