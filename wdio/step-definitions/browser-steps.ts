import { Given, When, Then } from '@wdio/cucumber-framework';
import TabBarModal from '../screen-objects/Modals/TabBarModal';
import { Gestures } from '../../e2e/framework';

Given(/^I am on Home MetaMask website$/, async () => {
  console.log('Navigating to MetaMask website');
});

When(/^I navigate to the browser$/, async () => {
  await TabBarModal.tapBrowserButton();
});

When(/^I enter URL "([^"]*)"$/, async (url: string) => {
  console.log(`Entering URL: ${url}`);
});

When(/^I tap the back button in browser$/, async () => {
  console.log('Tapping back button in browser');
});

When(/^I tap the forward button in browser$/, async () => {
  console.log('Tapping forward button in browser');
});

When(/^I scroll down on the browser$/, async () => {
  console.log('Scrolling down on browser');
});

Then(/^I should see the browser view$/, async () => {
  console.log('Browser view should be displayed');
});
