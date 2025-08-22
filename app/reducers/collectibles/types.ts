export interface CollectibleFavorite {
  tokenId: string;
  address: string;
}

export interface CollectiblesState {
  favorites: Record<string, Record<string, CollectibleFavorite[]>>;
  isNftFetchingProgress: boolean;
}

export interface AddFavoriteCollectibleAction {
  type: 'ADD_FAVORITE_COLLECTIBLE';
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleFavorite;
}

export interface RemoveFavoriteCollectibleAction {
  type: 'REMOVE_FAVORITE_COLLECTIBLE';
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleFavorite;
}

export interface ShowNftFetchingLoaderAction {
  type: 'SHOW_NFT_FETCHING_LOADER';
}

export interface HideNftFetchingLoaderAction {
  type: 'HIDE_NFT_FETCHING_LOADER';
}

export type CollectiblesAction =
  | AddFavoriteCollectibleAction
  | RemoveFavoriteCollectibleAction
  | ShowNftFetchingLoaderAction
  | HideNftFetchingLoaderAction;
