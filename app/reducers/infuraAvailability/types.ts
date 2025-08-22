export interface InfuraAvailabilityState {
  isBlocked: boolean;
}

export interface InfuraAvailabilityBlockedAction {
  type: 'INFURA_AVAILABILITY_BLOCKED';
}

export interface InfuraAvailabilityNotBlockedAction {
  type: 'INFURA_AVAILABILITY_NOT_BLOCKED';
}

export type InfuraAvailabilityAction =
  | InfuraAvailabilityBlockedAction
  | InfuraAvailabilityNotBlockedAction;
