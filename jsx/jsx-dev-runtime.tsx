export function jsxDEV(type: any, props: Record<string, unknown>, key: string) {
  const children = props.children ?? [];
  return {
    type,
    props: {
      ...props,
      key,
      children: Array.isArray(children) ? children : [children],
    },
  };
}
