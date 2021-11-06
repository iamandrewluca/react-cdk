// @ts-nocheck
import * as React from "react";
import * as sns from "@aws-cdk/aws-sns";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";
import { useLayoutEffect, useRef } from "react";
import { Queue, Stack, Topic } from "./types";

export class _HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "HelloCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const topic = new sns.Topic(this, "HelloCdkTopic");

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}

export function HelloCdkStack(props) {
  const queue = useRef();
  const topic = useRef();

  useLayoutEffect(() => {
    const sub = new subs.SqsSubscription(queue.current);
    topic.current.addSubscription(sub);
  }, []);

  return (
    <Stack {...props}>
      <Queue
        ref={queue}
        key="HelloCdkQueue"
        visibilityTimeout={cdk.Duration.seconds(300)}
      />
      <Topic ref={topic} key="HelloCdkTopic" />
    </Stack>
  );
}
