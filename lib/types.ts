import * as sns from "@aws-cdk/aws-sns";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";

export const Stack = "@aws-cdk/core/Stack";
export const Queue = "@aws-cdk/aws-sqs/Queue";
export const Topic = "@aws-cdk/aws-sns/Topic";

export const map = {
    [Stack]: cdk.Stack,
    [Queue]: sqs.Queue,
    [Topic]: sns.Topic,
};