import { ForecastData } from "../../../types/forecast-types/forecast-types";

export const useForecast = (data: ForecastData) => {
  const getDate = () => {
    if (data) {
      
      const copy = [...data?.list];

      const readyList = [];
      const readyDates = [];
      for (const date of copy) {
        const time = date.dt_txt.split(' ');
        const calendarDate = time[0].split('-')
        if (time[1] === '15:00:00') {
          readyDates.push(`${calendarDate[2]}.${calendarDate[1]}`)
          readyList.push(date.main.temp)
        }
      }
     const dataList = readyList.splice(0, 7).map((item) => {
      return Math.round(item);
     });

     return {
      dataList,
      readyDates,
     };
    }

    return {
      dataList: [],
      readyDates: [],
    };
  }

  const forecastLists = getDate();

  const graphdata = {
    labels: forecastLists?.readyDates,
    datasets: [
      {
        data: forecastLists?.dataList,
        tension: 0.6,
        fill: true,
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };
  
  const graphoptions = {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title',
      },
      legend: {
        display: true,
        labels: {
          color: 'red',
        },
      },
    },
    scales: {
      y: {
        min: Math.round(Math.min(...forecastLists?.dataList)),
        max: Math.round(Math.max(...forecastLists?.dataList)),
        display: true,
        grid: {
          display: false,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
  };
  
  const width = {
    width: '100%',
    marginTop: '20px'
  };

  return {
    graphdata,
    graphoptions,
    width,
  }
}