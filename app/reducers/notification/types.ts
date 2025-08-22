export interface NotificationTransaction {
  id: string;
}

export interface BaseNotification {
  id: string;
  isVisible: boolean;
  autodismiss: number;
  type: string;
}

export interface TransactionNotification extends BaseNotification {
  type: 'TRANSACTION';
  transaction: NotificationTransaction;
  status: string;
}

export interface SimpleNotification extends BaseNotification {
  type: 'SIMPLE';
  title: string;
  description: string;
  status: string;
}

export type Notification = TransactionNotification | SimpleNotification;

export interface NotificationState {
  notifications: Notification[];
}

export interface HideCurrentNotificationAction {
  type: 'HIDE_CURRENT_NOTIFICATION';
}

export interface HideNotificationByIdAction {
  type: 'HIDE_NOTIFICATION_BY_ID';
  id: string;
}

export interface ModifyOrShowTransactionNotificationAction {
  type: 'MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION';
  id: string;
  transaction: NotificationTransaction;
  autodismiss: number;
  status: string;
}

export interface ModifyOrShowSimpleNotificationAction {
  type: 'MODIFY_OR_SHOW_SIMPLE_NOTIFICATION';
  id: string;
  autodismiss: number;
  title: string;
  description: string;
  status: string;
}

export interface ReplaceNotificationByIdAction {
  type: 'REPLACE_NOTIFICATION_BY_ID';
  id: string;
  notification: Notification;
}

export interface RemoveNotificationByIdAction {
  type: 'REMOVE_NOTIFICATION_BY_ID';
  id: string;
}

export interface RemoveCurrentNotificationAction {
  type: 'REMOVE_CURRENT_NOTIFICATION';
}

export interface RemoveNotVisibleNotificationsAction {
  type: 'REMOVE_NOT_VISIBLE_NOTIFICATIONS';
}

export interface ShowSimpleNotificationAction {
  type: 'SHOW_SIMPLE_NOTIFICATION';
  id: string;
  autodismiss?: number;
  title: string;
  description: string;
  status: string;
}

export interface ShowTransactionNotificationAction {
  type: 'SHOW_TRANSACTION_NOTIFICATION';
  transaction: NotificationTransaction;
  autodismiss?: number;
  status: string;
}

export interface UpdateNotificationStatusAction {
  type: 'UPDATE_NOTIFICATION_STATUS';
}

export type NotificationAction =
  | HideCurrentNotificationAction
  | HideNotificationByIdAction
  | ModifyOrShowTransactionNotificationAction
  | ModifyOrShowSimpleNotificationAction
  | ReplaceNotificationByIdAction
  | RemoveNotificationByIdAction
  | RemoveCurrentNotificationAction
  | RemoveNotVisibleNotificationsAction
  | ShowSimpleNotificationAction
  | ShowTransactionNotificationAction
  | UpdateNotificationStatusAction;
