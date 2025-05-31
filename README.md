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
