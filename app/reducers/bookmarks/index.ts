import { BookmarksState, BookmarksAction } from './types';

export * from './types';

const initialState: BookmarksState = [];

const bookmarksReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: BookmarksState = initialState,
  action: BookmarksAction,
): BookmarksState => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.bookmark];
    case 'REMOVE_BOOKMARK':
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};

export default bookmarksReducer;
