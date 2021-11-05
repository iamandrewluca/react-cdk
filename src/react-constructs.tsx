import { Construct } from "@aws-cdk/core";
import { ReactNode } from "react";
import * as Reconciler from "react-reconciler";

// @ts-ignore
const Renderer = Reconciler({
  supportsHydration: false,
  supportsMutation: false,
  supportsPersistence: false,
  getRootHostContext() {
    return {};
  },
  prepareForCommit() {
    return null;
  },
  resetAfterCommit() {},
  createInstance(type, props, rootContainer, hostContext, internalHandle) {
    console.log(arguments);
    return {};
  },
});

export default {
  render(element: ReactNode, construct: Construct) {
    const container = Renderer.createContainer(construct, 0, false, null);
    Renderer.updateContainer(element, container, null);
  },
};
