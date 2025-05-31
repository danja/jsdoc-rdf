This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
4. Repository files, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
- Pay special attention to the Repository Description. These contain important context and guidelines specific to this project.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: old, dist, js/lib, docs, .env, knowledge, **/_*/**, _*, **/_*, **/webpack/*, *.log, **/*repopack*, **/*repomix*, **/*old*, **/*prompt*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

<additional_info>
<user_provided_header>
jsdoc-rdf codebase
</user_provided_header>

</additional_info>

</file_summary>

<directory_structure>
.gitignore
doap.ttl
example.js
jsdoc-rdf.js
jsdoc.conf.json
LICENSE
package.json
project_structure.md
README.md
repomix.config.json
test-runner.js
test.js
vitest_example_test.md
vitest.config.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="doap.ttl">
@prefix doap: <http://usefulinc.com/ns/doap#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin> a doap:Project ;
    doap:name "JSDoc Turtle RDF Plugin" ;
    doap:shortdesc "JSDoc plugin to generate Turtle RDF documentation" ;
    doap:description """Converts JSDoc comments to semantic Turtle RDF format alongside 
                       standard HTML documentation. Enables semantic web integration 
                       of JavaScript API documentation.""" ;
    doap:homepage <https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin> ;
    doap:programming-language "JavaScript" ;
    doap:license <http://usefulinc.com/doap/licenses/mit> ;
    doap:repository [
        a doap:Repository ;
        doap:browse <https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin> ;
        doap:location <https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin.git>
    ] ;
    doap:maintainer <https://danny.ayers.name#me> ;
    doap:developer <https://danny.ayers.name#me> ;
    doap:revision "1.0.0" ;
    doap:created "2025-05-31"^^xsd:date ;
    doap:category <http://projects.apache.org/category/build-management> ;
    doap:implements <http://usefulinc.com/ns/doap#specification> ;
    dcterms:subject "documentation", "semantic web", "rdf", "javascript" .

<https://danny.ayers.name#me> a foaf:Person ;
    foaf:name "Danny Ayers" ;
    foaf:mbox <mailto:danny.ayers@gmail.com> ;
    foaf:homepage <https://danny.ayers.name> ;
    rdfs:seeAlso <https://danny.ayers.name/foaf.rdf> .
</file>

<file path="jsdoc-rdf.js">
import factory from 'rdf-ext';

import fs from 'fs';
import path from 'path';


const namespaces = {
    foaf: factory.namedNode('http://xmlns.com/foaf/0.1/'),
    dcterms: factory.namedNode('http://purl.org/dc/terms/'),
    rdfs: factory.namedNode('http://www.w3.org/2000/01/rdf-schema#'),
    jsdoc: factory.namedNode('http://example.org/jsdoc#'),
    xsd: factory.namedNode('http://www.w3.org/2001/XMLSchema#'),
    doap: factory.namedNode('http://usefulinc.com/ns/doap#')
};

class TurtleRDFPlugin {
    constructor() {
        this.dataset = factory.dataset();
        this.baseUri = 'http://example.org/api/';
    }




    addDoapProfile() {
        const project = factory.namedNode(this.baseUri + 'project');
        const maintainer = factory.namedNode('https://danny.ayers.name#me');


        this.addTriple(project, namespaces.rdfs + 'type', namespaces.doap + 'Project');
        this.addTriple(project, namespaces.doap + 'name', factory.literal('JSDoc Turtle RDF Plugin'));
        this.addTriple(project, namespaces.doap + 'shortdesc', factory.literal('JSDoc plugin to generate Turtle RDF documentation'));
        this.addTriple(project, namespaces.doap + 'description', factory.literal('Converts JSDoc comments to semantic Turtle RDF format alongside standard HTML documentation'));
        this.addTriple(project, namespaces.doap + 'homepage', factory.namedNode('https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin'));
        this.addTriple(project, namespaces.doap + 'programming-language', factory.literal('JavaScript'));
        this.addTriple(project, namespaces.doap + 'license', factory.namedNode('http://usefulinc.com/doap/licenses/mit'));
        this.addTriple(project, namespaces.doap + 'maintainer', maintainer);
        this.addTriple(project, namespaces.doap + 'developer', maintainer);


        this.addTriple(maintainer, namespaces.rdfs + 'type', namespaces.foaf + 'Person');
        this.addTriple(maintainer, namespaces.foaf + 'name', factory.literal('Danny Ayers'));
        this.addTriple(maintainer, namespaces.foaf + 'mbox', factory.namedNode('mailto:danny.ayers@gmail.com'));
        this.addTriple(maintainer, namespaces.foaf + 'homepage', factory.namedNode('https://danny.ayers.name'));


        this.addTriple(project, namespaces.doap + 'revision', factory.literal('1.0.0'));
        this.addTriple(project, namespaces.doap + 'created', factory.literal('2025-05-31', namespaces.xsd + 'date'));
    }




    addTriple(subject, predicate, object) {
        const triple = factory.quad(subject, predicate, object);
        this.dataset.add(triple);
    }




    processDoclet(doclet) {
        if (!doclet.longname || doclet.undocumented) return;

        const subject = factory.namedNode(this.baseUri + doclet.longname);


        this.addTriple(subject, namespaces.rdfs + 'label', factory.literal(doclet.name));
        this.addTriple(subject, namespaces.dcterms + 'description', factory.literal(doclet.description || ''));

        // Kind (function, class, etc.)
        this.addTriple(subject, namespaces.jsdoc + 'kind', factory.literal(doclet.kind));


        if (doclet.params) {
            doclet.params.forEach((param, index) => {
                const paramNode = factory.namedNode(this.baseUri + doclet.longname + '/param/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'hasParameter', paramNode);
                this.addTriple(paramNode, namespaces.rdfs + 'label', factory.literal(param.name));
                this.addTriple(paramNode, namespaces.dcterms + 'description', factory.literal(param.description || ''));
                if (param.type) {
                    this.addTriple(paramNode, namespaces.jsdoc + 'parameterType', factory.literal(param.type.names.join('|')));
                }
            });
        }


        if (doclet.returns) {
            doclet.returns.forEach((ret, index) => {
                const returnNode = factory.namedNode(this.baseUri + doclet.longname + '/return/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'returns', returnNode);
                this.addTriple(returnNode, namespaces.dcterms + 'description', factory.literal(ret.description || ''));
                if (ret.type) {
                    this.addTriple(returnNode, namespaces.jsdoc + 'returnType', factory.literal(ret.type.names.join('|')));
                }
            });
        }


        if (doclet.examples) {
            doclet.examples.forEach((example, index) => {
                const exampleNode = factory.namedNode(this.baseUri + doclet.longname + '/example/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'hasExample', exampleNode);
                this.addTriple(exampleNode, namespaces.rdfs + 'label', factory.literal(example));
            });
        }


        if (doclet.author) {
            doclet.author.forEach(author => {
                this.addTriple(subject, namespaces.dcterms + 'creator', factory.literal(author));
            });
        }


        if (doclet.version) {
            this.addTriple(subject, namespaces.dcterms + 'hasVersion', factory.literal(doclet.version));
        }


        if (doclet.since) {
            this.addTriple(subject, namespaces.dcterms + 'created', factory.literal(doclet.since));
        }
    }




    async writeTurtle(outputPath) {

        this.addDoapProfile();

        const writer = factory.formats.writers.get('text/turtle');
        const output = writer.import(this.dataset.toStream());

        const chunks = [];
        output.on('data', chunk => chunks.push(chunk));

        return new Promise((resolve, reject) => {
            output.on('end', () => {
                const turtle = Buffer.concat(chunks).toString();
                const prefixes = `@prefix foaf: <${namespaces.foaf.value}> .
@prefix dcterms: <${namespaces.dcterms.value}> .
@prefix rdfs: <${namespaces.rdfs.value}> .
@prefix jsdoc: <${namespaces.jsdoc.value}> .
@prefix doap: <${namespaces.doap.value}> .
@prefix xsd: <${namespaces.xsd.value}> .

`;
                fs.writeFileSync(outputPath, prefixes + turtle);
                resolve();
            });
            output.on('error', reject);
        });
    }
}


let plugin;




export const handlers = {



    beforeParse: function (e) {
        plugin = new TurtleRDFPlugin();
    },




    newDoclet: function (e) {
        plugin.processDoclet(e.doclet);
    },




    processingComplete: function (e) {
        const outputDir = e.destination || './out';
        const turtleFile = path.join(outputDir, 'api-documentation.ttl');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        plugin.writeTurtle(turtleFile).then(() => {
            console.log(`Turtle RDF documentation written to: ${turtleFile}`);
        }).catch(err => {
            console.error('Error writing Turtle file:', err);
        });
    }
};

export function definePlugin(dictionary) {
    dictionary.turtleRdf = {
        mustHaveValue: false
    };
}
</file>

<file path="project_structure.md">
# Project Structure

```
jsdoc-turtle-rdf-plugin/
├── package.json                 # ES module configuration
├── jsdoc-rdf.js       # Main plugin (ES module)
├── jsdoc.conf.json             # JSDoc configuration
├── vitest.config.js            # Vitest test configuration
├── example.js                  # Example source file
├── test.js                     # Test suite (Vitest)
├── project.ttl                 # DOAP project profile
└── README.md                   # Documentation
```

## Setup Instructions

1. **Initialize ES Module Project**
   ```bash
   npm init
   # Ensure package.json contains "type": "module"
   ```

2. **Install Dependencies**
   ```bash
   npm install rdfjs rdf-ext
   npm install --save-dev jsdoc vitest
   ```

3. **Verify ES Module Support**
   ```bash
   node --version  # Should be ≥14.0.0
   ```

4. **Run Tests**
   ```bash
   # Run tests once
   npm run test:run
   
   # Run tests in watch mode
   npm test
   
   # Run with coverage
   vitest --coverage
   ```

5. **Generate Documentation**
   ```bash
   npm run example
   ```

## ES Module Considerations

- All imports use ES module syntax (`import`/`export`)
- Vitest natively supports ES modules and TypeScript
- Built-in assertions replace external libraries like Chai
- Fast test execution with hot module replacement
- No file extensions required for local imports
- JSDoc plugin system works with ES modules natively
- Dynamic imports available if needed for plugin extension

## Troubleshooting

- **"Cannot use import statement"**: Ensure `"type": "module"` in package.json
- **JSDoc not finding plugin**: Check plugin path in jsdoc.conf.json
- **RDF libraries not found**: Verify rdfjs and rdf-ext installation
- **Vitest configuration issues**: Check vitest.config.js for environment settings
- **Test timeout errors**: Increase testTimeout in vitest.config.js
</file>

<file path="repomix.config.json">
{
    "output": {
        "filePath": "./jsdoc-rdf_repomix.md",
        "headerText": "jsdoc-rdf codebase",
        "removeComments": true
    },
    "ignore": {
        "useDefaultPatterns": true,
        "customPatterns": [
            "old",
            "dist",
            "js/lib",
            "docs",
            ".env",
            "knowledge",
            "**/_*/**",
            "_*",
            "**/_*",
            "**/webpack/*",
            "*.log",
            "**/*repopack*",
            "**/*repomix*",
            "**/*old*",
            "**/*prompt*"
        ]
    }
}
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# vitepress build output
**/.vitepress/dist

