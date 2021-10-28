import { Construct } from 'constructs'

class MyConstruct extends Construct {}

const element = <MyConstruct  />

console.log(element);

const output = render(element)

console.log(output)

function render(element: JSX.Element) {
    const { type, props } = element
    const { key, children, ...options } = props

    if (Construct === type || Construct.isPrototypeOf(type)) {
        return new type(undefined, key, options)
    }

    // handle functions

    return undefined
}
