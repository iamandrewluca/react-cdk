/* @jsx createElement */
// ^^^^^^^^^^^^^^^^^^
//          this is called JSX pragma
//          it tells that function to use for creating JSX elements

/** This function is called everytime a JSX `<Example />` is encountered */
const createElement = (type, props, ...children) => ({type, props, children});

/** This function takes a element tree and converts it to a constructs tree */
function render(element) {
}

import { Construct } from "constructs";

function FunctionExample({ children }) {
	return (
		<Construct>
			{children}
		</Construct>
	)
}

const element = (
	<Construct>
		<FunctionExample>
			<Construct />
		</FunctionExample>
	</Construct>
)

console.log(element);

const finalConstruct = render(element)

console.log(finalConstruct)


