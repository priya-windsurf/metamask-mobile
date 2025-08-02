import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I am on the onboarding screen$/, async () => {
  const onboardingScreen = await Matchers.getElementByID('onboarding-screen');
  await Assertions.expectElementToBeVisible(onboardingScreen, { elemDescription: 'onboarding screen' });
});

When(/^I tap "Get started"$/, async () => {
  const getStartedButton = await Matchers.getElementByText('Get started');
  await Gestures.tap(getStartedButton, { elemDescription: 'Get started button' });
});

When(/^I tap "Create a new wallet"$/, async () => {
  const createWalletButton = await Matchers.getElementByText('Create a new wallet');
  await Gestures.tap(createWalletButton, { elemDescription: 'Create a new wallet button' });
});

When(/^I tap "Import using Secret Recovery Phrase"$/, async () => {
  const importButton = await Matchers.getElementByText('Import using Secret Recovery Phrase');
  await Gestures.tap(importButton, { elemDescription: 'Import wallet button' });
});

When(/^I enter the secret recovery phrase "([^"]*)"$/, async (phrase: string) => {
  const phraseInput = await Matchers.getElementByID('secret-recovery-phrase-input');
  await Gestures.typeText(phraseInput, phrase, { 
    elemDescription: 'secret recovery phrase input',
    sensitive: true
  });
});

When(/^I enter the password "([^"]*)"$/, async (password: string) => {
  const passwordInput = await Matchers.getElementByID('password-input');
  await Gestures.typeText(passwordInput, password, { 
    elemDescription: 'password input',
    sensitive: true
  });
});

When(/^I confirm the password "([^"]*)"$/, async (password: string) => {
  const confirmPasswordInput = await Matchers.getElementByID('confirm-password-input');
  await Gestures.typeText(confirmPasswordInput, password, { 
    elemDescription: 'confirm password input',
    sensitive: true
  });
});

When(/^I agree to the terms of use$/, async () => {
  const termsCheckbox = await Matchers.getElementByID('terms-checkbox');
  await Gestures.tap(termsCheckbox, { elemDescription: 'terms of use checkbox' });
});

When(/^I tap "Create password"$/, async () => {
  const createPasswordButton = await Matchers.getElementByText('Create password');
  await Gestures.tap(createPasswordButton, { elemDescription: 'Create password button' });
});

When(/^I tap "Import"$/, async () => {
  const importButton = await Matchers.getElementByText('Import');
  await Gestures.tap(importButton, { elemDescription: 'Import button' });
});

Then(/^I should see the wallet creation success screen$/, async () => {
  const successScreen = await Matchers.getElementByID('wallet-creation-success');
  await Assertions.expectElementToBeVisible(successScreen, { elemDescription: 'wallet creation success screen' });
});

Then(/^I should see the secure your wallet screen$/, async () => {
  const secureWalletScreen = await Matchers.getElementByID('secure-wallet-screen');
  await Assertions.expectElementToBeVisible(secureWalletScreen, { elemDescription: 'secure wallet screen' });
});

When(/^I tap "Remind me later"$/, async () => {
  const remindLaterButton = await Matchers.getElementByText('Remind me later');
  await Gestures.tap(remindLaterButton, { elemDescription: 'Remind me later button' });
});

When(/^I tap "Skip"$/, async () => {
  const skipButton = await Matchers.getElementByText('Skip');
  await Gestures.tap(skipButton, { elemDescription: 'Skip button' });
});

Then(/^I should be on the wallet view$/, async () => {
  const walletView = await Matchers.getElementByID('wallet-screen');
  await Assertions.expectElementToBeVisible(walletView, { elemDescription: 'wallet view' });
});
