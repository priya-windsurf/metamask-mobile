import { REHYDRATE } from 'redux-persist';
import { WizardState, WizardAction } from './types';

export * from './types';

export const initialState: WizardState = {
  step: 0,
};

const onboardingWizardReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: WizardState = initialState,
  action: WizardAction,
): WizardState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case 'SET_ONBOARDING_WIZARD_STEP':
      return {
        ...state,
        step: action.step,
      };
    default:
      return state;
  }
};

export default onboardingWizardReducer;
