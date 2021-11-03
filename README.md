## RFC

- https://github.com/aws/aws-cdk-rfcs/issues/256
- https://github.com/aws/aws-cdk-rfcs/pull/258

## Instructions

```shell
npm install
npm test
```

## TODO

- compare React.Component with Construct
- try to fix Construct props using JSX namespace
- map key prop to id
- map rest props as props
- use parent element as this/scope
- ref on a component should return actual Construct instance
- no useEffect, only useLayoutEffect
- maybe JSX expression returns Construct


## Links

- https://dev.to/iamandrewluca/jsx-at-lowest-level-371b
- https://www.thisdot.co/blog/how-to-create-a-custom-react-renderer
- https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/core/lib/stage.ts
- https://github.com/aws/aws-cdk/tree/master/packages/decdk
- https://github.com/aws/aws-cdk
- https://www.typescriptlang.org/docs/handbook/jsx.html
- https://github.com/aws/constructs/blob/main/src/construct.ts
- https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
- https://javascript.info/instanceof
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf

## Possible example

```tsx
import { Topic } from '@aws-cdk/aws-sns';
import { SqsSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Queue } from '@aws-cdk/aws-sqs';
import { Stack, App, StackProps, Duration } from '@aws-cdk/core';

export class HelloCdkStackImperative extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new Queue(this, 'HelloCdkQueue', {
      visibilityTimeout: Duration.seconds(300),
    });

    const topic = new Topic(this, 'HelloCdkTopic');

    topic.addSubscription(new SqsSubscription(queue));
  }
}

const React = {}
function useEffect(...args: any[]): any {}
function useRef(...args: any[]): any {}

function HelloCdkStackDeclarative(props: any) {
  const queue: Queue = useRef()
  const topic: Topic = useRef()

  useEffect(() => topic.addSubscription(new SqsSubscription(queue)))

  return (
    <Stack {...props}>
      <Queue ref={queue} visibilityTimeout={Duration.seconds(300)} />
      <Topic ref={topic} />
    </Stack>
  )
}
```
