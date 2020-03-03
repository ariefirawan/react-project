import {userActionTypes} from './user.types'

export const setCurrentUser = users => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: users
});