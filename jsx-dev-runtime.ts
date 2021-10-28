import { Construct } from "constructs";

export function jsxDEV (type: JSX.Element, props) {
    return { type, props }
}

declare global {
    namespace JSXInfo {
        interface Element<P = any, T extends Construct = Construct> {
            type: T;
            props: P;
            key: string
        }

        class Component<P> {
            constructor(scope: Construct, id: string, props: P);
        }
    }
    namespace JSX {
        interface Element extends JSXInfo.Element<any, any> { }
        interface ElementClass extends JSXInfo.Component<any> {}
        interface ElementAttributesProperty { props: {}; }
    }
}
