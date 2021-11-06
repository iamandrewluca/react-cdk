// @ts-nocheck
import { Construct, Node } from "constructs";

export const Fragment = ({ children }) => children;
export const useRef = (init?) => ({ current: init });
export const createRef = useRef;

const effectQueue = [];
export const useLayoutEffect = (cb) => effectQueue.push(cb);

const isConstruct = (type) =>
  Construct.isPrototypeOf(type) || type === Construct;

const logPath = (c) => console.log(Node.of(c).path);

export function render(element, parentConstruct?) {
  return visit(element, parentConstruct);

  function visit(element, parentConstruct, index = 0) {
    if (Array.isArray(element) && parentConstruct === undefined) {
      throw new Error(
        "rendering an array of construct elements needs a parentConstruct"
      );
    }

    if (Array.isArray(element)) {
      element.forEach((child, index) => visit(child, parentConstruct, index));
      return parentConstruct;
    }

    if (element.type === Fragment) {
      return visit(element.props.children, parentConstruct);
    }

    if (isConstruct(element.type)) {
      const {
        key = `${element.type.name}-${index}`,
        ref = {},
        children,
        ...rest
      } = element.props;

      const construct =
        element.type.length === 1
          ? new element.type(rest)
          : new element.type(parentConstruct, key, rest);

      ref.current = construct;

      visit(children, construct);
      return parentConstruct ?? construct;
    }

    if (element.type instanceof Function) {
      const { type, props } = element;

      const beforeEffectsCount = effectQueue.length;
      const newElement = type(props);
      const afterEffectsCount = effectQueue.length;
      const iterable = { length: afterEffectsCount - beforeEffectsCount };

      const construct = visit(newElement, parentConstruct);

      Array.from(iterable, () => effectQueue.pop()());

      return construct;
    }

    throw new Error(`${element?.type ?? element} is not supported`);
  }
}
