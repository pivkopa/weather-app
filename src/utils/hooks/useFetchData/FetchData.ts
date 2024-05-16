import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store";
import { getCityData, getForecastData } from "../../../Store/Slices/WeatherSlice";

export function FetchedData(city: string, unit: string) {
 const dispatch = useDispatch<AppDispatch>();

  const fetchData = () => {
    dispatch(
      getCityData({
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
}