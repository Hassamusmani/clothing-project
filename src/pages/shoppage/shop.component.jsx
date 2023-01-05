import React, { useEffect, useState } from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { convertSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { connect } from 'react-redux'
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.components";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../category/collection.component";

const CollectionOverviewSpinner = WithSpinner(CollectionOverview);
const CollectionPageSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ updateCollections }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async snapShot => {
      const collectionMap = convertSnapshotToMap(snapShot);
      updateCollections(collectionMap);
      setLoading(false);
    })
  }, []);

  return (
  <div className="shop-page">
    <Routes>
      <Route path='' element={<CollectionOverviewSpinner isLoading={loading} />} />
      <Route path=':collectionId' element={<CollectionPageSpinner isLoading={loading} />} />
    </Routes>
  </div>
)};      

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);