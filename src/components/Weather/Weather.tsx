import { WeatherData } from '../../types/today-weather-types/today-weather-types';
import sun from '../../icons/sun-color-icon.svg';
import { Forecast } from '../Forecast/Forecast';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useState } from 'react';

export const Weather = ({
  data,
  unit,
}: { data: WeatherData, unit: string }) => {
  const [temperature, setTemperature] = useState(data?.main.temp);
  const [metric, setMetric] = useState(unit);
  const [forcastList, setForecastList] = useState(data.forecastData)
  const { t } = useTranslation();

  const changingTemperature = (value: string) => {
    if ((value === 'C' && unit === 'metric')) {
      setTemperature(data?.main.temp);
      setForecastList(data.forecastData);
      setMetric('metric');
    } else if ((value === 'F' && unit === 'imperial')) {
      setTemperature(data?.main.temp);
      setForecastList(data.forecastData);
      setMetric('imperial');
    } else if (value === 'C' && metric === 'imperial') {
      setTemperature((data?.main.temp - 32) * 5 / 9);
      const list = data.forecastData.list.map((item) => {
        const main = { ...item.main, temp: (item.main.temp - 32) * 5 / 9 }
        return { ...item, main }
      });
      const newForecast = { ...data.forecastData, list }
      setForecastList(newForecast);
      setMetric('metric');
    } else if (value === 'F' && metric === 'metric') {
      setTemperature((data?.main.temp * 9 / 5) + 32);
      const list = data.forecastData.list.map((item) => {
        const main = { ...item.main, temp: (item.main.temp * 9 / 5) + 32 }
        return { ...item, main }
      });
      const newForecast = { ...data.forecastData, list }
      setForecastList(newForecast);
      setMetric('imperial');
    }
  }

  return (
    <>
      <div className={cn("weather", {
        plus: temperature > 0,
        minus: temperature < 0,
      })}>
        <div className="top">
          <div>
            <p className="">{data.name}</p>
            <p className="weather-description">{data?.weather[0].description}</p>
          </div>
          <div className="changing-metric-container">
            <button onClick={() => {
              changingTemperature('C')
            }} className={
              cn('changing-metric', {
                tempSelected: metric === 'metric',
              })
            }>C</button>
            <div className="changing-metric-border">|</div>
            <button onClick={() => {
              changingTemperature('F')
            }} className={
              cn('changing-metric', {
                tempSelected: metric === 'imperial',
              })
            }>F</button>
          </div>
          <img className="weather-icon" src={sun} alt="weather" />
        </div>
        <Forecast data={forcastList} />
        <div className="bottom">
          <div>
            <p className="temperature">{Math.round(temperature) + ' \u00b0'}
            </p>
            <div className='parameter-row'>
              <span className="parameter-label">
                {t('feels like')}
              </span>
              <span className="parameter-value">
                {`${Math.round(data?.main.feels_like)}`}
              </span>
            </div>
          </div>

          <div className="details">
            <div className='parameter-row'>
              <span className="parameter-label">
                {t('wind')}
              </span>
              <span className="parameter-value">
                {Math.round(data?.wind.speed)}
              </span>
            </div>

            <div className='parameter-row'>
              <span className="parameter-label">
                {t('humidity')}
              </span>
              <span className="parameter-value">
                {Math.round(data?.main.humidity)}
              </span>
            </div>

            <div className='parameter-row'>
              <span className="parameter-label">
                {t('pressure')}
              </span>
              <span className="parameter-value">
                {Math.round(data?.main.pressure)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
