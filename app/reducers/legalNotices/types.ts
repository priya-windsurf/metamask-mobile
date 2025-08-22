export interface LegalNoticesState {
  newPrivacyPolicyToastClickedOrClosed: boolean;
  newPrivacyPolicyToastShownDate: number | null;
}

export interface StorePrivacyPolicyShownDateAction {
  type: 'STORE_PRIVACY_POLICY_SHOWN_DATE';
  payload: number;
}

export interface StorePrivacyPolicyClickedOrClosedAction {
  type: 'STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED';
}

export type LegalNoticesAction =
  | StorePrivacyPolicyShownDateAction
  | StorePrivacyPolicyClickedOrClosedAction;

export default {
  STORE_PRIVACY_POLICY_SHOWN_DATE: 'STORE_PRIVACY_POLICY_SHOWN_DATE',
  STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED:
    'STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED',
};
