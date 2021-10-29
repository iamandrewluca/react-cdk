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
		return parentConstruct
	}

	if (element.type === Fragment) {
		render(element.props.children, parentConstruct)
		return parentConstruct
	}

	if (isConstruct(element.type)) {
		const {key, children, ...rest} = element.props
		const construct = new element.type(parentConstruct, key, rest)
		console.log(Node.of(construct).path);
		render(children, construct)
		return parentConstruct ?? construct
	}

	// Keep this below isConstruct check
	if (element.type instanceof Function) {
		const {type, props} = element
		const newElement = type(props)
		return render(newElement, parentConstruct)
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

/**
 * App from @aws-cdk/core does not exactly follow Construct constructor
 * https://github.com/aws/aws-cdk/blob/0d7452ee3ce22179242241ed85cf55a173af19b5/packages/%40aws-cdk/core/lib/app.ts#L108
 */
class App extends Construct {
}

const element = (
	<App>
		{/* Path: top-construct */}
		<Construct key="top-construct">
			<FunctionExample>
				{/* Path: top-construct/construct-from-function-2/inner-construct-1 */}
				<Construct key="inner-construct-1"/>
				{/* Path: top-construct/construct-from-function-2/inner-construct-2 */}
				<Construct key="inner-construct-2"/>
			</FunctionExample>
		</Construct>
	</App>
)


const app = render(element)

console.log(app);



