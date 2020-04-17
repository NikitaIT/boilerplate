// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;
/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
export function getUnhandledProps<P extends Props = {}>(
  Component: { handledProps?: string[] } | any,
  props: P,
): Props {
  // Note that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = Component;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(props).reduce<Props>((acc, prop) => {
    if (prop === 'childKey') return acc;
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});
}
