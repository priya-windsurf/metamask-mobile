import { createSelector } from 'reselect';
import { NotificationTypes } from '../../util/notifications';
import {
  NotificationState,
  NotificationAction,
  Notification,
  HideNotificationByIdAction,
  ModifyOrShowTransactionNotificationAction,
  ModifyOrShowSimpleNotificationAction,
  ShowTransactionNotificationAction,
  ShowSimpleNotificationAction,
  ReplaceNotificationByIdAction,
  RemoveNotificationByIdAction,
} from './types';
import { RootState } from '../index';

export * from './types';

const { TRANSACTION, SIMPLE } = NotificationTypes;

export const initialState: NotificationState = {
  notifications: [],
};

export const ACTIONS = {
  HIDE_CURRENT_NOTIFICATION: 'HIDE_CURRENT_NOTIFICATION',
  HIDE_NOTIFICATION_BY_ID: 'HIDE_NOTIFICATION_BY_ID',
  MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION:
    'MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION',
  MODIFY_OR_SHOW_SIMPLE_NOTIFICATION: 'MODIFY_OR_SHOW_SIMPLE_NOTIFICATION',
  REPLACE_NOTIFICATION_BY_ID: 'REPLACE_NOTIFICATION_BY_ID',
  REMOVE_NOTIFICATION_BY_ID: 'REMOVE_NOTIFICATION_BY_ID',
  REMOVE_CURRENT_NOTIFICATION: 'REMOVE_CURRENT_NOTIFICATION',
  REMOVE_NOT_VISIBLE_NOTIFICATIONS: 'REMOVE_NOT_VISIBLE_NOTIFICATIONS',
  SHOW_SIMPLE_NOTIFICATION: 'SHOW_SIMPLE_NOTIFICATION',
  SHOW_TRANSACTION_NOTIFICATION: 'SHOW_TRANSACTION_NOTIFICATION',
  UPDATE_NOTIFICATION_STATUS: 'UPDATE_NOTIFICATION_STATUS',
};

const enqueue = (
  notifications: Notification[],
  notification: Notification,
): Notification[] => [...notifications, notification];
const dequeue = (notifications: Notification[]): Notification[] =>
  notifications.slice(1);

export const currentNotificationSelector = createSelector(
  (state: RootState) => state.notification,
  (notifications: NotificationState) => notifications.notifications[0] || null,
);

const notificationReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: NotificationState = initialState,
  action: NotificationAction,
): NotificationState => {
  const { notifications } = state;
  switch (action.type) {
    case ACTIONS.HIDE_CURRENT_NOTIFICATION: {
      if (notifications[0]) {
        return {
          ...state,
          notifications: [
            { ...notifications[0], isVisible: false },
            ...notifications.slice(1),
          ],
        };
      }
      return state;
    }
    case ACTIONS.HIDE_NOTIFICATION_BY_ID: {
      const hideAction = action as HideNotificationByIdAction;
      const index = notifications.findIndex(({ id }) => id === hideAction.id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...notifications.slice(0, index),
          { ...notifications[index], isVisible: false },
          ...notifications.slice(index + 1),
        ],
      };
    }
    case ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION: {
      const modifyAction = action as ModifyOrShowTransactionNotificationAction;
      const index = notifications.findIndex(({ id }) => id === modifyAction.id);
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: modifyAction.transaction.id,
                isVisible: true,
                autodismiss: modifyAction.autodismiss,
                transaction: modifyAction.transaction,
                status: modifyAction.status,
                type: TRANSACTION,
              },
            } as unknown as Notification,
            ...notifications.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: modifyAction.transaction.id,
          isVisible: true,
          autodismiss: modifyAction.autodismiss,
          transaction: modifyAction.transaction,
          status: modifyAction.status,
          type: TRANSACTION,
        } as unknown as Notification),
      };
    }
    case ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION: {
      const modifySimpleAction = action as ModifyOrShowSimpleNotificationAction;
      const index = notifications.findIndex(
        ({ id }) => id === modifySimpleAction.id,
      );
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: modifySimpleAction.id,
                isVisible: true,
                autodismiss: modifySimpleAction.autodismiss,
                title: modifySimpleAction.title,
                description: modifySimpleAction.description,
                status: modifySimpleAction.status,
                type: SIMPLE,
              },
            } as unknown as Notification,
            ...notifications.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: modifySimpleAction.id,
          isVisible: true,
          autodismiss: modifySimpleAction.autodismiss,
          title: modifySimpleAction.title,
          description: modifySimpleAction.description,
          status: modifySimpleAction.status,
          type: SIMPLE,
        } as unknown as Notification),
      };
    }
    case ACTIONS.REPLACE_NOTIFICATION_BY_ID: {
      const replaceAction = action as ReplaceNotificationByIdAction;
      const index = notifications.findIndex(
        ({ id }) => id === replaceAction.id,
      );
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...notifications.slice(0, index),
          replaceAction.notification,
          ...notifications.slice(index + 1),
        ],
      };
    }
    case ACTIONS.REMOVE_NOTIFICATION_BY_ID: {
      const removeAction = action as RemoveNotificationByIdAction;
      return {
        ...state,
        notifications: notifications.filter(({ id }) => id !== removeAction.id),
      };
    }
    case ACTIONS.REMOVE_CURRENT_NOTIFICATION: {
      return {
        ...state,
        notifications: dequeue(notifications),
      };
    }
    case ACTIONS.SHOW_SIMPLE_NOTIFICATION: {
      const showSimpleAction = action as ShowSimpleNotificationAction;
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: showSimpleAction.id,
          isVisible: true,
          autodismiss: showSimpleAction.autodismiss || 5000,
          title: showSimpleAction.title,
          description: showSimpleAction.description,
          status: showSimpleAction.status,
          type: SIMPLE,
        } as unknown as Notification),
      };
    }
    case ACTIONS.SHOW_TRANSACTION_NOTIFICATION: {
      const showTransactionAction = action as ShowTransactionNotificationAction;
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: showTransactionAction.transaction.id,
          isVisible: true,
          autodismiss: showTransactionAction.autodismiss || 5000,
          transaction: showTransactionAction.transaction,
          status: showTransactionAction.status,
          type: TRANSACTION,
        } as unknown as Notification),
      };
    }
    case ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS: {
      const visibleNotifications =
        notifications?.filter((notification) => notification.isVisible) || [];
      return {
        ...state,
        notifications: visibleNotifications,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
