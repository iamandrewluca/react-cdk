/* @jsx jsx */

/**
 * @param {Function|Construct} type
 * @param {null|array} props
 * @param {undefined|array|object} children
 */
function jsx(type, props, ...children) {
	return { type, props, children }
}

import { Construct } from "constructs";

const construct = (
	<Construct>
		<Construct />
		<Construct />
	</Construct>
)

console.log(construct);

