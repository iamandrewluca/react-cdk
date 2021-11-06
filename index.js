/* @jsx createElement */
// ^^^^^^^^^^^^^^^^^^
//          this is called JSX pragma
//          it tells what function to use for creating JSX elements

import { Construct, Node } from "constructs";

/** This function is called everytime a JSX `<Example />` is encountered */
const createElement = (type, props, ...children) => ({
  type,
  props: { ...props, children },
});

const Fragment = ({ children }) => children;
const useRef = (init) => ({ current: init });
const createRef = useRef;

const effectQueue = [];
const useLayoutEffect = (cb) => effectQueue.push(cb);

/** This will detect a Construct of other element types */
const isConstruct = (type) =>
  Construct.isPrototypeOf(type) || type === Construct;

const logPath = (c) => console.log(Node.of(c).path);

/**
 * This function takes an element tree and converts it to a constructs tree
 * for big element trees this can stack overflow ?!
 */
function render(element, parentConstruct) {
  if (Array.isArray(element) && parentConstruct === undefined) {
    throw new Error(
      "rendering an array of construct elements needs a parentConstruct"
    );
  }

  if (Array.isArray(element)) {
    element.forEach((child) => render(child, parentConstruct));
    return parentConstruct;
  }

  if (element.type === Fragment) {
    return render(element.props.children, parentConstruct);
  }

  if (isConstruct(element.type)) {
    const { key, ref = {}, children, ...rest } = element.props;

    /**
     * App from @aws-cdk/core does not exactly follow Construct constructor
     * https://github.com/aws/aws-cdk/blob/0d7452ee3ce22179242241ed85cf55a173af19b5/packages/%40aws-cdk/core/lib/app.ts#L108
     * try to handle it here
     */
    const construct =
      element.type.length === 1
        ? // constructor that has only props (e.g. @aws-cdk/core/App)
          new element.type(rest)
        : // normal Construct constructor
          new element.type(parentConstruct, key, rest);

    ref.current = construct;

    logPath(construct);

    render(children, construct);
    return parentConstruct ?? construct;
  }

  // Keep this below isConstruct check
  if (element.type instanceof Function) {
    const { type, props } = element;

    const beforeEffectsCount = effectQueue.length;
    const newElement = type(props);
    const afterEffectsCount = effectQueue.length;
    const iterable = { length: afterEffectsCount - beforeEffectsCount };

    const construct = render(newElement, parentConstruct);

    Array.from(iterable, () => effectQueue.pop()());

    return construct;
  }

  throw new Error(`${element.type ?? element} is not supported`);
}

function FunctionExample({ children, ...rest }) {
  const c1 = useRef();
  const c2 = useRef();

  useLayoutEffect(() => {
    logPath(c1.current);
    logPath(c2.current);
  });

  return (
    <Construct {...rest} key="FunctionExampleConstruct">
      <Construct ref={c1} key="construct-from-function-1" />
      <Construct ref={c2} key="construct-from-function-2">
        {children}
      </Construct>
    </Construct>
  );
}

/**
 * Simulate @aws-cdk/core/App with only one constructor argument
 */
class App extends Construct {
  constructor(props) {
    super(undefined, "", props);
  }
}

const appRef = createRef();
const fnRef = createRef();

const app = render(
  <App ref={appRef}>
    <Construct key="top-construct">
      <FunctionExample ref={fnRef}>
        <Construct key="inner-construct-1" />
        <Construct key="inner-construct-2" />
      </FunctionExample>
    </Construct>
  </App>
);

console.log(app === appRef.current);
