/* @jsx createElement */
// ^^^^^^^^^^^^^^^^^^
//          this is called JSX pragma
//          it tells what function to use for creating JSX elements

import {Construct, Node} from "constructs";

/** This function is called everytime a JSX `<Example />` is encountered */
const createElement = (type, props, ...children) => ({type, props: {...props, children}});

const Fragment = ({children}) => children

/** This will detect a Construct of other element types */
const isConstruct = type => Construct.isPrototypeOf(type) || type === Construct

/**
 * This function takes an element tree and converts it to a constructs tree
 * for big element trees this can stack overflow ?!
 */
function render(element, parentConstruct) {
	if (Array.isArray(element)) {
		element.forEach(child => render(child, parentConstruct))
		return
	}

	if (element.type === Fragment) {
		render(element.props.children, parentConstruct)
		return
	}

	if (isConstruct(element.type)) {
		const {key, children, ...rest} = element.props
		const construct = new element.type(parentConstruct, key, rest)
		console.log(Node.of(construct).path);
		render(children, construct)
		return
	}

	// Keep this below isConstruct check
	if (element.type instanceof Function) {
		const {type, props} = element
		const newElement = type(props)
		render(newElement, parentConstruct)
		return
	}

	throw new Error(`${element.type} is not supported`)
}

function FunctionExample({children}) {
	return (
		<Fragment>
			{/* Path: top-construct/construct-from-function-1 */}
			<Construct key="construct-from-function-1"/>
			{/* Path: top-construct/construct-from-function-2 */}
			<Construct key="construct-from-function-2">
				{children}
			</Construct>
		</Fragment>
	)
}

const element = (
	// Path: top-construct
	<Construct key="top-construct">
		<FunctionExample>
			{/* Path: top-construct/construct-from-function-2/inner-construct-1 */}
			<Construct key="inner-construct-1"/>
			{/* Path: top-construct/construct-from-function-2/inner-construct-2 */}
			<Construct key="inner-construct-2"/>
		</FunctionExample>
	</Construct>
)

const app = new Construct(undefined, undefined)

render(element, app)

console.log(app);



