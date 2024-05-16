import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { appId, hostName } from "../../config/config";

export interface WeatherRequest {
  city: string;
  unit: string;
}

export interface WeatherData {
  data: any;
  error: string | null;
}

export const getCityData = createAsyncThunk('city', async(obj: WeatherRequest) => {
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

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    // citySearchLoading: false,
    todayWeatherData: null as WeatherData | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCityData.pending, (state) => {
      // state.citySearchLoading = true;
      state.todayWeatherData = null;
    })
    .addCase(getCityData.fulfilled, (state, action) => {
      // state.citySearchLoading = false;
      state.todayWeatherData = action.payload;
    })
  }
  });

  export const ForecastSlice = createSlice({
    name: 'forcast',
    initialState: {
      // citySearchLoading: false,
      forecastData: null as WeatherData | null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getForecastData.pending, (state) => {
        // state.citySearchLoading = true;
        state.forecastData = null;
      })
      .addCase(getForecastData.fulfilled, (state, action) => {
        // state.citySearchLoading = false;
        state.forecastData = action.payload;
      })
    }
    });