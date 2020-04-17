export interface ReadonlyExtendedMap<K, V> extends ReadonlyMap<K, V> {
  reduce(
    callbackfn: (
      previousValue: V,
      currentValue: V,
      key: K,
      map: Map<K, V>,
    ) => V,
  ): V;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: V,
      key: K,
      map: Map<K, V>,
    ) => U,
    initialValue: U,
  ): U;
  map<U>(callbackfn: (value: V, index: number) => U): U[];
  find<S extends V>(
    predicate: (this: void, value: V, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): S | undefined;
  find(predicate: (value: V, index: number) => boolean): V | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter(callbackfn: (value: V, index: number) => any): V[];
  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyExtendedMap<K, V>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): void;
}

/**
 * @internal
 */
export class ExtendedMap<K, V> extends Map<K, V>
  implements ReadonlyExtendedMap<K, V> {
  public reduce<U = V>(
    callbackfn: (
      previousValue: U,
      currentValue: V,
      key: K,
      map: Map<K, V>,
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
    for (const [key, value] of this.entries()) {
      prevValue = callbackfn(prevValue, value, key, this);
    }
    return prevValue;
  }

  public map<U>(callbackfn: (value: V, index: number) => U): U[] {
    const result: U[] = [];
    let index = 0;
    for (const value of this.values()) {
      result.push(callbackfn(value, index++));
    }
    return result;
  }

  public find<S extends V>(
    predicate: (this: void, value: V, index: number) => value is S,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): S | undefined;
  public find(predicate: (value: V, index: number) => boolean): V | undefined {
    let index = 0;
    for (const value of this.values()) {
      if (predicate(value, index++)) {
        return value;
      }
    }
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filter(callbackfn: (value: V, index: number) => any): V[] {
    const result: V[] = [];
    let index = 0;
    for (const value of this.values()) {
      if (callbackfn(value, index++)) {
        result.push(value);
      }
    }
    return result;
  }

  public forEach(
    callbackfn: (value: V, key: K, map: ExtendedMap<K, V>) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
    thisArg?: any,
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn(value, key, this);
    }
  }
}
