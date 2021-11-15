import fs from "fs/promises";
import { Construct } from "constructs";

const [_node, _main, libraryName] = process.argv;

const constructNames = await import(libraryName)
  .then(Object.entries)
  .then((e) => e.filter(([_, type]) => isConstruct(type)))
  .then((e) => e.map(([name]) => name));

const propsImports = constructNames
  .map((name) => `import { ${name}Props } from "${libraryName}"`)
  .join("\n");

const exports = constructNames
  .map((name) => `export const ${name} = "${libraryName}.${name}"`)
  .join("\n");

const intrinsicElements = constructNames
  .map((name) => `			[${name}]: ${name}Props`)
  .join("\n");

const ts = String.raw;

const JSX = ts`
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
