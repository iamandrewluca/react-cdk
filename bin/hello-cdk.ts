#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { HelloCdkStack } from '../lib/hello-cdk-stack';

const app = new cdk.App();
new HelloCdkStack(app, 'HelloCdkStack');
