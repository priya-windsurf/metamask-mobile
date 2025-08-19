import { Given, When, Then } from '@wdio/cucumber-framework';
import WalletMainScreen from '../screen-objects/WalletMainScreen';
import TabBarModal from '../screen-objects/Modals/TabBarModal';
import { Gestures } from '../../e2e/framework';

Given(/^I am on the main wallet view$/, async () => {
  await WalletMainScreen.isMainWalletViewVisible();
});

When(/^I tap on the identicon$/, async () => {
  await WalletMainScreen.tapIdenticon();
});

When(/^I tap on the wallet tab$/, async () => {
  await TabBarModal.tapWalletButton();
});

When(/^I tap on the browser tab$/, async () => {
  await TabBarModal.tapBrowserButton();
});

When(/^I tap on the activity tab$/, async () => {
  await TabBarModal.tapActivityButton();
});

When(/^I tap on the settings tab$/, async () => {
  await TabBarModal.tapSettingButton();
});

When(/^I scroll down on the main wallet view$/, async () => {
  console.log('Scrolling down on main wallet view');
});

When(/^I scroll up on the main wallet view$/, async () => {
  console.log('Scrolling up on main wallet view');
});

Then(/^I should see the wallet balance$/, async () => {
  await WalletMainScreen.isMainWalletViewVisible();
});

Then(/^I should see the network name "([^"]*)"$/, async (networkName: string) => {
  await WalletMainScreen.isNetworkNameCorrect(networkName);
});
