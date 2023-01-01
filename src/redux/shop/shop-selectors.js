import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  shop => shop.shopData
);

export const selectShopDataForPreview = createSelector(
  [selectShopData],
  shopData => Object.values(shopData)
);

export const selectCollection = memoize(collectionId => createSelector(
  [selectShopData],
  shopData => shopData[collectionId]
));