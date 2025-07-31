interface BookmarkState {
  url: string;
  name?: string;
}

interface AddBookmarkAction {
  type: 'ADD_BOOKMARK';
  bookmark: BookmarkState;
}

interface RemoveBookmarkAction {
  type: 'REMOVE_BOOKMARK';
  bookmark: BookmarkState;
}

type BookmarkAction = AddBookmarkAction | RemoveBookmarkAction;

const bookmarksReducer = (state: BookmarkState[] = [], action: BookmarkAction): BookmarkState[] => {
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
export type { BookmarkState, BookmarkAction };