# vitepress cache directory
**/.vitepress/cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
</file>

<file path="example.js">
class UserManager {














    async createUser(name, email, options = {}) {

        return { id: 123, name, email, ...options };
    }











    validateCredentials(email, password) {

        return true;
    }
}













function formatUserName(user) {
    return `${user.firstName} ${user.lastName}`;
}

export { UserManager, formatUserName };
</file>

<file path="jsdoc.conf.json">
{
  "source": {
    "include": [
      "./"
    ],
    "includePattern": "\\.(js|jsx)$",
    "exclude": [
      "node_modules/"
    ]
  },
  "opts": {
    "destination": "./docs/"
  },
  "plugins": [
    "./jsdoc-rdf.js"
  ],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
}
</file>

<file path="LICENSE">
MIT License

Copyright (c) 2025 Danny Ayers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</file>

<file path="package.json">
{
  "name": "jsdoc-rdf",
  "version": "1.0.0",
  "description": "JSDoc plugin to generate Turtle RDF documentation",
  "type": "module",
  "main": "jsdoc-rdf.js",
  "keywords": [
    "jsdoc",
    "rdf",
    "turtle",
    "documentation",
    "semantic"
  ],
  "author": {
    "name": "Danny Ayers",
    "email": "danny.ayers@gmail.com",
    "url": "https://danny.ayers.name"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin.git"
  },
  "homepage": "https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin",
  "dependencies": {
    "rdfjs": "^4.0.2",
    "rdf-ext": "^2.4.0"
  },
  "peerDependencies": {
    "jsdoc": "^4.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "files": [
    "jsdoc-rdf.js",
    "vitest.config.js",
    "project.ttl",
    "README.md"
  ],
  "scripts": {
    "test": "vitest --run",
    "test:watch": "vitest --watch",
    "example": "jsdoc -c jsdoc.conf.json example.js",
    "test:example": "npm run example && npm run test:run",
    "rp": "repomix -c repomix.config.json ."
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "jsdoc": "^4.0.0"
  }
}
</file>

