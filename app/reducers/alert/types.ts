export interface AlertState {
  isVisible: boolean;
  autodismiss: number | null;
  content: React.ReactNode | null;
  data: unknown | null;
}

export interface ShowAlertAction {
  type: 'SHOW_ALERT';
  autodismiss: number | null;
  content: React.ReactNode | null;
  data: unknown | null;
}

export interface HideAlertAction {
  type: 'HIDE_ALERT';
}

export type AlertAction = ShowAlertAction | HideAlertAction;
