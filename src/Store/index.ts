import { configureStore } from "@reduxjs/toolkit";
import { WeatherSlice } from './Slices/WeatherSlice';
import { ForecastSlice } from "./Slices/ForecastSlice";

const store = configureStore({
  reducer: {
    weather: WeatherSlice.reducer,
    forecast: ForecastSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
