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

const effectQueue = [];
const useLayoutEffect = (cb) => effectQueue.push(cb);

/** This will detect a Construct of other element types */
const isConstruct = (type) =>
  Construct.isPrototypeOf(type) || type === Construct;

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

    // console.log(Node.of(construct).path);

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

function FunctionExample({ children }) {
  const c1 = useRef();
  const c2 = useRef();

  useLayoutEffect(() => {
    console.log(Node.of(c1.current).path);
    console.log(Node.of(c2.current).path);
  });

  return (
    <Fragment>
      {/* Path: top-construct/construct-from-function-1 */}
      <Construct ref={c1} key="construct-from-function-1" />
      {/* Path: top-construct/construct-from-function-2 */}
      <Construct ref={c2} key="construct-from-function-2">
        {children}
      </Construct>
    </Fragment>
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

const element = (
  //	Path: top-construct
  <Construct key="top-construct">
    <FunctionExample>
      {/* Path: top-construct/construct-from-function-2/inner-construct-1 */}
      <Construct key="inner-construct-1" />
      {/* Path: top-construct/construct-from-function-2/inner-construct-2 */}
      <Construct key="inner-construct-2" />
    </FunctionExample>
  </Construct>
);

{
  const app = render(<App>{element}</App>);
  console.log(app);
}

{
  const app = new App(undefined);
  const output = render(element, app);
  console.log(app);
  console.log(app === output);
}
