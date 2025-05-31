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