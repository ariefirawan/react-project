import { takeEvery } from 'redux-saga/effects';

import shopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
  yield console.log('i am fired');
}

export function* fetchCollectionsStart() {
  yield takeEvery(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
}