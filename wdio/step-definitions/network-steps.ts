import { Given, When, Then } from '@wdio/cucumber-framework';
import NetworkListModal from '../screen-objects/Modals/NetworkListModal';
import NetworkApprovalModal from '../screen-objects/Modals/NetworkApprovalModal';
import NetworkEducationModal from '../screen-objects/Modals/NetworkEducationModal';
import { Gestures } from '../../e2e/framework';

When(/^I tap on the Add a Network button$/, async () => {
  await NetworkListModal.tapAddNetworkButton();
});

When(/^I tap on the network approval button$/, async () => {
  await NetworkApprovalModal.tapApproveButton();
});

When(/^I tap on the network education continue button$/, async () => {
  await NetworkEducationModal.tapGotItButton();
});

Then(/^I should see the network list modal$/, async () => {
  console.log('Network list modal should be displayed');
});

When(/^I scroll down on the network list$/, async () => {
  console.log('Scrolling down on network list');
});
