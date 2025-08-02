import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I am on the send flow$/, async () => {
  const sendScreen = await Matchers.getElementByID('send-screen');
  await Assertions.expectElementToBeVisible(sendScreen, { elemDescription: 'send screen' });
});

When(/^I enter the recipient address "([^"]*)"$/, async (address: string) => {
  const addressInput = await Matchers.getElementByID('recipient-address-input');
  await Gestures.typeText(addressInput, address, { elemDescription: 'recipient address input' });
});

When(/^I enter the amount "([^"]*)"$/, async (amount: string) => {
  const amountInput = await Matchers.getElementByID('amount-input');
  await Gestures.typeText(amountInput, amount, { elemDescription: 'amount input' });
});

When(/^I select the token "([^"]*)"$/, async (tokenName: string) => {
  const tokenSelector = await Matchers.getElementByID('token-selector');
  await Gestures.tap(tokenSelector, { elemDescription: 'token selector' });
  
  const token = await Matchers.getElementByText(tokenName);
  await Gestures.tap(token, { elemDescription: `${tokenName} token option` });
});

When(/^I tap "Next"$/, async () => {
  const nextButton = await Matchers.getElementByText('Next');
  await Gestures.tap(nextButton, { elemDescription: 'Next button' });
});

When(/^I tap "Send"$/, async () => {
  const sendButton = await Matchers.getElementByText('Send');
  await Gestures.tap(sendButton, { elemDescription: 'Send button' });
});

Then(/^I should see the transaction confirmation screen$/, async () => {
  const confirmationScreen = await Matchers.getElementByID('transaction-confirmation');
  await Assertions.expectElementToBeVisible(confirmationScreen, { elemDescription: 'transaction confirmation screen' });
});

Then(/^I should see the gas fee estimation$/, async () => {
  const gasFee = await Matchers.getElementByID('gas-fee-estimation');
  await Assertions.expectElementToBeVisible(gasFee, { elemDescription: 'gas fee estimation' });
});

When(/^I tap "Edit" next to gas fee$/, async () => {
  const editGasButton = await Matchers.getElementByID('edit-gas-fee');
  await Gestures.tap(editGasButton, { elemDescription: 'edit gas fee button' });
});

When(/^I set gas price to "([^"]*)"$/, async (gasPrice: string) => {
  const gasPriceInput = await Matchers.getElementByID('gas-price-input');
  await Gestures.replaceText(gasPriceInput, gasPrice, { elemDescription: 'gas price input' });
});

When(/^I set gas limit to "([^"]*)"$/, async (gasLimit: string) => {
  const gasLimitInput = await Matchers.getElementByID('gas-limit-input');
  await Gestures.replaceText(gasLimitInput, gasLimit, { elemDescription: 'gas limit input' });
});

When(/^I tap "Save"$/, async () => {
  const saveButton = await Matchers.getElementByText('Save');
  await Gestures.tap(saveButton, { elemDescription: 'Save button' });
});

Then(/^I should see the transaction success screen$/, async () => {
  const successScreen = await Matchers.getElementByID('transaction-success');
  await Assertions.expectElementToBeVisible(successScreen, { elemDescription: 'transaction success screen' });
});

Then(/^I should see "Transaction submitted"$/, async () => {
  await Assertions.expectTextDisplayed('Transaction submitted', { elemDescription: 'transaction submitted message' });
});

When(/^I tap "Done"$/, async () => {
  const doneButton = await Matchers.getElementByText('Done');
  await Gestures.tap(doneButton, { elemDescription: 'Done button' });
});
