import React from "react";
import "./collections-overview.styles.scss";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectShopDataForPreview } from "../../redux/shop/shop-selectors";

const CollectionOverview = ({ shopData }) => (
  <div className="collections-overview">
    {
      shopData.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  shopData: selectShopDataForPreview
});

export default connect(mapStateToProps)(CollectionOverview);