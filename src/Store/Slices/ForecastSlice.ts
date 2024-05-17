import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherData, WeatherRequest } from "../../types/today-weather-types/today-weather-types";
import axios, { AxiosError } from "axios";
import { appId, hostName } from "../../config/config";

export const ForecastSlice = createSlice({
  name: 'forcast',
  initialState: {
    forecastData: null as WeatherData | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForecastData.pending, (state) => {
      state.forecastData = null;
    })
    .addCase(getForecastData.fulfilled, (state, action) => {
      state.forecastData = action.payload;
    })
  }
  });

  export const getForecastData = createAsyncThunk('forecast', async(obj: WeatherRequest) => {
    try{
      const request = await axios.get(`${hostName}/data/2.5/forecast?q=${obj.city}&units=${obj.unit}&appid=${appId}`);
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
  })
