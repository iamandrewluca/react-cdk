import fs from "fs/promises";
import { Construct } from "constructs";

const [_node, _main, libraryName] = process.argv;

const constructNames = await import(libraryName)
  .then(Object.entries)
  .then((e) => e.filter(([_, type]) => isConstruct(type)))
  .then((e) =>
    e.map(([name, type]) => {
      const hasProps = type.length === 1 || type.length === 3;
      //   console.log(name, hasProps, type.length);
      return { name, arity: type.length };
    })
  );

const propsImports = constructNames
  .filter((c) => c.arity === 3)
  .map((c) => `import { ${c.name}Props } from "${libraryName}"`)
  .join("\n");

const exports = constructNames
  .map((c) => `export const ${c.name} = "${libraryName}.${c.name}"`)
  .join("\n");

const intrinsicElements = constructNames
  .map((c) =>
    c.arity === 3 ? `[${c.name}]: ${c.name}Props` : `[${c.name}]: {}`
  )
  .map((ie) => `			${ie}`)
  .join("\n");

const JSX = `
declare global {
	namespace JSX {
		interface IntrinsicElements {
${intrinsicElements}
		}
	}
}`;

const typescript = `
${propsImports}

${exports}
${JSX}
`;

fs.writeFile(`${libraryName.replace("/", "-")}-react.ts`, typescript);

function isConstruct(type) {
  return Construct.isPrototypeOf(type) || type === Construct;
}
