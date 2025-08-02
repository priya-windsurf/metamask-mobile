import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I am on the login screen$/, async () => {
  const loginScreen = await Matchers.getElementByID('login-screen');
  await Assertions.expectElementToBeVisible(loginScreen, { elemDescription: 'login screen' });
});

When(/^I enter my password "([^"]*)"$/, async (password: string) => {
  const passwordInput = await Matchers.getElementByID('login-password-input');
  await Gestures.typeText(passwordInput, password, { 
    elemDescription: 'login password input',
    sensitive: true
  });
});

When(/^I tap "Unlock"$/, async () => {
  const unlockButton = await Matchers.getElementByText('Unlock');
  await Gestures.tap(unlockButton, { elemDescription: 'Unlock button' });
});

When(/^I tap "Forgot password?"$/, async () => {
  const forgotPasswordLink = await Matchers.getElementByText('Forgot password?');
  await Gestures.tap(forgotPasswordLink, { elemDescription: 'Forgot password link' });
});

Then(/^I should see "Invalid password" error$/, async () => {
  await Assertions.expectTextDisplayed('Invalid password', { elemDescription: 'invalid password error' });
});

Then(/^I should be logged in successfully$/, async () => {
  const walletView = await Matchers.getElementByID('wallet-screen');
  await Assertions.expectElementToBeVisible(walletView, { elemDescription: 'wallet view after login' });
});

When(/^I enable biometric authentication$/, async () => {
  const biometricToggle = await Matchers.getElementByID('biometric-toggle');
  await Gestures.tap(biometricToggle, { elemDescription: 'biometric authentication toggle' });
});

When(/^I use biometric authentication$/, async () => {
  const biometricButton = await Matchers.getElementByID('biometric-login-button');
  await Gestures.tap(biometricButton, { elemDescription: 'biometric login button' });
});

Then(/^I should see the biometric prompt$/, async () => {
  const biometricPrompt = await Matchers.getElementByID('biometric-prompt');
  await Assertions.expectElementToBeVisible(biometricPrompt, { elemDescription: 'biometric authentication prompt' });
});

When(/^I tap "Reset wallet"$/, async () => {
  const resetWalletButton = await Matchers.getElementByText('Reset wallet');
  await Gestures.tap(resetWalletButton, { elemDescription: 'Reset wallet button' });
});

When(/^I confirm wallet reset$/, async () => {
  const confirmButton = await Matchers.getElementByText('Reset');
  await Gestures.tap(confirmButton, { elemDescription: 'Confirm reset button' });
});

Then(/^I should be redirected to onboarding$/, async () => {
  const onboardingScreen = await Matchers.getElementByID('onboarding-screen');
  await Assertions.expectElementToBeVisible(onboardingScreen, { elemDescription: 'onboarding screen after reset' });
});
