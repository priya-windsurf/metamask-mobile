export interface WizardState {
  step: number;
}

export interface SetOnboardingWizardStepAction {
  type: 'SET_ONBOARDING_WIZARD_STEP';
  step: number;
}

export interface RehydrateAction {
  type: 'persist/REHYDRATE';
}

export type WizardAction = SetOnboardingWizardStepAction | RehydrateAction;
