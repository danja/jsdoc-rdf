This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

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

<file path="example.js">
/**
 * User management utility class
 * @class UserManager
 * @author John Developer
 * @version 2.1.0
 * @since 1.0.0
 * @example
 * const manager = new UserManager();
 * const user = await manager.createUser('John', 'john@example.com');
 */
class UserManager {
    /**
     * Creates a new user account
     * @async
     * @param {string} name - The user's full name
     * @param {string} email - The user's email address
     * @param {Object} [options={}] - Additional user options
     * @param {string} [options.role="user"] - User role
     * @param {boolean} [options.active=true] - Account status
     * @returns {Promise<Object>} The created user object
     * @example
     * const user = await manager.createUser('Jane Doe', 'jane@example.com', { role: 'admin' });
     */
    async createUser(name, email, options = {}) {
        return { id: 123, name, email, ...options };
    }

    /**
     * Validates user credentials
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {boolean} True if credentials are valid
     * @example
     * const isValid = manager.validateCredentials('user@example.com', 'password123');
     */
    validateCredentials(email, password) {
        return true;
    }
}

/**
 * Formats a user's display name
 * @function formatUserName
 * @param {Object} user - User object
 * @param {string} user.firstName - First name
 * @param {string} user.lastName - Last name
 * @returns {string} Formatted full name
 * @author John Developer
 * @since 1.2.0
 * @example
 * const formatted = formatUserName({ firstName: 'John', lastName: 'Doe' });
 * // Returns: "John Doe"
 */
function formatUserName(user) {
    return `${user.firstName} ${user.lastName}`;
}

export { UserManager, formatUserName };
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
    xsd: factory.namedNode('http://www.w3.org/2001/XMLSchema#')
};

class TurtleRDFPlugin {
    constructor(config = {}) {
        this.dataset = factory.dataset();
        this.baseUri = config.baseUri || 'http://example.org/api/';
        this.config = config;
    }



    /**
     * Add RDF triple to dataset
     */
    addTriple(subject, predicate, object) {
        const triple = factory.quad(subject, predicate, object);
        this.dataset.add(triple);
    }

    /**
     * Process JSDoc doclet into RDF triples
     */
    processDoclet(doclet) {
        if (!doclet.longname || doclet.undocumented) return;

        const subject = factory.namedNode(this.baseUri + doclet.longname);

        this.addTriple(subject, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(doclet.name));
        this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(doclet.description || ''));

