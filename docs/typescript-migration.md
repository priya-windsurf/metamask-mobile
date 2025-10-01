# TypeScript Migration Guide

## Overview

MetaMask Mobile is actively migrating from JavaScript to TypeScript. This guide documents patterns, best practices, and tooling for the migration process.

## Current Status

- **TypeScript Configuration**: Strict mode enabled in `tsconfig.json`
- **Migration Progress**: ~60% complete (1,600 TypeScript files, 325 JavaScript files remaining)
  - Components: 190 JS files remaining
  - Core: 21 JS files remaining
  - Util: 32 JS files remaining
- **Guardrails**: Fitness function active in CI prevents new JavaScript files

## Fitness Function

The repository enforces a TypeScript-only policy for the `app/` directory through a fitness function in CI.

**How it works**:

- Runs on every PR via GitHub Actions workflow
- Checks git diff for new `.js` or `.jsx` files in the `app/` directory
- Blocks PRs that add new JavaScript files
- Allows modifications to existing JavaScript files during migration

**Testing locally**:

```bash
cd .github/scripts
yarn install
yarn fitness-functions ci ../path/to/diff
```

## Migration Patterns

### Pattern 1: React Component Migration

**Key Steps**:

1. Rename `.js`/`.jsx` to `.ts`/`.tsx`
2. Define prop interfaces
3. Add type annotations to hooks and state
4. Type Redux selectors and dispatch
5. Add return types to functions

**Template**:

```typescript
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types (important-comment)
interface MyComponentNavigationParamList {
  TargetScreen: { param: string };
  [key: string]: undefined | object;
}

// Define prop types (important-comment)
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  const navigation = useNavigation<
    StackNavigationProp<MyComponentNavigationParamList, 'TargetScreen'>
  >();

  const [localState, setLocalState] = useState<string>('');

  // Type selector returns (important-comment)
  const data = useSelector((state: RootState) => state.someData);

  const handleAction = useCallback(() => {
    // Implementation (important-comment)
  }, []);

  return (
    // JSX (important-comment)
  );
};

export default MyComponent;
```

### Pattern 2: Redux Reducer Migration

**Key Steps**:

1. Define state interface
2. Define action types with discriminated unions
3. Type the reducer function
4. Export state type for use in RootState
5. Add typed selectors

**Template**:

```typescript
// types.ts (important-comment)
export interface MyState {
  loading: boolean;
  data: string | null;
  error: string | null;
}

export enum MyActionType {
  SET_LOADING = 'MY_MODULE/SET_LOADING',
  SET_DATA = 'MY_MODULE/SET_DATA',
  SET_ERROR = 'MY_MODULE/SET_ERROR',
}

export type MyAction =
  | { type: MyActionType.SET_LOADING; payload: boolean }
  | { type: MyActionType.SET_DATA; payload: string }
  | { type: MyActionType.SET_ERROR; payload: string };

// reducer.ts (important-comment)
import { MyAction, MyActionType, MyState } from './types';

export const initialState: MyState = {
  loading: false,
  data: null,
  error: null,
};

const myReducer = (
  state: MyState = initialState,
  action: MyAction,
): MyState => {
  switch (action.type) {
    case MyActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MyActionType.SET_DATA:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case MyActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default myReducer;

// selectors.ts (important-comment)
import { RootState } from '../index';

export const selectMyData = (state: RootState): string | null =>
  state.myModule.data;

export const selectMyLoading = (state: RootState): boolean =>
  state.myModule.loading;
```

### Pattern 3: Utility Function Migration

**Key Steps**:

1. Add explicit parameter types
2. Add explicit return types
3. Type any internal variables
4. Use TypeScript utility types when appropriate

**Template**:

```typescript
// Simple utility (important-comment)
export const formatAddress = (address: string, chars: number = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

// Utility with generics (important-comment)
export const safelyGet = <T, K extends keyof T>(
  obj: T,
  key: K,
  defaultValue: T[K],
): T[K] => {
  return obj[key] ?? defaultValue;
};

// Utility with union types (important-comment)
export type NetworkType = 'mainnet' | 'testnet' | 'custom';

export const getNetworkType = (chainId: string): NetworkType => {
  if (chainId === '0x1') return 'mainnet';
  if (['0x3', '0x4', '0x5', '0x2a'].includes(chainId)) return 'testnet';
  return 'custom';
};
```

## E2E Testing Framework Migration

The E2E testing framework provides an excellent reference for TypeScript migration patterns. See `e2e/framework/README.md` for details.

**Key Takeaways**:

- Use strict TypeScript with proper type definitions
- Create reusable type interfaces
- Document deprecated patterns vs modern equivalents
- Provide migration examples
- Use discriminated unions for complex types

## Common Migration Issues

### Issue 1: Redux State Types

**Problem**: `any` types in Redux state
**Solution**: Define proper state interfaces in RootState

### Issue 2: Navigation Types

**Problem**: Untyped navigation parameters
**Solution**: Define navigation param lists with StackNavigationProp

### Issue 3: Selector Return Types

**Problem**: Selectors without return type annotations
**Solution**: Always specify return types for selectors

```typescript
// Bad (important-comment)
const selectData = (state: RootState) => state.data;

// Good (important-comment)
const selectData = (state: RootState): DataType => state.data;
```

### Issue 4: Event Handlers

**Problem**: Untyped event handlers
**Solution**: Use React's built-in event types

```typescript
import { GestureResponderEvent } from 'react-native';

const handlePress = (event: GestureResponderEvent): void => {
  // Implementation (important-comment)
};
```

## Migration Priority

**High Priority** (Core functionality):

1. Core controllers and state management
2. Transaction handling
3. Network interactions
4. Security-critical components

**Medium Priority** (User-facing):

1. UI components
2. Navigation flows
3. Settings and preferences

**Low Priority** (Supporting):

1. Utility functions
2. Helper modules
3. Legacy migration files

Use the migration tracking script to identify and prioritize files:

```bash
yarn migration:track
```

## Best Practices

1. **Incremental Migration**: Migrate one file at a time, test thoroughly
2. **Type Safety**: Avoid `any`, use `unknown` when type is truly unknown
3. **Strict Mode**: Keep `strict: true` in tsconfig.json
4. **No Type Assertions**: Avoid `as` unless absolutely necessary
5. **Proper Imports**: Use type imports when importing only types
6. **Document Complex Types**: Add JSDoc comments for complex type definitions
7. **Test After Migration**: Run tests and lint after each migration
8. **Reuse Types**: Look for existing types before creating new ones

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [MetaMask ESLint Config](https://github.com/MetaMask/eslint-config)
- [E2E Framework README](../e2e/framework/README.md)

## Getting Help

- Check existing migrated files for patterns
- Review this documentation
- Ask in #mobile-dev channel
- Consult with TypeScript champions on the team
