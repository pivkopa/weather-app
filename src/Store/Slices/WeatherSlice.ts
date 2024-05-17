import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { appId, hostName } from "../../config/config";
import { WeatherData, WeatherRequest } from "../../types/today-weather-types/today-weather-types";

export const getWeatherData = createAsyncThunk('city', async(obj: WeatherRequest) => {
  try{
    const request = await axios.get(`${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&appid=${appId}`);    
    const response = await request.data;
    return {
      data: response,
      error: null,
    } as WeatherData;
  }
  catch(error){
    const axiosError = error as AxiosError;
    return {
      data: null,
      error: axiosError.message
    } as WeatherData;
  }
});



export const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    todayWeatherData: null as WeatherData | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherData.pending, (state) => {
      state.todayWeatherData = null;
    })
    .addCase(getWeatherData.fulfilled, (state, action) => {
      state.todayWeatherData = action.payload;
    })
  }
  });


