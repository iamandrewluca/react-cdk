import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { ConstructsJsxStack } from "../lib/constructs-jsx-stack";
import { createRef, render } from "../src/constructs-jsx";

test("SQS Queue Created", () => {
  // Arrange
  const stack = createRef<cdk.Stack>(null);

  // Act
  render(<ConstructsJsxStack ref={stack} />, new cdk.App());

  // Assert
  expectCDK(stack.current!).to(
    haveResource("AWS::SQS::Queue", {
      VisibilityTimeout: 300,
    })
  );
});

test("SNS Topic Created", () => {
  // Arrange
  const stack = createRef<cdk.Stack>(null);

  // Act
  render(<ConstructsJsxStack ref={stack} />, new cdk.App());

  // Assert
  expectCDK(stack.current!).to(haveResource("AWS::SNS::Topic"));
});
