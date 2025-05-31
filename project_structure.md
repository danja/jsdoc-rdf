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