<file path="test-runner.js">
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.js', '**/*test.js'],
    exclude: ['node_modules/**', 'docs/**', 'out/**'],
    testTimeout: 10000,
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'docs/',
        'out/',
        '**/*.test.js',
        '**/*test.js',
        'example.js'
      ]
    },
    outputFile: {
      json: './test-results.json'
    }
  }
});
</file>

<file path="test.js">
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('JSDoc Turtle RDF Plugin', () => {
    const outputDir = './test-docs';
    const turtleFile = path.join(outputDir, 'api-documentation.ttl');

    beforeAll(() => {

        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }


        try {
            execSync(`jsdoc -c jsdoc.conf.json example.js -d ${outputDir}`, {
                stdio: 'pipe',
                encoding: 'utf8'
            });
        } catch (error) {
            console.error('JSDoc execution failed:', error.message);
            throw error;
        }
    });

    afterAll(() => {

        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
    });

    it('should generate Turtle RDF file', () => {

        expect(fs.existsSync(turtleFile)).toBe(true);


        const stats = fs.statSync(turtleFile);
        expect(stats.size).toBeGreaterThan(0);
    });

    it('should contain RDF namespaces', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('@prefix foaf:');
        expect(content).toContain('@prefix dcterms:');
        expect(content).toContain('@prefix jsdoc:');
        expect(content).toContain('@prefix rdfs:');
        expect(content).toContain('@prefix doap:');
    });

    it('should contain class information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('UserManager');
        expect(content).toContain('jsdoc:kind');
        expect(content).toContain('"class"');
    });

    it('should contain function parameters', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('jsdoc:hasParameter');
        expect(content).toContain('jsdoc:parameterType');
    });

    it('should contain return information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('jsdoc:returns');
        expect(content).toContain('jsdoc:returnType');
    });

    it('should contain examples', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('jsdoc:hasExample');
    });

    it('should contain author information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('dcterms:creator');
        expect(content).toContain('John Developer');
    });

    it('should contain DOAP project information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');

        expect(content).toContain('doap:Project');
        expect(content).toContain('doap:maintainer');
        expect(content).toContain('Danny Ayers');
        expect(content).toContain('danny.ayers@gmail.com');
    });

    it('should be valid Turtle syntax', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');


        expect(content).toContain('@prefix');
        expect(content).toMatch(/\s+\.\s*$/m);
        expect(content).not.toContain('undefined');
        expect(content).not.toContain('null');
    });
});
</file>

