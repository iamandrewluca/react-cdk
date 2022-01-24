import { Construct } from "constructs";

// Base Construct does not have third argument props
// Most of constructs that extend it, have 3rd argument
interface ConstructWithProps extends Construct {
	new (scope: Construct, id: string, props: Record<string, unknown>): Construct;
}

export function Fragment({ children }: { children: JSX.Element[] }) {
	return children;
}

interface RefObject<T> {
	readonly current: T | null;
}

export const createRef = useRef;
export function useRef<T>(initialValue: T | null): RefObject<T> {
	return { current: initialValue };
}

const effectQueue: Array<() => void> = [];
export function useLayoutEffect(effect: () => void) {
	effectQueue.push(effect);
}

function isConstruct(type: unknown): type is ConstructWithProps {
	return Construct.isPrototypeOf(type as Construct) || type === Construct;
}

export function render(element: JSX.Element, parentConstruct: Construct) {
	return visit(element, parentConstruct);

	function visit(
		element: JSX.Element | JSX.Element[],
		parentConstruct: Construct,
		index = 0,
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
				options,
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
			const effectsCount = afterEffectsCount - beforeEffectsCount;

			const construct = visit(newElement, parentConstruct);

			Array.from({ length: effectsCount }, () => {
				const effect = effectQueue.pop();
				if (effect) effect();
			});

			return construct;
		}

		throw new Error(`${element?.type ?? element} is not supported`);
	}
}

export function createElement(type: any, props: any, key: string): JSX.Element {
	return { type, key, props };
}

type Key = string;

type JSXElementConstructor<P> =
	| ((props: P) => ReactElement<any, any>)
	| Construct;

interface ReactElement<
	P = any,
	T extends string | JSXElementConstructor<any> =
		| string
		| JSXElementConstructor<any>,
> {
	type: T;
	props: P;
	key: Key | null;
}

interface RefObject<T> {
	readonly current: T | null;
}
type Ref<T> = RefObject<T> | null;

interface Attributes {
	key?: Key | null | undefined;
}

interface ClassAttributes<T> extends Attributes {
	ref?: Ref<T> | undefined;
}

declare global {
	namespace JSX {
		interface Element extends ReactElement<any, any> {}
		interface IntrinsicAttributes extends Attributes {}
		interface IntrinsicClassAttributes<T> extends ClassAttributes<T> {}
	}
}
