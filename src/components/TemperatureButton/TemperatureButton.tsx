import React from 'react';

interface TemperatureButtonProps {
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}

const TemperatureButton: React.FC<TemperatureButtonProps> = ({ unit, setUnit }) => {

  const toggleTemperatureUnit = () => {
    if (unit === 'metric') {
      setUnit('imperial')
    } else {
      setUnit('metric')
    }
  };

  return (
    <div>
      <button className="temperature-button" onClick={toggleTemperatureUnit}>
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
    </div>
  );
}

export default TemperatureButton;
