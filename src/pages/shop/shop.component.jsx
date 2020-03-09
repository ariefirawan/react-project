import React from 'react';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';

import './shop.styles.scss';

const ShopPage = ({ collections }) => (
  <div className="shop-page">
    <CollectionOverview />
  </div>
);

export default ShopPage;
