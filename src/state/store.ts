import { configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "./repositoriesSlice.ts";
import { useDispatch } from "react-redux";

// Создает хранилище с редуктором для управления состоянием репозиториев
export const store = configureStore({
  reducer: {
    // Редуктор для управления состоянием репозиториев
    repositories: repositoriesReducer,
  },
});

// Тип для состояния хранилища Redux
export type RootState = ReturnType<typeof store.getState>;

// Тип для диспетчера действий Redux
export type AppDispatch = typeof store.dispatch;

// Хук для получения диспетчера действий с типом `AppDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();
