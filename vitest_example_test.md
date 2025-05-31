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