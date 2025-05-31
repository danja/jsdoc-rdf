# JSDoc Turtle RDF Plugin

Converts JSDoc comments to semantic Turtle RDF documentation. This plugin enhances your JavaScript documentation with semantic web capabilities, making it easier to integrate with other RDF-based tools and systems.

**Author:** Danny Ayers <danny.ayers@gmail.com>  
**Homepage:** https://danny.ayers.name  
**Version:** 0.1.0

## Features

- Converts JSDoc comments to RDF/Turtle format
- Preserves all JSDoc metadata including parameters, return types, and examples
- Supports modern JavaScript features (ES modules, async/await, etc.)
- Configurable base URIs for RDF resources
- Comprehensive test suite with Vitest

## Installation

```bash
# Install as a development dependency
npm install --save-dev @dannyayers/jsdoc-rdf

# Or clone and install locally
git clone https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin.git
cd jsdoc-turtle-rdf-plugin
npm install
```

## Quick Start

1. Create a `jsdoc.conf.json` in your project root:

```json
{
  "source": {
    "include": ["src"],
    "includePattern": "\\.(js|jsx)$",
    "exclude": ["node_modules", "*.test.js"]
  },
  "opts": {
    "destination": "./docs/",
    "recurse": true,
    "readme": "./README.md"
  },
  "plugins": ["./node_modules/@dannyayers/jsdoc-rdf/jsdoc-rdf.js"],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  },
  "rdfConfig": {
    "baseUri": "https://your-project.com/api/"
  }
}
```

2. Add JSDoc comments to your code (see example below)
3. Generate the documentation:

```bash
npx jsdoc -c jsdoc.conf.json
```

4. Find the generated documentation in the `docs/` directory:
   - `index.html` - Standard JSDoc HTML
   - `api-documentation.ttl` - RDF/Turtle output

## Example

```javascript
/**
 * User management utility class
 * @class UserManager
 * @author John Developer
 * @version 2.1.0
 * @since 1.0.0
 */
class UserManager {
  /**
   * Creates a new user account
   * @param {string} name - The user's full name
   * @param {string} email - The user's email address
   * @param {Object} [options={}] - Additional user options
   * @param {string} [options.role="user"] - User role
   * @returns {Promise<Object>} The created user object
   * @example
   * const user = await manager.createUser('Jane', 'jane@example.com');
   */
  async createUser(name, email, options = {}) {
    return { id: 123, name, email, ...options };
  }
}

export { UserManager };
```

## Configuration

### JSDoc Configuration

The plugin supports the following configuration options in your `jsdoc.conf.json`:

```json
{
  "rdfConfig": {
    "baseUri": "https://your-project.com/api/"  // Base URI for RDF resources
  }
}
```

### Base URI

The `baseUri` is used as the base for all generated RDF resource URIs. For example, with `baseUri: "https://api.example.com/"`:

- A class named `UserManager` becomes: `https://api.example.com/UserManager`
- A method `createUser` in `UserManager` becomes: `https://api.example.com/UserManager/createUser`

### Source File Patterns

You can control which files are processed using the `source` configuration:

```json
{
  "source": {
    "include": ["src"],
    "includePattern": "\\.(js|jsx|ts|tsx)$",
    "exclude": ["node_modules", "*.test.js"]
  }
}
```

## Development

### Requirements

- Node.js ≥14.0.0
- npm ≥7.0.0
- JSDoc ≥4.0.0

### Building

1. Clone the repository:
   ```bash
   git clone https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin.git
   cd jsdoc-turtle-rdf-plugin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build the example documentation:
   ```bash
   npm run example
   ```

### Testing

The test suite uses Vitest and includes both unit and integration tests:

```bash
# Run tests once
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Linting

```bash
# Check for linting errors
npm run lint

# Automatically fix linting issues
npm run lint:fix
```

## JSDoc Best Practices

For best results with the RDF plugin, follow these JSDoc best practices:

1. **Always document parameters and return values**
   ```javascript
   /**
    * Formats a user's full name
    * @param {Object} user - The user object
    * @param {string} user.firstName - User's first name
    * @param {string} user.lastName - User's last name
    * @returns {string} Formatted full name
    * @throws {TypeError} If user object is invalid
    */
   function formatUserName(user) {
     if (!user || typeof user !== 'object') {
       throw new TypeError('Invalid user object');
     }
     return `${user.firstName} ${user.lastName}`;
   }
   ```

