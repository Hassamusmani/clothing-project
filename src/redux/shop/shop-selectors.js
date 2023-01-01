import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  shop => shop.shopData
)

export const selectShopDataForPreview = createSelector(
  [selectShopData],
  shopData => Object.values(shopData)
)

export const selectCollection = collectionId => createSelector(
  [selectShopData],
  shopData => shopData[collectionId]
)