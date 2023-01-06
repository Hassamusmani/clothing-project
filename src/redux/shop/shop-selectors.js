import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  shop => shop.shopData
);

export const selectFetchLoading = createSelector(
  [selectShop],
  shop => shop.fetchLoading
);

export const selectFetchLoaded = createSelector(
  [selectShop],
  shop => shop.fetchLoaded
);

export const selectShopDataForPreview = createSelector(
  [selectShopData],
  shopData => shopData ? Object.values(shopData) : []
);

export const selectCollection = memoize(collectionId => createSelector(
  [selectShopData],
  shopData => shopData ? shopData[collectionId] : null
));

