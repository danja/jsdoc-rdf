# JSDoc Turtle RDF Plugin

Converts JSDoc comments to semantic Turtle RDF documentation alongside standard HTML output. Built with ES modules for modern JavaScript environments.

## Installation

```bash
npm install rdfjs rdf-ext
npm install --save-dev vitest jsdoc
```

## Usage

### 1. Plugin Setup

Place `jsdoc-turtle-plugin.js` in your project directory and add to JSDoc configuration:

```json
{
  "plugins": ["./jsdoc-turtle-plugin.js"],
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
jsdoc --plugin ./jsdoc-turtle-plugin.js source-files.js -d ./docs/
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

- **FOAF**: `http://xmlns.com/foaf/0.1/` - Basic metadata
- **DCTERMS**: `http://purl.org/dc/terms/` - Dublin Core terms
- **RDFS**: `http://www.w3.org/2000/01/rdf-schema#` - Schema elements
- **JSDOC**: `http://example.org/jsdoc#` - Custom JSDoc properties

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

<http://example.org/api/UserManager>
    rdfs:label "UserManager" ;
    dcterms:description "User management utility class" ;
    jsdoc:kind "class" ;
    dcterms:creator "John Developer" ;
    dcterms:hasVersion "2.1.0" .
```

## Configuration Options

Modify the plugin's `baseUri` property to customize RDF namespace. Since this uses ES modules, you can import and extend the plugin:

```javascript
// Custom plugin configuration
import { handlers, definePlugin } from './jsdoc-turtle-plugin.js';

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