        // Kind (function, class, etc.)
        this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'kind'), factory.literal(doclet.kind));

        // Namespace
        if (doclet.memberof) {
            const memberOf = factory.namedNode(this.baseUri + doclet.memberof);
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'memberOf'), memberOf);
        }

        // Access level
        if (doclet.access) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'access'), factory.literal(doclet.access));
        }

        // Modifiers
        if (doclet.scope) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'scope'), factory.literal(doclet.scope));
        }
        if (doclet.readonly) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'readonly'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.deprecated) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'deprecated'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.abstract) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'abstract'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.override) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'override'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }

        // Inheritance
        if (doclet.augments) {
            doclet.augments.forEach(parent => {
                const parentNode = factory.namedNode(this.baseUri + parent);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'extends'), parentNode);
            });
        }
        if (doclet.implements) {
            doclet.implements.forEach(impl => {
                const implNode = factory.namedNode(this.baseUri + impl);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'implements'), implNode);
            });
        }

        if (doclet.params) {
            doclet.params.forEach((param, index) => {
                const paramNode = factory.namedNode(this.baseUri + doclet.longname + '/param/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'hasParameter'), paramNode);
                this.addTriple(paramNode, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(param.name));
                this.addTriple(paramNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(param.description || ''));
                if (param.type) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'parameterType'), factory.literal(param.type.names.join('|')));
                }
                if (param.optional) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'optional'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
                }
                if (param.defaultvalue !== undefined) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'defaultValue'), factory.literal(String(param.defaultvalue)));
                }
            });
        }

        if (doclet.returns) {
            doclet.returns.forEach((ret, index) => {
                const returnNode = factory.namedNode(this.baseUri + doclet.longname + '/return/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'returns'), returnNode);
                this.addTriple(returnNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(ret.description || ''));
                if (ret.type) {
                    this.addTriple(returnNode, factory.namedNode(namespaces.jsdoc.value + 'returnType'), factory.literal(ret.type.names.join('|')));
                }
            });
        }

        if (doclet.exceptions) {
            doclet.exceptions.forEach((exc, index) => {
                const excNode = factory.namedNode(this.baseUri + doclet.longname + '/throws/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'throws'), excNode);
                this.addTriple(excNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(exc.description || ''));
                if (exc.type) {
                    this.addTriple(excNode, factory.namedNode(namespaces.jsdoc.value + 'exceptionType'), factory.literal(exc.type.names.join('|')));
                }
            });
        }

        if (doclet.examples) {
            doclet.examples.forEach((example, index) => {
                const exampleNode = factory.namedNode(this.baseUri + doclet.longname + '/example/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'hasExample'), exampleNode);
                this.addTriple(exampleNode, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(example));
            });
        }

        if (doclet.see) {
            doclet.see.forEach(ref => {
                this.addTriple(subject, factory.namedNode(namespaces.rdfs.value + 'seeAlso'), factory.literal(ref));
            });
        }

        if (doclet.todo) {
            doclet.todo.forEach(todo => {
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'todo'), factory.literal(todo));
            });
        }

        if (doclet.author) {
            doclet.author.forEach(author => {
                this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'creator'), factory.literal(author));
            });
        }

        if (doclet.version) {
            this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'hasVersion'), factory.literal(doclet.version));
        }

        if (doclet.since) {
            this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'created'), factory.literal(doclet.since));
        }
    }

    /**
     * Convert dataset to Turtle string
     */
    toTurtle() {
        const prefixes = `@prefix foaf: <${namespaces.foaf.value}> .
@prefix dcterms: <${namespaces.dcterms.value}> .
@prefix rdfs: <${namespaces.rdfs.value}> .
@prefix jsdoc: <${namespaces.jsdoc.value}> .
@prefix xsd: <${namespaces.xsd.value}> .

`;

        let turtle = '';
        const subjects = new Set();
        
        // Collect all subjects
        for (const quad of this.dataset) {
            subjects.add(quad.subject.value);
        }

        // Generate Turtle for each subject
        for (const subjectValue of subjects) {
            const subject = factory.namedNode(subjectValue);
            const quads = [...this.dataset.match(subject)];
            
            if (quads.length > 0) {
                turtle += `<${subjectValue}>\n`;
                
                quads.forEach((quad, index) => {
                    const predicate = this.abbreviateUri(quad.predicate.value);
                    const object = this.formatObject(quad.object);
                    const separator = index === quads.length - 1 ? ' .' : ' ;';
                    turtle += `    ${predicate} ${object}${separator}\n`;
                });
                turtle += '\n';
            }
        }

        return prefixes + turtle;
    }

    /**
     * Abbreviate URI using known prefixes
     */
    abbreviateUri(uri) {
        for (const [prefix, ns] of Object.entries(namespaces)) {
            if (uri.startsWith(ns.value)) {
                return `${prefix}:${uri.substring(ns.value.length)}`;
            }
        }
        return `<${uri}>`;
    }

    /**
     * Format RDF object for Turtle output
     */
    formatObject(object) {
        if (object.termType === 'NamedNode') {
            return this.abbreviateUri(object.value);
        } else if (object.termType === 'Literal') {
            if (object.datatype && object.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
                return `"${object.value}"^^${this.abbreviateUri(object.datatype.value)}`;
            }
            return `"${object.value.replace(/"/g, '\\"')}"`;
        }
        return object.value;
    }
}

let plugin;

/**
 * JSDoc plugin handlers
 */
export const handlers = {
    /**
     * Initialize plugin before parsing
     */
    beforeParse: function (e) {
        const config = e.env?.conf?.rdfConfig || {};
        plugin = new TurtleRDFPlugin(config);
    },

    /**
     * Process each doclet
     */
    newDoclet: function (e) {
        plugin.processDoclet(e.doclet);
    },

    /**
     * Write RDF output after processing completion
     */
    processingComplete: function (e) {
        const outputDir = e.destination || './out';
        const turtleFile = path.join(outputDir, 'api-documentation.ttl');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        try {
            const turtle = plugin.toTurtle();
            fs.writeFileSync(turtleFile, turtle);
            console.log(`Turtle RDF documentation written to: ${turtleFile}`);
        } catch (err) {
            console.error('Error writing Turtle file:', err);
        }
    }
};

