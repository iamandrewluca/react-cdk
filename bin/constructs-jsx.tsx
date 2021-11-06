#!/usr/bin/env node
// @ts-nocheck
import * as cdk from "@aws-cdk/core";
import { ConstructsJsxStack } from "../lib/constructs-jsx-stack";
import { render } from "../src/constructs-jsx";

render(
  <cdk.App>
    <ConstructsJsxStack />
  </cdk.App>
);
