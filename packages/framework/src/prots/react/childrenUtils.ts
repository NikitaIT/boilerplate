import { Children } from 'react';

type Typed<TType> = { type: TType };
function byType<T extends Typed<TType>, TType>(type: TType): (x: T) => boolean {
  return (x: T): boolean => x.type === type;
}
/**
 * Determine if child by type exists in children.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {Boolean}
 */
export function someByType<T extends { type: TType }, TType>(
  children: T,
  type: TType,
): boolean {
  return Children.toArray(children).some(byType(type));
}

/**
 * Find child by type.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {undefined|Object}
 */
export function findByType<T extends { type: TType }, TType>(
  children: T,
  type: TType,
): T | undefined {
  return Children.toArray(children).find(byType(type));
}
/**
 * Tests if children are nil in React and Preact.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */
export function isNullOrUndefinedOrEmpty<T>(
  children: T | null | undefined | Array<T | null | undefined>,
): children is T {
  return (
    children === null ||
    children === undefined ||
    (Array.isArray(children) && children.length === 0)
  );
}
