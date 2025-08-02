import { Given, When, Then } from '@wdio/cucumber-framework';
import { Assertions, Gestures, Matchers } from '../../e2e/framework';

Given(/^I tap the "([^"]*)" button$/, async (buttonText: string) => {
  const button = await Matchers.getElementByText(buttonText);
  await Gestures.tap(button, { elemDescription: `${buttonText} button` });
});

When(/^I type "([^"]*)" in the "([^"]*)" field$/, async (text: string, fieldName: string) => {
  const field = await Matchers.getElementByID(fieldName);
  await Gestures.typeText(field, text, { elemDescription: `${fieldName} field` });
});

Then(/^I should see "([^"]*)"$/, async (text: string) => {
  await Assertions.expectTextDisplayed(text, { elemDescription: `text: ${text}` });
});

Then(/^I should not see "([^"]*)"$/, async (text: string) => {
  await Assertions.expectTextNotDisplayed(text, { elemDescription: `text: ${text}` });
});

Then(/^the "([^"]*)" element should be visible$/, async (elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Assertions.expectElementToBeVisible(element, { elemDescription: elementId });
});

Then(/^the "([^"]*)" element should not be visible$/, async (elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Assertions.expectElementToNotBeVisible(element, { elemDescription: elementId });
});

When(/^I wait for "([^"]*)" seconds$/, async (seconds: string) => {
  await new Promise(resolve => setTimeout(resolve, parseInt(seconds) * 1000));
});

When(/^I swipe "([^"]*)" on "([^"]*)"$/, async (direction: string, elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Gestures.swipe(element, direction as 'up' | 'down' | 'left' | 'right', {
    elemDescription: `${elementId} element`
  });
});

When(/^I long press on "([^"]*)"$/, async (elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Gestures.longPress(element, { elemDescription: `${elementId} element` });
});

Then(/^the "([^"]*)" toggle should be on$/, async (elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Assertions.expectToggleToBeOn(element, { elemDescription: `${elementId} toggle` });
});

Then(/^the "([^"]*)" toggle should be off$/, async (elementId: string) => {
  const element = await Matchers.getElementByID(elementId);
  await Assertions.expectToggleToBeOff(element, { elemDescription: `${elementId} toggle` });
});
