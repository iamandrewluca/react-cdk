import { IConstruct, Construct } from "constructs";

export function jsxDEV(
  type: unknown,
  props: Record<string, unknown>,
  key: string
): JSX.Element {
  const { children = [], ref, ...options } = props;
  return {
    type,
    options,
    children: Array.isArray(children) ? children : [children],
    key,
  };
}

declare module "constructs" {
  // interface IConstruct {
  // options?: Record<string, unknown>;
  // }
}

// https://www.typescriptlang.org/docs/handbook/jsx.html
declare global {
  namespace JSX {
    // interface IntrinsicElements {}

    // interface ElementClass extends Construct {}

    // interface ElementAttributesProperty {
    // @ts-ignore
    // options;
    // }

    // interface IntrinsicAttributes {}

    interface IntrinsicClassAttributes<T> {
      key?: string;
      ref?: { current?: T };
    }

    interface Element {
      type: unknown;
      options: Record<string, unknown>;
      children: JSX.Element | JSX.Element[];
      key?: string;
      ref?: { current: unknown };
    }
  }
}