<file path="vitest_example_test.md">
# Vitest Commands Reference

## Basic Testing

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (reruns on file changes)
npm test

# Run specific test file
vitest test.js

# Run tests with coverage report
vitest --coverage

# Run tests in silent mode (less output)
vitest --silent
```

## Advanced Options

```bash
# Run tests with custom config
vitest --config custom-vitest.config.js

# Run tests matching pattern
vitest --grep "RDF"

# Run tests with debugging
vitest --inspect-brk

# Generate coverage in different formats
vitest --coverage --coverage.reporter=lcov
```

## Integration with JSDoc

```bash
# Full workflow: generate docs + run tests
npm run test:example

# Just generate documentation
npm run example

# Verify plugin functionality
vitest test.js --verbose
```

## Vitest Features Used

- **ES Module Support**: Native import/export syntax
- **Built-in Assertions**: No external assertion library needed  
- **Fast Execution**: Optimized for modern JavaScript
- **Watch Mode**: Automatic reruns on file changes
- **Coverage Reports**: Built-in V8 coverage provider
- **Node Environment**: Configured for filesystem operations
</file>

<file path="vitest.config.js">
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.js', '**/*test.js'],
    exclude: ['node_modules/**', 'docs/**', 'out/**'],
    testTimeout: 10000,
    setupFiles: [],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'docs/',
        'out/',
        '**/*.test.js',
        '**/*test.js'
      ]
    }
  }
});
</file>

<file path="README.md">
# JSDoc Turtle RDF Plugin

Converts JSDoc comments to semantic Turtle RDF documentation alongside standard HTML output. Built with ES modules for modern JavaScript environments.

**Author:** Danny Ayers <danny.ayers@gmail.com>  
**Homepage:** https://danny.ayers.name

## Installation

```bash
npm install rdfjs rdf-ext
npm install --save-dev vitest jsdoc
```

## Usage

### 1. Plugin Setup

Place `jsdoc-rdf.js` in your project directory and add to JSDoc configuration:

```json
{
  "plugins": ["./jsdoc-rdf.js"],
  "opts": {
    "destination": "./docs/"
  }
}
```

### 2. Generate Documentation

```bash
# Using configuration file
jsdoc -c jsdoc.conf.json source-files.js

