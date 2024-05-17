import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store";
import { getWeatherData } from "../../../Store/Slices/WeatherSlice";
import { getForecastData } from "../../../Store/Slices/ForecastSlice";

export function FetchedData(city: string, unit: string) {
 const dispatch = useDispatch<AppDispatch>();

  const fetchData = () => {
    dispatch(
      getWeatherData({
        city,
        unit,
      }))
  }

 const fetchForeCastData = () => {
    dispatch(
      getForecastData({
        city,
        unit,
      }))
  }

  return {
    fetchData,
    fetchForeCastData,
  }
};
