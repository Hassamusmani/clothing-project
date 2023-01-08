import React, { lazy, useEffect, Suspense } from "react";
import { connect, useSelector } from 'react-redux'
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.components";
import { Route, Routes } from "react-router-dom";
import { selectFetchLoaded, selectFetchLoading } from "../../redux/shop/shop-selectors";
import Spinner from "../../components/spinner/spinner.component";

const CollectionOverview = lazy(() => import("../../components/collection-overview/collection-overview.component"));
const CollectionPage = lazy(() => import("../category/collection.component"));

const CollectionOverviewSpinner = WithSpinner(CollectionOverview);
const CollectionPageSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollectionStart }) => {
  const loading = useSelector(selectFetchLoading);
  const loaded = useSelector(selectFetchLoaded);

  useEffect(() => {
    if (!loaded) fetchCollectionStart();
  }, [loaded, fetchCollectionStart]);

  return (
  <div className="shop-page">
    <Routes>
        <Route path='' element={(
          <Suspense fallback={<Spinner />}><CollectionOverviewSpinner isLoading={loading} /></Suspense>
        )} />
        <Route path=':collectionId' element={(
          <Suspense fallback={<Spinner />}><CollectionPageSpinner isLoading={!loaded} /></Suspense>
        )} />
    </Routes>
  </div>
)};      

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);