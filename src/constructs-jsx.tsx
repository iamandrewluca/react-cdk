import { Construct, Node, IConstruct } from "constructs";

export function Fragment({ children }: { children: JSX.Element[] }) {
  return children;
}
export const createRef = useRef;
export function useRef<Current extends Construct>(current?: Current) {
  return { current };
}

const effectQueue: Array<() => void> = [];
export function useLayoutEffect(effect: () => void) {
  effectQueue.push(effect);
}

const isConstruct = (type: unknown): type is typeof Construct =>
  Construct.isPrototypeOf(type as Construct) || type === Construct;

const logPath = (c: IConstruct) => console.log(Node.of(c).path);

export function render(
  element: JSX.Element | JSX.Element[],
  parentConstruct: Construct
) {
  return visit(element, parentConstruct);

  function visit(
    element: JSX.Element | JSX.Element[],
    parentConstruct: Construct,
    index = 0
  ): Construct {
    if (Array.isArray(element)) {
      element.forEach((child, index) => visit(child, parentConstruct, index));
      return parentConstruct;
    }

    if (element.type === Fragment) {
      return visit(element.children, parentConstruct);
    }

    if (isConstruct(element.type)) {
      const { type, children, ref, options, key } = element;

      const construct = new type(
        parentConstruct,
        key ?? `${type.name}-${index}`,
        options
      );

      if (ref) ref.current = construct;

      visit(children, construct);
      return parentConstruct;
    }

    if (element.type instanceof Function) {
      const { type, children, options, key, ref } = element;
      const beforeEffectsCount = effectQueue.length;
      const newElement = type({ ...options, children, key, ref });
      const afterEffectsCount = effectQueue.length;
      const iterable = { length: afterEffectsCount - beforeEffectsCount };

      const construct = visit(newElement, parentConstruct);

      Array.from(iterable, () => {
        const effect = effectQueue.pop();
        if (effect) effect();
      });

      return construct;
    }

    throw new Error(`${element?.type ?? element} is not supported`);
  }
}
