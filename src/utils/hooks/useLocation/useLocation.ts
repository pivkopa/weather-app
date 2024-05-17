import axios from "axios";
import { appId, hostName } from "../../../config/config";
import { Position } from "../../../types/today-weather-types/today-weather-types";

interface Props {
  unit: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

export const useLocation = ({
  setCity,
  unit,
}: Props) => {
  async function success(position: Position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const request = await axios.get(`${hostName}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${appId}`);
      const response = await request.data;
      setCity(response.name)
    } catch {
      console.error('Can not get data for user location')
    }
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return {
    success,
    error,
  }
};
