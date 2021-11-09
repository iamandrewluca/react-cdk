import * as sns from "@aws-cdk/aws-sns";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";
import { useLayoutEffect, useRef } from "../src/constructs-jsx";

type ConstructsJsxStackProps = {
  stackProps?: cdk.StackProps;
  ref: { current?: cdk.Stack };
};

export function ConstructsJsxStack(props: ConstructsJsxStackProps) {
  const queue = useRef<sqs.Queue>();
  const topic = useRef<sns.Topic>();

  useLayoutEffect(() => {
    const subscription = new subs.SqsSubscription(queue.current!);
    topic.current!.addSubscription(subscription);
  });

  return (
    <cdk.Stack {...props.stackProps}>
      <sqs.Queue ref={queue} visibilityTimeout={cdk.Duration.seconds(300)} />
      <sns.Topic ref={topic} />
    </cdk.Stack>
  );
}
