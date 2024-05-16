/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { debounce } from 'lodash';
import { MyObject } from '../../types/today-weather-types/today-weather-types';
import { fetchCities } from '../../CitiesData/CitiesData';

interface CitySelectorProps {
  setCity: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ setCity }) => {
  const [query, setQuery] = useState('');
  const [list, setList] = useState<MyObject[]>([]);

  useEffect(() => {
    fetchCities(query)
      .then((data) => {
        const options = data?.map((object: MyObject) => {
          return {
            value: `${object.city}`,
            label: `${object.name} ${object.country}`
          }
        });
        setList(options);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const debouncedGetCity = debounce((value: string) => {
    setQuery(value);
  }, 600);

  return (
    <div className="container">
      <Select
        className="city-input"
        options={list}
        onInputChange={debouncedGetCity}
        onChange={(e) => setCity(e?.value as string)}
      />
    </div>
  );
}

export default CitySelector;
