#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { ConstructsJsxStack } from "../lib/constructs-jsx-stack";
import { render } from "../src/constructs-jsx";

render(<ConstructsJsxStack />, new cdk.App());
