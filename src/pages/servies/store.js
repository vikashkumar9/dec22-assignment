import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { API } from './api';

const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);

export default store;
