export function jsxDEV(type: any, props: Record<string, unknown>) {
  const children = props.children ?? [];
  return {
    type,
    props: {
      ...props,
      children: Array.isArray(children) ? children : [children],
    },
  };
}
