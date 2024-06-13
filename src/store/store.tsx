import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {authReducer} from "../reducers/authReducer"
import {game} from "../reducers/game";
import {isModalOpen} from "../reducers/isModalOpen";
import {rooms} from "../reducers/rooms";
import {roomsApi} from "../serviceApi/roomsApi";
import {ruleApi} from "../serviceApi/ruleApi";
import {questionsApi} from "../serviceApi/questionApi";
import { authApi } from "../authApi";
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
  i18nReducer,
  I18n
} from "react-redux-i18n";
import translationsObject from "../localization/translationsObject"


const initialState = {
  isModalOpen: false
}

export const store = configureStore({
  reducer: {
    authReducer: authReducer.reducer,
    game: game.reducer,
    isModalOpen: isModalOpen.reducer,
    rooms: rooms.reducer,
    i18n: i18nReducer,
    [authApi.reducerPath]: authApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [ruleApi.reducerPath]: ruleApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    // [I18n.reducerPath]: i18nReducer
},
devTools: true,
middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(roomsApi.middleware)
    .concat(ruleApi.middleware)
    .concat(questionsApi.middleware)
});
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale("en"));
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>