export function definePlugin(dictionary) {
    dictionary.turtleRdf = {
        mustHaveValue: false
    };
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
        "removeComments": false
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
  },
  "rdfConfig": {
    "baseUri": "https://your-project.com/api/"
  }
}
</file>

<file path="package.json">
{
  "name": "jsdoc-rdf",
  "version": "0.1.0",
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
    "rdf-ext": "^2.5.2"
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
    "jsdoc": "^4.0.0",
    "vitest": "^1.0.0"
  }
}
</file>

<file path="test.js">
/**
 * Test suite for JSDoc Turtle RDF Plugin
 * @author Danny Ayers <danny.ayers@gmail.com>
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('JSDoc Turtle RDF Plugin', () => {
    const outputDir = './test-docs';
    const turtleFile = path.join(outputDir, 'api-documentation.ttl');

    beforeAll(() => {
        // Clean up previous test outputs
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
        
        // Generate documentation first
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
        // Clean up test outputs
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
    });

    it('should generate Turtle RDF file', () => {
        // Check if Turtle file was created
        expect(fs.existsSync(turtleFile)).toBe(true);
        
        // Verify file has content
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
        
        // Basic syntax checks
        expect(content).toContain('@prefix');
        expect(content).toMatch(/\s+\.\s*$/m); // Should end statements with dots
        expect(content).not.toContain('undefined');
        expect(content).not.toContain('null');
    });
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
  },
  "rdfConfig": {
    "baseUri": "https://your-project.com/api/"
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

## Configuration

### Base URI

Configure the RDF namespace via `rdfConfig.baseUri` in JSDoc configuration:

```json
{
  "rdfConfig": {
    "baseUri": "https://myproject.example.org/api/"
  }
}
```

Default: `http://example.org/api/`

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
- **XSD**: `http://www.w3.org/2001/XMLSchema#` - XML Schema datatypes

## Supported JSDoc Tags

### Core Documentation
- `@param` → `jsdoc:hasParameter` with optional/defaultValue flags
- `@returns` → `jsdoc:returns`
- `@throws` → `jsdoc:throws`
- `@example` → `jsdoc:hasExample`
- `@description` → `dcterms:description`

### Metadata
- `@author` → `dcterms:creator`
- `@version` → `dcterms:hasVersion`
- `@since` → `dcterms:created`
- `@see` → `rdfs:seeAlso`
- `@todo` → `jsdoc:todo`

### Structure & Access
- `@memberof` → `jsdoc:memberOf`
- `@access` → `jsdoc:access`
- `@scope` → `jsdoc:scope`
- `@readonly` → `jsdoc:readonly`
- `@deprecated` → `jsdoc:deprecated`
- `@abstract` → `jsdoc:abstract`
- `@override` → `jsdoc:override`

### Inheritance
- `@extends` / `@augments` → `jsdoc:extends`
- `@implements` → `jsdoc:implements`

## Example Output

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix jsdoc: <http://example.org/jsdoc#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://your-project.com/api/UserManager>
    rdfs:label "UserManager" ;
    dcterms:description "User management utility class" ;
    jsdoc:kind "class" ;
    dcterms:creator "John Developer" ;
    dcterms:hasVersion "2.1.0" ;
    jsdoc:hasParameter <https://your-project.com/api/UserManager/createUser/param/0> .

<https://your-project.com/api/UserManager/createUser/param/0>
    rdfs:label "name" ;
    dcterms:description "The user's full name" ;
    jsdoc:parameterType "string" .
```

## DOAP Project Profile

A static DOAP (Description of a Project) profile is included as `doap.ttl`. This provides semantic metadata about the plugin project itself. The generated RDF documentation focuses solely on your documented JavaScript code.

## Requirements

- Node.js ≥14.0.0 (ES modules support)
- JSDoc ≥4.0.0
- rdfjs ≥4.0.2  
- rdf-ext ≥2.4.0
- vitest ≥1.0.0 (for testing)
- Project configured for ES modules (`"type": "module"` in package.json)
</file>

</files>
