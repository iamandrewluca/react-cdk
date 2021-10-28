/* @jsx createElement */
// ^^^^^^^^^^^^^^^^^^
//          this is called JSX pragma
//          it tells what function to use for creating JSX elements

/** This function is called everytime a JSX `<Example />` is encountered */
const createElement = (type, props, ...children) => ({type, props: {...props, children}});

const Fragment = ({children}) => children

/** This will detect a Construct of other element types */
const isConstruct = type => Construct.isPrototypeOf(type) || type === Construct

/** This function takes an element tree and converts it to a constructs tree */
function render(element, parentConstruct) {
	if (Array.isArray(element)) {
		element.forEach(child => render(child, parentConstruct))
		return
	}

	if (element.type === Fragment) {
		element.props.children.forEach(child => render(child, parentConstruct))
		return
	}

	if (isConstruct(element.type)) {
		const {key, children, ...rest} = element.props
		const construct = new element.type(parentConstruct, key, rest)
		children.forEach(child => render(child, construct))
		return
	}

	const {type, props} = element
	const newElement = type(props)
	render(newElement, parentConstruct)
}

import {Construct} from "constructs";

function FunctionExample({children}) {
	return (
		<Fragment>
			<Construct key="construct-from-function-1"/>
			<Construct key="construct-from-function-2">
				{children}
			</Construct>
		</Fragment>
	)
}

const element = (
	<Construct key="top-construct">
		<FunctionExample>
			<Construct key="inner-construct"/>
		</FunctionExample>
	</Construct>
)

const app = new Construct(undefined, undefined)

render(element, app)

console.log(app);



