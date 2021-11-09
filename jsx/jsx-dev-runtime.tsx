import { Construct } from "constructs";

export function jsxDEV(type: any, props: any, key: string): JSX.Element {
  return { type, key, props };
}

declare namespace ReactCDK {
  type Key = string;

  type JSXElementConstructor<P> =
    | ((props: P) => ReactElement<any, any>)
    | Construct;

  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: Key | null;
  }
}

declare global {
  namespace JSX {
    interface Element extends ReactCDK.ReactElement<any, any> {}
  }
}
