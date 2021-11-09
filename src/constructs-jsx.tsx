import { Construct, IConstruct } from "constructs";

export function Fragment({ children }: { children: JSX.Element[] }) {
  return children;
}

export const createRef = useRef;
export function useRef<Current>(current?: Current) {
  return { current };
}

const effectQueue: Array<() => void> = [];
export function useLayoutEffect(effect: () => void) {
  effectQueue.push(effect);
}

function isConstruct(type: unknown): type is typeof Construct {
  return Construct.isPrototypeOf(type as IConstruct) || type === Construct;
}

export function render(element: JSX.Element, parentConstruct: Construct) {
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
      return visit(element.props.children, parentConstruct);
    }

    if (isConstruct(element.type)) {
      const { key, props, type } = element;
      const { ref, children, ...options } = props;

      const construct = new type(
        parentConstruct,
        key ?? `${type.name}-${index}`,
        options
      );

      if (ref) ref.current = construct;

      if (children) visit(children, construct);
      return parentConstruct;
    }

    if (element.type instanceof Function) {
      const { type, props, key } = element;
      const beforeEffectsCount = effectQueue.length;
      const newElement = type({ ...props, key });
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
