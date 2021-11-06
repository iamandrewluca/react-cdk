#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { ConstructsJsxStack } from "../lib/constructs-jsx-stack";

const app = new cdk.App();
new ConstructsJsxStack(app, "ConstructsJsxStack");
