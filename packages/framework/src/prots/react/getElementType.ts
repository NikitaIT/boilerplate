import { ComponentClass, FunctionComponent } from 'react';
export type ElementType<P> =
  | keyof JSX.IntrinsicElements
  | FunctionComponent<P>
  | ComponentClass<P>;
export type Asable<TType extends ElementType<P>, P = {}> = {
  as?: TType;
};
export type Anchorable = {
  href?: string;
};
/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @param {function} [getDefault] A function that returns a default element type.
 * @returns {string|function} A ReactElement type
 */
export function getElementType<
  TType extends ElementType<P>,
  P extends Asable<TType, P> & Anchorable = {}
>(
  Component: { defaultProps?: Partial<P> },
  props: P,
  getDefault?: () => TType,
): TType | 'a' | 'div' {
  const { defaultProps = {} as Asable<TType, P> } = Component;

  // ----------------------------------------
  // user defined "as" element type

  if (props.as && props.as !== defaultProps.as) return props.as;

  // ----------------------------------------
  // computed default element type

  if (getDefault) {
    const computedDefault = getDefault();
    if (computedDefault) return computedDefault;
  }

  // ----------------------------------------
  // infer anchor links

  if (props.href) return 'a';

  // ----------------------------------------
  // use defaultProp or 'div'

  return defaultProps.as || 'div';
}
