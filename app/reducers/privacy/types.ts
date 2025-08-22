export interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: number[];
}

export interface ApproveHostAction {
  type: 'APPROVE_HOST';
  hostname: string;
}

export interface RejectHostAction {
  type: 'REJECT_HOST';
  hostname: string;
}

export interface ClearHostsAction {
  type: 'CLEAR_HOSTS';
}

export interface RecordSRPRevealTimestampAction {
  type: 'RECORD_SRP_REVEAL_TIMESTAMP';
  timestamp: number;
}

export type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;
