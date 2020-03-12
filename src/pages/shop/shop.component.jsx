import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';
import { updateCollection as updateCollectionAct } from '../../redux/shop/shop.actions';

import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';

import './shop.styles.scss';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections');
    
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      console.log(collectionsMap)
      updateCollection(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollection: collectionsMap =>
    dispatch(updateCollectionAct(collectionsMap))
});
export default connect(null, mapDispatchToProps)(ShopPage);
