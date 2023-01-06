import React, { useEffect } from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { connect, useSelector } from 'react-redux'
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.components";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../category/collection.component";
import { selectFetchLoaded, selectFetchLoading } from "../../redux/shop/shop-selectors";

const CollectionOverviewSpinner = WithSpinner(CollectionOverview);
const CollectionPageSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollectionStart }) => {
  const loading = useSelector(selectFetchLoading);
  const loaded = useSelector(selectFetchLoaded);

  useEffect(() => {
    if (!loaded) fetchCollectionStart();
  }, []);

  return (
  <div className="shop-page">
    <Routes>
      <Route path='' element={<CollectionOverviewSpinner isLoading={loading} />} />
      <Route path=':collectionId' element={<CollectionPageSpinner isLoading={!loaded} />} />
    </Routes>
  </div>
)};      

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);