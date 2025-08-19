import { Given, When, Then } from '@wdio/cucumber-framework';
import SendScreen from '../screen-objects/SendScreen';
import AmountScreen from '../screen-objects/AmountScreen';
import TransactionConfirmScreen from '../screen-objects/TransactionConfirmScreen';
import WalletMainScreen from '../screen-objects/WalletMainScreen';
import { Gestures } from '../../e2e/framework';

Given(/^I am on the send screen$/, async () => {
  console.log('Navigated to send screen');
});

When(/^I enter recipient address "([^"]*)"$/, async (address: string) => {
  console.log(`Entering recipient address: ${address}`);
});

When(/^I tap the next button on send screen$/, async () => {
  console.log('Tapping next button on send screen');
});

When(/^I enter amount "([^"]*)"$/, async (amount: string) => {
  console.log(`Entering amount: ${amount}`);
});

When(/^I tap the next button on amount screen$/, async () => {
  console.log('Tapping next button on amount screen');
});

When(/^I tap the confirm button$/, async () => {
  console.log('Tapping confirm button');
});

Then(/^I should see the transaction confirmation screen$/, async () => {
  console.log('Validating transaction confirmation screen');
});

Then(/^I should be taken back to the main wallet view$/, async () => {
  await WalletMainScreen.isMainWalletViewVisible();
});

When(/^I scroll down on the send screen$/, async () => {
  console.log('Scrolling down on send screen');
});
