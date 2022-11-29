import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features';
import { shazamCore } from './services';

export const store = configureStore({
  reducer: {
    [shazamCore.reducerPath]: shazamCore.reducer,
    player: playerReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCore.middleware),
});
