#!/usr/bin/env node
// @ts-nocheck
import * as cdk from "@aws-cdk/core";
import * as React from "react";
import { HelloCdkStack } from "../lib/hello-cdk-stack";
import ReactConstructs from "../src/react-constructs";

const app = new cdk.App();

ReactConstructs.render(<HelloCdkStack key="HelloCdkStack" />, app);
