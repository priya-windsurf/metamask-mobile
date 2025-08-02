# E2E Framework Migration Guide

This guide provides detailed instructions for migrating from the legacy JavaScript utilities to the new TypeScript framework.

## Overview

The MetaMask Mobile E2E testing framework has been migrated from JavaScript to TypeScript to provide:

- Better type safety and IntelliSense support
- Enhanced error handling with retry mechanisms
- Improved debugging with descriptive error messages
- Consistent API patterns across all utilities

## Migration Steps

### 1. Update Imports

Replace legacy utility imports with framework imports:

```typescript
// Before
import Assertions from '../../utils/Assertions';
import Gestures from '../../utils/Gestures';
import Matchers from '../../utils/Matchers';
import Utilities from '../../utils/Utilities';

// After
import { Assertions, Gestures, Matchers, Utilities } from '../../framework';
```

### 2. Update Method Calls

Most method names remain the same, but now support enhanced options:

```typescript
// Before
await Gestures.waitAndTap(element);
await Assertions.checkIfVisible(element);

// After - with enhanced error handling
await Gestures.waitAndTap(element, {
  elemDescription: 'login button',
  timeout: 10000,
});
await Assertions.expectElementToBeVisible(element, {
  elemDescription: 'login button',
});
```

### 3. WebDriverIO Step Definitions

Convert JavaScript step definitions to TypeScript:

```typescript
// Before (JavaScript)
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^I tap the "([^"]*)" button$/, async (buttonText) => {
  await element(by.text(buttonText)).tap();
});

// After (TypeScript)
import { Given, When, Then } from '@wdio/cucumber-framework';
import { Gestures, Matchers } from '../../e2e/framework';

Given(/^I tap the "([^"]*)" button$/, async (buttonText: string) => {
  const button = await Matchers.getElementByText(buttonText);
  await Gestures.tap(button, { elemDescription: `${buttonText} button` });
});
```

## Key Differences

### Enhanced Error Messages

The new framework provides more descriptive error messages:

```typescript
// Framework error message example
❌ Tap action failed after 3 attempt(s) over 15000ms
📍 Element Description: login button
🔍 Last error: Element not found with text "Login"
```

### Type Safety

All methods now have proper TypeScript types:

```typescript
// Type-safe element matching
const element: DetoxElement = await Matchers.getElementByID('button-id');

// Type-safe gesture options
await Gestures.tap(element, {
  elemDescription: 'my button',
  timeout: 5000,
  checkEnabled: true,
});
```

### Retry Mechanisms

Built-in retry logic for flaky tests:

```typescript
// Automatic retries with configurable options
await Gestures.waitAndTap(element, {
  timeout: 15000,
  retryInterval: 500,
  elemDescription: 'submit button',
});
```

## Legacy Support

Legacy utilities are still available but marked as `@deprecated`. They will continue to work during the migration period:

```javascript
// Still works but deprecated
import Assertions from '../../utils/Assertions';
await Assertions.checkIfVisible(element); // Shows deprecation warning
```

## Configuration Updates

### Jest Configuration

The Jest configuration has been updated to support TypeScript:

```javascript
// e2e/jest.e2e.config.js
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // ... other config
};
```

### WebDriverIO Configuration

WebDriverIO now supports both JavaScript and TypeScript step definitions:

```javascript
// wdio.conf.js
cucumberOpts: {
  require: ['./wdio/step-definitions/*.js', './wdio/step-definitions/*.ts'],
  // ... other options
},
```

## Best Practices

### 1. Always Provide Element Descriptions

```typescript
// Good
await Gestures.tap(button, { elemDescription: 'submit button' });

// Better
await Gestures.tap(button, {
  elemDescription: 'submit button on login form',
  timeout: 10000,
});
```

### 2. Use Appropriate Timeouts

```typescript
// For fast operations
await Assertions.expectElementToBeVisible(element, { timeout: 2000 });

// For slow operations (network requests, animations)
await Gestures.waitAndTap(element, { timeout: 15000 });
```

### 3. Handle Sensitive Data

```typescript
// Mark sensitive inputs
await Gestures.typeText(passwordField, password, {
  sensitive: true,
  elemDescription: 'password field',
});
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure to use destructured imports from the framework
2. **Type Errors**: Ensure TypeScript configuration is properly set up
3. **Method Not Found**: Check if the method name has changed in the new framework

### Getting Help

- Check the framework documentation in `e2e/framework/README.md`
- Look at migrated test examples in `e2e/specs/`
- Review the TypeScript step definitions in `wdio/step-definitions/`

## Migration Checklist

- [ ] Update imports to use framework utilities
- [ ] Add element descriptions to method calls
- [ ] Convert WebDriverIO step definitions to TypeScript
- [ ] Update Jest configuration for TypeScript support
- [ ] Test migrated functionality
- [ ] Remove deprecated utility imports (optional)
