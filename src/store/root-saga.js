import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.saga';

// generator function
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}