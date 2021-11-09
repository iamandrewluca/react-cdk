// @ts-nocheck
import * as sns from "@aws-cdk/aws-sns";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";
import { useLayoutEffect, useRef } from "../src/constructs-jsx";

export function ConstructsJsxStack(props: any) {
  const queue = useRef<sqs.Queue>();
  const topic = useRef<sns.Topic>();

  useLayoutEffect(() => {
    // Fake check, in effect refs are always resolved
    if (!queue.current || !topic.current) return;

    const subscription = new subs.SqsSubscription(queue.current);
    topic.current.addSubscription(subscription);
  });

  return (
    <cdk.Stack {...props}>
      <sqs.Queue ref={queue} visibilityTimeout={cdk.Duration.seconds(300)} />
      <sns.Topic ref={topic} />
    </cdk.Stack>
  );
}
