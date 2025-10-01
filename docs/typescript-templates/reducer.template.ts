/**
 * State interface for the module
 */
export interface ModuleState {
  loading: boolean;
  data: DataType | null;
  error: string | null;
}

/**
 * Action types enum
 */
export enum ModuleActionType {
  SET_LOADING = 'MODULE/SET_LOADING',
  SET_DATA = 'MODULE/SET_DATA',
  SET_ERROR = 'MODULE/SET_ERROR',
  RESET = 'MODULE/RESET',
}

/**
 * Action creators and their payload types
 */
export type ModuleAction =
  | { type: ModuleActionType.SET_LOADING; payload: boolean }
  | { type: ModuleActionType.SET_DATA; payload: DataType }
  | { type: ModuleActionType.SET_ERROR; payload: string }
  | { type: ModuleActionType.RESET };

/**
 * Initial state
 */
export const initialState: ModuleState = {
  loading: false,
  data: null,
  error: null,
};

/**
 * Reducer function
 */
const moduleReducer = (
  state: ModuleState = initialState,
  action: ModuleAction,
): ModuleState => {
  switch (action.type) {
    case ModuleActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ModuleActionType.SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case ModuleActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ModuleActionType.RESET:
      return initialState;
    default:
      return state;
  }
};

export default moduleReducer;

/**
 * Selectors
 */
import { RootState } from '../index';

export const selectModuleData = (state: RootState): DataType | null =>
  state.module.data;

export const selectModuleLoading = (state: RootState): boolean =>
  state.module.loading;

export const selectModuleError = (state: RootState): string | null =>
  state.module.error;
