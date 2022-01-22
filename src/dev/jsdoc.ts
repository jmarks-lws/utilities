
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import jsdoc from 'jsdoc-to-markdown';
import { max } from '../arrays/max';
import { pluck } from '../objects/pluck';
import { mapAsync } from '../functional';

export type TJsonDocData = {
  comment: string,
  name: string,
  description: string,
  longname: string,
  scope: string,
  kind: string,
  params?: {
    name: string,
    type?: string,
    optional?: boolean,
    description?: string,
  }[],
  returns?: {
    type?: string,
    description: string,
  },
  meta: {
    filename: string,
    path: string,
  },
  undocumented: boolean,
};

const getRawJsdocData = async (path: string): Promise<TJsonDocData[]> => {
  const filesRoute = `./dist/${path}`;
  return ((await jsdoc.getJsdocData({
    'no-cache': true,
    files: filesRoute,
    // configure: `./jsdoc2md.json`,
  })) as TJsonDocData[])
    .filter((r) => r.kind === 'function' || (r.scope === 'global' && !r.undocumented));
};

const jsdocToMarkdown = (jsdocData: TJsonDocData) => {
  const longestFieldLength = (field: string) => (
    max((jsdocData.params ?? []).map((d) => (pluck(d, field as any) ?? '').toString().length) ?? [0])
  );
  const longestFields: [ number, number, number ] = [
    max([longestFieldLength('name'), 'Name'.length]),
    max([longestFieldLength('type'), 'Type'.length]),
    max([longestFieldLength('description'), 'Description'.length]),
  ];
  const drawCell = (length: number, value: string) => {
    const padding = ' '.repeat(length - value.length);
    return `| ${value}${padding} `;
  };
  const [ lenName, lenType, lenDescription ] = longestFields;
  // const lineLength = 4 + lenName + 4 + lenType + 4 + lenDescription + 10;
  const drawLine = () => (
    `| ${'-'.repeat(lenName)} | ${'-'.repeat(lenType)} | ${'-'.repeat(8)} | ${'-'.repeat(lenDescription)} |`
  );
  const drawHeader = () => {
    const name = drawCell(lenName, 'Name');
    const type = drawCell(lenType, 'Type');
    const optional = drawCell(8, 'Required');
    const description = drawCell(lenDescription, 'Description');
    return `${name}${type}${optional}${description}|\n${drawLine()}\n`;
  };
  const parametersParagraph = (
    ((jsdocData.params?.length ?? 0) > 0)
      ? (
        `\n\n### Parameters\n\n${drawHeader()}${(jsdocData.params || []).map((param) => {
          const paramName = param.name;
          const paramType = param.type || '';
          const paramOptional = param.optional ? 'no' : 'yes';
          const paramDescription = param.description || '';
          return (
            `${drawCell(lenName, paramName)}`
          + `${drawCell(lenType, paramType)}`
          + `${drawCell(8, paramOptional)}`
          + `${drawCell(lenDescription, paramDescription)}`
          + `|`
          );
        }).join('\n')}`
      )
      : ''
  );
  const functionSignature = (data: TJsonDocData) => {
    const paramSignature = (
      (jsdocData.params ?? []).map((param) => `${param.name}`).join(', ')
    );
    return `${jsdocData.name}(${paramSignature})`;
  };
  return (
    `## ${jsdocData.name}\n\n`
    + `> ${(jsdocData.description ?? '').replace('\n', '')}\n`
    + `\`\`\`js\n${functionSignature(jsdocData)}\n\`\`\`\n\n`
    + `${parametersParagraph}`
  );
};

const fileToMarkdown = async (filepath: string, header?: string) => {
  console.log(`Parsing file: ${filepath}`);
  const jsdocData = (await getRawJsdocData(`${filepath}.js`)).filter((r) => !r.undocumented);

  const markdownByFunction = (
    jsdocData
      .sort((a: any, b: any) => a.name.localeCompare(b.name))
      .map((docdata:any) => jsdocToMarkdown(docdata))
  );
  const filename = `./docs/${filepath}.md`;

  const finalMarkdown = (
    `${header || ''}${markdownByFunction.join('\n\n')}`
  );

  fs.writeFileSync(filename, finalMarkdown);

  return filename;
};

const directoryToMarkdown = async (directory: string, header?: string) => {
  console.log(`Parsing directory: ${directory}`);
  const jsdocData = await getRawJsdocData(`${directory}/*.js`);

  const markdownByFunction = (
    jsdocData
      .sort((a: any, b: any) => a.name.localeCompare(b.name))
      .map((docdata:any) => jsdocToMarkdown(docdata))
  );
  const filename = `./docs/${directory}.md`;

  const finalMarkdown = (
    `${header || ''}${markdownByFunction.join('\n\n')}`
  );

  fs.writeFileSync(filename, finalMarkdown);

  return filename;
};

const buildMainDoc = () => {
  const header = `# Utilities
  A series of useful functions, heavily tested and strongly typed via Typescript declarations. Inspired by functional
  philosophies, but not claiming to be a functional library (yet, anyhow).

  Each function in this library adheres to the rule that it will never change the data provided to it as input. It will
  always return a new value.

  These functions are intended to simplify code in consuming applications by abstracting common code tasks and control
  structures into composable, mockable, "unit testable", declarative functions.

  Some of these merely wrap common tasks with a declarative word or two to better describe what they do, others
  abstract more complex functionality. A few - like \`branch\` - wrap code structures in functions, which allows
  for some fun functional funny-business, like partial application and currying.

  ## Categories
    - [Arrays](docs/arrays.md)
    - [Async Helpers](docs/async-helpers.md)
    - [Dates](docs/dates.md)
    - [Structure and Flow Functions](docs/functional.md)
    - [Logical Operating Functions](docs/logical.md)
    - [Memoization](docs/memoize.md)
    - [Miscellaneous](docs/misc.md)
    - [Objects](docs/objects.md)
    - [Pipes](docs/pipe.md)
    - [String Functions](docs/string.md)
  `;

  return fs.writeFileSync('README.md', header);
};

const main = async () => {
  await jsdoc.clear();

  const topLevelDirectories = [
    'arrays',
    'async-helpers',
    'dates',
    'misc',
    'objects',
  ];

  const headers = {
    arrays: `# Arrays\n\nAn arsenal of functions for working with arrays without modifying the source array.\n\n`,
    'async-helpers': (
      `# Asynchronous Helper Functions\n\n`
      + `Functions which abstract working with asynchronous code to make it feel more natural.\n\n`
    ),
    dates: `# Date Functions\n\nFunctions for working with dates.\n\n`,
    misc: `# Miscellanous Helper Functions\n\nFunctions to use to write more declaritive semantic code.\n\n`,
    objects: `# Objects\n\nAn arsenal of functions for working with objects without modifying the source array.\n\n`,
  };

  const directoryResults = await mapAsync(topLevelDirectories, (directory) => (
    directoryToMarkdown(directory, headers[directory as keyof typeof headers])
  ));

  const files = [
    'functional',
    'logical',
    'memoize',
    'pipe',
    'string',
  ];

  const fileHeaders = {
    functional: `# Structural Functions\n\n`,
    logical: `# Logical Functions\n\n`,
    memoize: `# Memoization\n\n`,
    pipe: `# Pipe Functions\n\n`,
    string: `# String Functions\n\n`,
  };

  const fileResults = await mapAsync(files, (file) => (
    fileToMarkdown(file, fileHeaders[file as keyof typeof fileHeaders])
  ));

  buildMainDoc();
};

main();
