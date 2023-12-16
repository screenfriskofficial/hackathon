import { useEffect, useState } from "react";
import axios from "axios";

export const WeatherPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/weather");
      setData(response.data);
    };
    getWeatherData();
  }, []);

  console.log(data);

  return <div>data</div>;
};
