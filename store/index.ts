import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dashboardReducer from './dashboardSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Redux Persist 설정
const persistConfig = {
  key: 'root',       // 저장소에 저장될 키
  storage,           // localStorage 사용
};

// Reducer에 persist 적용
// persist란 앱을 새로고침해도 데이터가 유지되도록 하는 기능
const authPersistedReducer = persistReducer(persistConfig, authReducer);
const dashboardPersistedReducer = persistReducer(persistConfig, dashboardReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,  // Persisted Reducer 사용
		dashboard: dashboardPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor 생성
export const persistor = persistStore(store);

// RootState 및 AppDispatch 타입
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
