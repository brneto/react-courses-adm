import { startSubmit, stopSubmit } from 'redux-form/immutable';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { authorApi } from '../../api';
import {
  loadAuthorsRequest,
  loadAuthorsSuccess,

  saveAuthorRequest,
  createAuthorSuccess,
  updateAuthorSuccess,

  deleteAuthorRequest,
  deleteAuthorSuccess
} from '../actions/authorActions';
import { saveAuthorWarn, deleteAuthorWarn } from '../thunks/authorThunks';

export function* watchAuthors() {
  yield all([
    takeEvery(loadAuthorsRequest, workLoadAuthors),
    takeEvery(saveAuthorRequest, workSaveAuthor),
    takeEvery(deleteAuthorRequest, workDeleteAuthor),
  ]);
}

function* workLoadAuthors() {
  try {
    const authors = yield call(authorApi.getAllAuthors);
    yield put(loadAuthorsSuccess(authors));
  } catch(e) {
    throw(e);
  }
}

function* workSaveAuthor(action) {
  const author = action.payload;
  const form = action.meta;

  yield put(startSubmit(form));
  try {
    const savedAuthor = yield call(authorApi.saveAuthor, author);
    yield author.id ?
      put(updateAuthorSuccess(savedAuthor)) :
      put(createAuthorSuccess(savedAuthor));
    yield put(saveAuthorWarn());
  } catch(e) {
    throw(e);
  } finally {
    yield put(stopSubmit(form));
  }
}

function* workDeleteAuthor(action) {
  const author = action.payload;

  try {
    const deletedAuthor = yield call(authorApi.deleteAuthor, author);
    yield put(deleteAuthorSuccess(deletedAuthor));
    yield put(deleteAuthorWarn());
  } catch(e) {
    throw(e);
  }
}
