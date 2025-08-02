import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I am on the wallet view$/, async () => {
  const walletView = await Matchers.getElementByID('wallet-screen');
  await Assertions.expectElementToBeVisible(walletView, { elemDescription: 'wallet view' });
});

When(/^I tap on the account dropdown$/, async () => {
  const accountDropdown = await Matchers.getElementByID('account-dropdown');
  await Gestures.tap(accountDropdown, { elemDescription: 'account dropdown' });
});

When(/^I tap on the settings button$/, async () => {
  const settingsButton = await Matchers.getElementByID('settings-button');
  await Gestures.tap(settingsButton, { elemDescription: 'settings button' });
});

When(/^I tap on the send button$/, async () => {
  const sendButton = await Matchers.getElementByID('send-button');
  await Gestures.tap(sendButton, { elemDescription: 'send button' });
});

When(/^I tap on the receive button$/, async () => {
  const receiveButton = await Matchers.getElementByID('receive-button');
  await Gestures.tap(receiveButton, { elemDescription: 'receive button' });
});

When(/^I tap on the buy button$/, async () => {
  const buyButton = await Matchers.getElementByID('buy-button');
  await Gestures.tap(buyButton, { elemDescription: 'buy button' });
});

Then(/^I should see my account balance$/, async () => {
  const balance = await Matchers.getElementByID('account-balance');
  await Assertions.expectElementToBeVisible(balance, { elemDescription: 'account balance' });
});

Then(/^I should see the token list$/, async () => {
  const tokenList = await Matchers.getElementByID('token-list');
  await Assertions.expectElementToBeVisible(tokenList, { elemDescription: 'token list' });
});

When(/^I tap on token "([^"]*)"$/, async (tokenName: string) => {
  const token = await Matchers.getElementByText(tokenName);
  await Gestures.tap(token, { elemDescription: `${tokenName} token` });
});

When(/^I scroll down on the token list$/, async () => {
  const tokenList = await Matchers.getElementByID('token-list');
  await Gestures.swipe(tokenList, 'down', { elemDescription: 'token list' });
});

Then(/^I should see the transaction history$/, async () => {
  const transactionHistory = await Matchers.getElementByID('transaction-history');
  await Assertions.expectElementToBeVisible(transactionHistory, { elemDescription: 'transaction history' });
});