# Direct command line
jsdoc --plugin ./jsdoc-rdf.js source-files.js -d ./docs/
```

### 3. Output

- Standard JSDoc HTML documentation in `./docs/`
- Semantic RDF documentation in `./docs/api-documentation.ttl`

## ES Module Support

This plugin uses ES modules. Ensure your project supports ES modules by:

1. Adding `"type": "module"` to package.json
2. Using `.mjs` file extensions if needed
3. Node.js ≥14.0.0 for full ES module support

## Source File Format

Use ES module exports in your documented source files:

```javascript
/**
 * Example function
 * @param {string} input - Input parameter
 * @returns {string} Output result
 */
function processData(input) {
    return input.toUpperCase();
}

export { processData };
```

## Testing

Run the test suite using Vitest:

```bash
# Run tests once
npm run test:run

# Run tests in watch mode  
npm test

# Run with coverage
vitest --coverage

# Run example and tests
npm run test:example
```

## RDF Vocabulary

The plugin maps JSDoc elements to RDF using these vocabularies:

- **FOAF**: `http://xmlns.com/foaf/0.1/` - Friend of a Friend ontology
- **DCTERMS**: `http://purl.org/dc/terms/` - Dublin Core terms
- **RDFS**: `http://www.w3.org/2000/01/rdf-schema#` - RDF Schema elements
- **JSDOC**: `http://example.org/jsdoc#` - Custom JSDoc properties
- **DOAP**: `http://usefulinc.com/ns/doap#` - Description of a Project vocabulary

## Supported JSDoc Tags

- `@param` → `jsdoc:hasParameter`
- `@returns` → `jsdoc:returns`
- `@example` → `jsdoc:hasExample`
- `@author` → `dcterms:creator`
- `@version` → `dcterms:hasVersion`
- `@since` → `dcterms:created`
- `@description` → `dcterms:description`

## Example Output

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix jsdoc: <http://example.org/jsdoc#> .
@prefix doap: <http://usefulinc.com/ns/doap#> .

<http://example.org/api/UserManager>
    rdfs:label "UserManager" ;
    dcterms:description "User management utility class" ;
    jsdoc:kind "class" ;
    dcterms:creator "John Developer" ;
    dcterms:hasVersion "2.1.0" .

<http://example.org/api/project> a doap:Project ;
    doap:name "JSDoc Turtle RDF Plugin" ;
    doap:maintainer <https://danny.ayers.name#me> .
```

## DOAP Project Profile

A standalone DOAP (Description of a Project) profile is included as `project.ttl`. This provides semantic metadata about the plugin project itself, including:

- Project description and homepage
- Maintainer and developer information
- Repository location and license
- Programming language and categories

## Configuration Options

Modify the plugin's `baseUri` property to customize RDF namespace. Since this uses ES modules, you can import and extend the plugin:

```javascript
// Custom plugin configuration
import { handlers, definePlugin } from './jsdoc-rdf.js';

// Modify baseUri before JSDoc processing
// Access through plugin instance during beforeParse handler
```

## Requirements

- Node.js ≥14.0.0 (ES modules support)
- JSDoc ≥4.0.0
- rdfjs ≥4.0.2  
- rdf-ext ≥2.4.0
- vitest ≥1.0.0 (for testing)
- Project configured for ES modules (`"type": "module"` in package.json)
</file>

</files>