2. **Use `@class` for classes and `@function` for standalone functions**

3. **Document complex types with `@typedef`**
   ```javascript
   /**
    * @typedef {Object} UserProfile
    * @property {string} id - Unique user ID
    * @property {string} email - User's email address
    * @property {string} [displayName] - Optional display name
    */
   ```

4. **Use `@example` to provide usage examples**
   ```javascript
   /**
    * @example
    * const user = { firstName: 'John', lastName: 'Doe' };
    * console.log(formatUserName(user)); // John Doe
    */
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

The plugin uses the following RDF vocabularies to represent JSDoc elements:

| Prefix | Namespace | Description |
|--------|-----------|-------------|
| `rdf`  | `http://www.w3.org/1999/02/22-rdf-syntax-ns#` | RDF Syntax |
| `rdfs` | `http://www.w3.org/2000/01/rdf-schema#` | RDF Schema |
| `xsd`  | `http://www.w3.org/2001/XMLSchema#` | XML Schema Datatypes |
| `dcterms` | `http://purl.org/dc/terms/` | Dublin Core Terms |
| `foaf` | `http://xmlns.com/foaf/0.1/` | Friend of a Friend |
| `jsdoc` | `http://example.org/jsdoc#` | Custom JSDoc properties |

### JSDoc to RDF Mapping

| JSDoc Element | RDF Property | Example |
|---------------|--------------|---------|
| `@class`, `@function` | `rdf:type` | `jsdoc:Class`, `jsdoc:Function` |
| `@description` | `dcterms:description` | `"User management utility"` |
| `@param` | `jsdoc:hasParameter` | Nested parameter resources |
| `@returns` | `jsdoc:returns` | Return type and description |
| `@throws` | `jsdoc:throws` | Exception types and descriptions |
| `@example` | `jsdoc:hasExample` | Example code snippets |
| `@author` | `dcterms:creator` | Author information |
| `@version` | `dcterms:hasVersion` | Version string |
| `@since` | `dcterms:created` | Version or date |
| `@see` | `rdfs:seeAlso` | Related resources |
| `@todo` | `jsdoc:todo` | Pending tasks |
| `@deprecated` | `jsdoc:deprecated` | Boolean flag |
| `@readonly` | `jsdoc:readonly` | Boolean flag |
| `@private` | `jsdoc:access "private"` | Access level |
| `@protected` | `jsdoc:access "protected"` | Access level |
| `@public` | `jsdoc:access "public"` | Access level |
| `@static` | `jsdoc:scope "static"` | Static member |
| `@instance` | `jsdoc:scope "instance"` | Instance member |
| `@memberof` | `jsdoc:memberOf` | Parent class/namespace |
| `@extends` | `jsdoc:extends` | Parent class |
| `@implements` | `jsdoc:implements` | Implemented interfaces |

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

## License

MIT © [Danny Ayers](https://danny.ayers.name)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [JSDoc](https://jsdoc.app/) - For the amazing documentation generator
- [rdf-ext](https://github.com/rdf-ext/rdf-ext) - For RDF/JS implementation
- [Turtle](https://www.w3.org/TR/turtle/) - For the RDF serialization format

## Related Projects

- [JSDoc](https://jsdoc.app/) - API documentation generator for JavaScript
- [rdf-ext](https://github.com/rdf-ext/rdf-ext) - RDF/JS implementation with extensions
- [N3.js](https://github.com/rdfjs/N3.js) - Lightning fast, spec-compatible RDF library
- [Comunica](https://comunica.dev/) - A modular framework for querying the Web

## Version History

- **0.1.0**
  - Initial release
  - Basic JSDoc to RDF/Turtle conversion
  - Support for common JSDoc tags
  - Example implementation
  - Test suite with Vitest

## Roadmap

- [ ] Add more test cases
- [ ] Support for TypeScript type definitions
- [ ] Generate SHACL shapes from JSDoc
- [ ] Add more RDF vocabulary mappings
- [ ] Improve documentation and examples
- [ ] Add CI/CD with GitHub Actions

## Support

For support, please open an issue on the [GitHub repository](https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
