import { configureStore } from '@reduxjs/toolkit';

// redux
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { combineReducers } from 'redux';
import authSlice from './slices/auth';
import agronomicData from './slices/agronomicData';
import weatherForecast from './slices/weatherForecast';
import autoDiagSlice from './slices/autoDiag';
import settings from './slices/settings';
import seasonalForecast from './slices/seasonalForecast';
import farmSlice from './slices/farms';
import recordsSlice from './slices/records';
import evotranspiracionSlice from './slices/evotranspiracion';
import huellaCarbonoSlice from './slices/huellaCarbono';
import huellasCarbonoCooperativaSlice from './slices/huellasCarbonoCooperativa';
import evotranspiracionCooperativaSlice from './slices/evotranspiracionCooperativa';
import farmsCooperativaSlice from './slices/farmsCooperativa';
import membersCooperativaSlice from './slices/membersCooperativa';
import invitesCooperativaSlice from './slices/invitesCooperativa';
import requestsUserSlice from './slices/requestsUser';
import invitesUserSlice from './slices/invitesUser';
import requestsCooperativaSlice from './slices/requestsCooperativa';
import organizationsUserSlice from './slices/organizationsUser';
import systemUsersSlice from './slices/systemUsers';
import countriesAdminSlice from './slices/countriesAdmin';

// redux persist https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createMigrate from 'redux-persist/es/createMigrate';

// Configuraciones de persistencia
const localStorageConfig = {
  key: 'root',
  storage: storage,
  version: import.meta.env.VITE_YVY_LOCALSTORAGE_VERSION,
  blacklist: [],
  migrate: createMigrate({
    [import.meta.env.VITE_YVY_LOCALSTORAGE_VERSION]: state => {
      return undefined;
    },
  }),
};

// const sessionStorageConfig = {
//   key: 'session',
//   storage: sessionStorage,
//   version: 1,
//   blacklist: ['seasonalForecast'],
// };

export const rootReducer = combineReducers({
  authSlice,
  agronomicData,
  autoDiagSlice,
  settings,
  weatherForecast,
  seasonalForecast,
  farmSlice,
  farmsCooperativaSlice,
  evotranspiracionSlice,
  evotranspiracionCooperativaSlice,
  recordsSlice,
  huellaCarbonoSlice,
  huellasCarbonoCooperativaSlice,
  membersCooperativaSlice,
  invitesCooperativaSlice,
  requestsUserSlice,
  invitesUserSlice,
  requestsCooperativaSlice,
  organizationsUserSlice,
  systemUsersSlice,
  countriesAdminSlice
});

const store = configureStore({
  reducer: persistReducer(localStorageConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['authSlice.user.profilePicture', 'authSlice.user.updateProfilePicture', 'authSlice.updateProfilePicture'],
      },
      immutableCheck: { warnAfter: 300 },
    }),
});

const persistor = persistStore(store);
const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
