![MetaMask logo](logo.png?raw=true)

# MetaMask

[![CI](https://github.com/MetaMask/metamask-mobile/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/MetaMask/metamask-mobile/actions/workflows/ci.yml) [![CLA](https://github.com/MetaMask/metamask-mobile/actions/workflows/cla.yml/badge.svg?branch=main)](https://github.com/MetaMask/metamask-mobile/actions/workflows/cla.yml)

MetaMask is a mobile wallet that provides easy access to websites that use the [Ethereum](https://ethereum.org/) blockchain.

For up to the minute news, follow our [Twitter](https://twitter.com/metamask) or [Medium](https://medium.com/metamask) pages.

To learn how to develop MetaMask-compatible applications, visit our [Developer Docs](https://docs.metamask.io).

To learn how to contribute to the MetaMask codebase, visit our [Contributor Docs](https://github.com/MetaMask/contributor-docs).

## About MetaMask Mobile

MetaMask Mobile is a comprehensive React Native cryptocurrency wallet application that serves as your gateway to Web3. It enables users to securely store, manage, and interact with digital assets across multiple blockchain networks directly from their mobile devices.

### Key Features

**🔐 Multi-Chain Support**

- Ethereum mainnet and testnets
- Layer 2 networks (Arbitrum, Optimism, Polygon, Base, Linea, and more)
- EVM-compatible chains
- Bitcoin and Solana support via multichain architecture

**🌐 DApp Integration**

- Built-in Web3-enabled browser for seamless DApp interaction
- WalletConnect protocol support for connecting to desktop DApps and services
- MetaMask SDK integration for direct app-to-app connections
- Permission management system using CAIP-25 for cross-chain access control

**💎 Asset Management**

- Comprehensive token and NFT management
- Automatic token detection across supported networks
- NFT collection viewing and management
- Built-in swap aggregation for trading tokens
- Bridge functionality for moving assets across chains

**🔒 Security & Privacy**

- Blockaid integration for real-time transaction threat detection
- Hardware wallet support (Ledger, Keystone/QR-based wallets)
- Biometric authentication (Face ID, Touch ID, fingerprint)
- Secure key management with encrypted vault storage
- Origin throttling to prevent spam and malicious requests

**🔌 Extensibility**

- Snaps support for extending wallet functionality with third-party plugins
- Modular controller architecture for easy feature addition
- Support for custom RPC endpoints and network configurations

### Architecture

MetaMask Mobile is built on a robust **Engine-based controller architecture** that manages all core functionality:

- **Engine**: Central orchestrator managing the lifecycle of all controllers
- **Controller System**: Modular controllers handle specific domains (KeyringController for accounts, NetworkController for chain management, TransactionController for transaction processing, etc.)
- **Redux State Management**: Predictable state container for the entire application
- **Background Bridge**: Secure communication layer between WebViews and native wallet functionality
- **RPC Method Middleware**: Request validation, routing, and permission checking for DApp interactions

### Technology Stack

- **Framework**: React Native with Expo for rapid development
- **Language**: TypeScript for type safety and better developer experience
- **State Management**: Redux with Redux Saga for side effects
- **Testing**: Jest for unit tests, Detox for E2E testing, Storybook for component development
- **Build Tools**: Fastlane (iOS), Gradle (Android), GitHub Actions for CI/CD
- **Platforms**: iOS and Android with platform-specific optimizations

### Who Is This For?

MetaMask Mobile is designed for:

- **Crypto enthusiasts** who want secure mobile access to their digital assets
- **DeFi users** who need to interact with decentralized finance protocols on the go
- **NFT collectors** managing their digital collectibles
- **Developers** building or testing DApps with mobile wallet integration
- **Anyone** seeking a secure, feature-rich gateway to the Web3 ecosystem

## Documentation

- [Architecture](./docs/readme/architecture.md)
- [Expo Development Environment Setup](./docs/readme/expo-environment.md)
- [Native Development Environment Setup](./docs/readme/environment.md)
- [Build Troubleshooting](./docs/readme/troubleshooting.md)
- [Testing](./docs/readme/testing.md)
- [Debugging](./docs/readme/debugging.md)
- [Performance](./docs/readme/performance.md)
- [API Call Logging for Debugging](./docs/readme/api-logging.md)
- [Storybook](./docs/readme/storybook.md)
- [Miscellaneous](./docs/readme/miscellaneous.md)
- [E2E Testing Segment Events](./docs/testing/e2e/segment-events.md)

## Getting started

### Using Expo (recommended)

Expo is the fastest way to start developing. With the Expo framework, developers don't need to compile the native side of the application as before, hence no need for any native environment setup, developers only need to download a precompiled development build and run the javascript bundler. The development build will then connect with the bundler to load the javascript code.

#### Expo Environment Setup

[Install node, yarn and watchman.](./docs/readme/expo-environment.md)

#### Clone the project

```bash
git clone git@github.com:MetaMask/metamask-mobile.git && \
cd metamask-mobile
```

#### Install dependencies

```bash
yarn setup:expo
```

#### Run the bundler

```bash
yarn watch
```

#### Download and install the development build

- Expo development builds are hosted in [Runway](https://www.runway.team/) buckets and are made available to all contributors through the public bucket links below. A new build is generated every time a PR is merged into the `main` branch.

- For Android:
  - Download and install an `.apk` file from this [Runway bucket](https://app.runway.team/bucket/hykQxdZCEGgoyyZ9sBtkhli8wupv9PiTA6uRJf3Lh65FTECF1oy8vzkeXdmuJKhm7xGLeV35GzIT1Un7J5XkBADm5OhknlBXzA0CzqB767V36gi1F3yg3Uss) onto your Android device or emulator.
- For iOS:
  - Physical device
    - Your test device needs to first be registered with our Apple developer account.
    - Once registered, download and install an `.ipa` file from this [Runway bucket](https://app.runway.team/bucket/MV2BJmn6D5_O7nqGw8jHpATpEA4jkPrBB4EcWXC6wV7z8jgwIbAsDhE5Ncl7KwF32qRQQD9YrahAIaxdFVvLT4v3UvBcViMtT3zJdMMfkXDPjSdqVGw=) onto your device.
  - Simulator
    - Download and install an `.app` file from this [Runway bucket](https://app.runway.team/bucket/aCddXOkg1p_nDryri-FMyvkC9KRqQeVT_12sf6Nw0u6iGygGo6BlNzjD6bOt-zma260EzAxdpXmlp2GQphp3TN1s6AJE4i6d_9V0Tv5h4pHISU49dFk=) onto your simulator.
    - Note: Our `.app` files are zipped and hosted under `Additional Artifacts` in the bucket. Since this hosting additional artifacts in public buckets is a relatively new feature, contributors may find that some builds are missing additional artifacts. Under the hood, these are usually associated with failed or aborted Bitrise builds. We are working with the Runway team to better filter out these builds and are subject to change in the future.

#### Load the app

If on a simulator:

- use the initial expo screen that appears when starting the development to choose the bundler url
- OR press "a" for Android or "i" for iOS on the terminal where the bundler is running

If on a physical device:

- Use the camera app to scan the QR code presented by the bundler running on the terminal

That's it! This will work for any javascript development, if you need to develop or modify native code please see the next section.

### Native Development

If developing or modifying native code or installing any library that introduces or uses native code, it is not possible to use an Expo precompiled development build as you need to compile the native side of the application again. To do so, please follow the steps stated in this section.

#### Native Environment setup

Before running the app for native development, make sure your development environment has all the required tools. Several of these tools (ie Node and Ruby) may require specific versions in order to successfully build the app.

[Setup your development environment](./docs/readme/environment.md)

#### Building the app

**Clone the project**

```bash
git clone git@github.com:MetaMask/metamask-mobile.git && \
cd metamask-mobile
```

##### Firebase Messaging Setup

MetaMask uses Firebase Cloud Messaging (FCM) to enable app communications. To integrate FCM, you'll need configuration files for both iOS and Android platforms.

###### Internal Contributor instructions

1. Grab the `.js.env` file from 1Password, ask around for the correct vault. This file contains the `GOOGLE_SERVICES_B64_ANDROID` and `GOOGLE_SERVICES_B64_IOS` secrets that will be used to generate the relevant configuration files for IOS/Android.
2. [Install](./README.md#install-dependencies) and [run & start](./README.md#running-the-app) the application as documented below.

###### External Contributor instructions

As an external contributor, you need to provide your own Firebase project configuration files:

- **`GoogleService-Info.plist`** (iOS)
- **`google-services.json`** (Android)

1. Create a Free Firebase Project
   - Set up a Firebase project in the Firebase Console.
   - Configure the project with a client package name matching `io.metamask` (IMPORTANT).
2. Add Configuration Files
   - Create/Update the `google-services.json` and `GoogleService-Info.plist` files in:
   - `android/app/google-services.json` (for Android)
   - `ios/GoogleServices/GoogleService-Info.plist` directory (for iOS)
3. Create the correct base64 environments variables.

```bash
# Generate Android Base64 Version of Google Services
export GOOGLE_SERVICES_B64_ANDROID="$(base64 -w0 -i ./android/app/google-services.json)" && echo "export GOOGLE_SERVICES_B64_ANDROID=\"$GOOGLE_SERVICES_B64_ANDROID\"" | tee -a .js.env

# Generate IOS Base64 Version of Google Services
export GOOGLE_SERVICES_B64_IOS="$(base64 -w0 -i ./ios/GoogleServices/GoogleService-Info.plist)" && echo "export GOOGLE_SERVICES_B64_IOS=\"$GOOGLE_SERVICES_B64_IOS\"" | tee -a .js.env
```

[!CAUTION]

> In case you don't provide your own Firebase project config file or run the steps above, you will face the error `No matching client found for package name 'io.metamask'`.

In case of any doubt, please follow the instructions in the link below to get your Firebase project config file.
[Firebase Project Quickstart](https://firebaseopensource.com/projects/firebase/quickstart-js/messaging/readme/#getting_started)

##### Install dependencies

```bash
yarn setup
```

_Not the usual install command, this will run scripts and a lengthy postinstall flow_

#### Running the app for native development

**Run Metro bundler**

```bash
yarn watch
```

_Like a local server for the app_

**Run on a iOS device**

```bash
yarn start:ios
```

**Run on an Android device**

```bash
yarn start:android
```
