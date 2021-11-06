import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { ConstructsJsxStack } from "../lib/constructs-jsx-stack";
import { createRef, render } from "../src/constructs-jsx";

test("SQS Queue Created", () => {
  const stack = createRef();
  // WHEN
  render(
    <cdk.App>
      <ConstructsJsxStack ref={stack} />
    </cdk.App>
  );
  // THEN
  expectCDK(stack.current).to(
    haveResource("AWS::SQS::Queue", {
      VisibilityTimeout: 300,
    })
  );
});

test("SNS Topic Created", () => {
  const stack = createRef();
  // WHEN
  render(
    <cdk.App>
      <ConstructsJsxStack ref={stack} />
    </cdk.App>
  );
  // THEN
  expectCDK(stack.current).to(haveResource("AWS::SNS::Topic"));
});
