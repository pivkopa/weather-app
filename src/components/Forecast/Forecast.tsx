import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { ForecastData } from '../../types/forecast-types/forecast-types';
import { useForecast } from '../../utils/hooks/useForecast/useForecast';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

export const Forecast = ({
  data,
}: { data: ForecastData }) => {

  const {
    graphdata,
    graphoptions,
    width, } = useForecast(data)


  return (
    <div style={width}>
      {data && (
        <Line
          data={graphdata}
          options={graphoptions}
        />
      )}
    </div>
  )
}