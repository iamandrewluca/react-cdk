import {Construct, ConstructOptions } from 'constructs'

interface ConstructWithProps<Props> {
    props: Props
}

interface MyConstructOptions extends ConstructOptions {
    life: number
}
class MyConstruct extends Construct implements ConstructWithProps<MyConstructOptions> {
    props: MyConstructOptions

    constructor(scope: Construct, id: string, options: MyConstructOptions) {
        super(scope, id, options);
    }
}

const element = <MyConstruct life={42} />

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
