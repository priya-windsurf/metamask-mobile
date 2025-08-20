# Java 21 Migration Guide

This document outlines the changes made to migrate MetaMask Mobile from Java 17 to Java 21.

## Changes Made

### 1. Android Gradle Configuration

- **File**: `android/app/build.gradle`

  - Added explicit `compileOptions` block specifying Java 21 compatibility
  - Set `sourceCompatibility` and `targetCompatibility` to `JavaVersion.VERSION_21`

- **File**: `android/build.gradle`
  - Added `subprojects` block to ensure all Android subprojects use Java 21
  - Applied Java 21 compatibility settings globally

### 2. Environment Documentation

- **File**: `docs/readme/environment.md`
  - Updated `JAVA_HOME` instructions to specify Java 21 JDK installation paths
  - Added platform-specific paths for macOS, Linux, and Windows
  - Included note about Java 21 requirement and download link

### 3. Build Configuration

- **File**: `android/gradle.properties`
  - Verified existing JVM settings are compatible with Java 21
  - Current settings (4GB heap, 512MB MetaSpace) work well with Java 21

## Compatibility Notes

- Android Build Tools 35.0.0 fully supports Java 21
- Compile SDK 35 and Target SDK 35 are compatible with Java 21
- NDK version 26.1.10909125 works with Java 21
- All existing ProGuard rules remain compatible
- No code changes were required as the codebase doesn't use Java version-specific features

## Testing Requirements

Before deploying, ensure:

1. All build variants compile successfully (main, flask, qa, beta)
2. Unit tests pass
3. E2E tests pass
4. App starts and functions correctly
5. CI/CD pipeline builds successfully

## CI/CD Considerations

The Bitrise CI configuration uses `linux-docker-android-22.04` stack. This may need updating to a newer stack that includes Java 21 by default, or the CI environment should be configured to use Java 21 explicitly.

## Installation Instructions

To use Java 21 locally:

### macOS

```bash
# Using Homebrew
brew install openjdk@21
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home

# Or download from Adoptium
# Set JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install openjdk-21-jdk
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# Or download from Adoptium
```

### Windows

```cmd
# Download from Adoptium and install
# Set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.x.x.x-hotspot
```

## Verification Commands

```bash
# Verify Java version
java -version

# Build all variants
cd android
./gradlew assembleDebug
./gradlew assembleRelease
./gradlew assembleQaDebug
./gradlew assembleFlaskDebug

# Run tests
cd ..
yarn test:unit
yarn lint
```
