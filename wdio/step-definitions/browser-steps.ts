import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I am on the browser tab$/, async () => {
  const browserTab = await Matchers.getElementByID('browser-screen');
  await Assertions.expectElementToBeVisible(browserTab, { elemDescription: 'browser tab' });
});

When(/^I navigate to "([^"]*)"$/, async (url: string) => {
  const urlInput = await Matchers.getElementByID('url-input');
  await Gestures.typeText(urlInput, url, { 
    elemDescription: 'URL input',
    hideKeyboard: true
  });
});

When(/^I tap the search button$/, async () => {
  const searchButton = await Matchers.getElementByID('search-button');
  await Gestures.tap(searchButton, { elemDescription: 'search button' });
});

When(/^I tap "Connect" on the dApp$/, async () => {
  const connectButton = await Matchers.getElementByText('Connect');
  await Gestures.tap(connectButton, { elemDescription: 'Connect button on dApp' });
});

When(/^I approve the connection$/, async () => {
  const approveButton = await Matchers.getElementByText('Connect');
  await Gestures.tap(approveButton, { elemDescription: 'approve connection button' });
});

Then(/^I should see the connection request modal$/, async () => {
  const connectionModal = await Matchers.getElementByID('connection-request-modal');
  await Assertions.expectElementToBeVisible(connectionModal, { elemDescription: 'connection request modal' });
});

Then(/^I should see "Connected" status$/, async () => {
  await Assertions.expectTextDisplayed('Connected', { elemDescription: 'connected status' });
});

When(/^I tap the back button$/, async () => {
  const backButton = await Matchers.getElementByID('back-button');
  await Gestures.tap(backButton, { elemDescription: 'back button' });
});

When(/^I tap the forward button$/, async () => {
  const forwardButton = await Matchers.getElementByID('forward-button');
  await Gestures.tap(forwardButton, { elemDescription: 'forward button' });
});

When(/^I tap the refresh button$/, async () => {
  const refreshButton = await Matchers.getElementByID('refresh-button');
  await Gestures.tap(refreshButton, { elemDescription: 'refresh button' });
});

When(/^I tap the tabs button$/, async () => {
  const tabsButton = await Matchers.getElementByID('tabs-button');
  await Gestures.tap(tabsButton, { elemDescription: 'tabs button' });
});

When(/^I tap "New tab"$/, async () => {
  const newTabButton = await Matchers.getElementByText('New tab');
  await Gestures.tap(newTabButton, { elemDescription: 'new tab button' });
});

When(/^I close the current tab$/, async () => {
  const closeTabButton = await Matchers.getElementByID('close-tab-button');
  await Gestures.tap(closeTabButton, { elemDescription: 'close tab button' });
});

Then(/^I should see the page is loading$/, async () => {
  const loadingIndicator = await Matchers.getElementByID('loading-indicator');
  await Assertions.expectElementToBeVisible(loadingIndicator, { elemDescription: 'loading indicator' });
});

Then(/^the page should be loaded$/, async () => {
  const loadingIndicator = await Matchers.getElementByID('loading-indicator');
  await Assertions.expectElementToNotBeVisible(loadingIndicator, { elemDescription: 'loading indicator should be hidden' });
});
