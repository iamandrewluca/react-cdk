// @ts-nocheck
import { Construct } from "@aws-cdk/core";
import { ReactNode } from "react";
import * as Reconciler from "react-reconciler";
import { map } from "../lib/types";

const Renderer = Reconciler({
  supportsHydration: false,
  supportsMutation: true,
  supportsPersistence: true,

  getRootHostContext(nextRootInstance) {
    return nextRootInstance;
  },
  prepareForCommit() {
    return null;
  },
  resetAfterCommit() {},
  getChildHostContext(context, type, rootInstance) {
    // console.log({ type });
    return context;
  },
  shouldSetTextContent() {
    return false;
  },
  createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    console.log({ type });
    const Construct = map[type];
    return new Construct(undefined, Math.random().toString(), newProps);
  },
  finalizeInitialChildren() {
    return false;
  },
  appendInitialChild() {},
  clearContainer() {},
  appendChildToContainer() {},
  getPublicInstance(instance) {
    return instance;
  },
});

export default {
  render(element: ReactNode, construct: Construct) {
    const container = Renderer.createContainer(construct, 0, false, null);
    Renderer.updateContainer(element, container, null);
  },
};
