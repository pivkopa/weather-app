import { useEffect, useState } from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { RootState } from './Store';
import { Weather } from './components/Weather/Weather';
import { WeatherData } from './types/today-weather-types/today-weather-types';
import { useLocalStorage } from './utils/hooks/useLocalStorage/useLocalStorage';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import TemperatureButton from './components/TemperatureButton/TemperatureButton';
import CitySelector from './components/CitySelector/CitySelector';
import { FetchedData } from './utils/hooks/useFetchData/FetchData';
import { useLocation } from './utils/hooks/useLocation/useLocation';

const App = () => {
  const { todayWeatherData } = useSelector((state: RootState) => state.weather);
  const { forecastData } = useSelector((state: RootState) => state.forecast);

  const [weatherListStore, setWeatherListStore] = useLocalStorage('weatherList', []);

  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);

  const { fetchData, fetchForeCastData } = FetchedData(city, unit);
  const { success, error } = useLocation({ setCity, unit })

  useEffect(() => {
    fetchData()
    fetchForeCastData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city])

  useEffect(() => {
    if (weatherListStore.length && weatherList.length < 1) {
      setWeatherList(weatherListStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  navigator.geolocation.getCurrentPosition(success, error);

  const checkForHaving = () => {
    const check = weatherList.some((item) => {
      return item.name === todayWeatherData?.data.name;
    })

    return !check;
  }

  useEffect(() => {
    savingData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayWeatherData?.data, forecastData?.data])

  const savingData = () => {
    if (todayWeatherData?.data && forecastData?.data) {
      if (checkForHaving()) {
        setWeatherList(currentWeatherList => {
          const allWeather = {
            ...todayWeatherData?.data,
            forecastData: forecastData?.data
          }
          const newList = [...currentWeatherList, allWeather];
          setWeatherListStore(newList);
          return newList;
        });
      }
    }
  }

  return (
    <div>
      <div className="top-container">
        <LanguageSelector />
        <TemperatureButton unit={unit} setUnit={setUnit} />
        <CitySelector setCity={setCity} />
      </div>
      <div className="weather-grid">
        {weatherList.length &&
          weatherList.map((item, index) => (
            <div key={index} className="weather-grid-item">
              <Weather data={item} unit={unit} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
