import React, { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import HeavyRainfall from '../../data/HeavyRainfall.jpg'
import ClearSky from '../../data/ClearSky.jpg'
import littleRainfall from "../../data/littleRainfall.jpg";
import Flooding from "../../data/Flooding.jpg";
import { InformationCircleIcon  } from "@heroicons/react/24/outline";

export function Notifications() {
  const [responseObj, setResponseObj] = useState(null);
  const [location, setLocation] = useState(null);
  const [WeatherInfo, setWeatherInfo] = useState(null);
  const [formData , setFormData] = useState({
    "precip": 0.5,
    "temp_max": 25.0,
    "temp_min": 15.0,
    "month_day_max": 0.8,
    "max_min": 1.5,
    "monthly_avg": 20.0,
    "day_of_year_avg": 18.0
  })
  function kelvinToCelsius(kelvin) {
      return Math.floor(+kelvin - 273.15);
  }
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];
  const ApiKey = '3973bd6f08e8d3d2804cfa9f4c4eb70f';
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${ApiKey}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('weather data:', data);
      setFormData({...formData , temp_max : kelvinToCelsius(data.main.temp_min) , temp_min : kelvinToCelsius(data.main.temp_max) , max_min : kelvinToCelsius(data.main.temp_min) /2 + kelvinToCelsius(data.main.temp_max)/2 })
      setWeatherInfo(data)
    } catch (error) {
      console.error('Error fetching Weather data:', error?.message);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          // Handle the received location data
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // console.log(location)
        },
        (error) => {
          // Handle errors (e.g., user denied location access)
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  const handleFetchPost = async () =>{
    fetchData();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data received:', data);
      if (data.precip>5) {
        setResponseObj({
          content : " Light rain or drizzle. Generally, this is a small amount of precipitation that may be more of a nuisance than a significant weather event.",
          img : ClearSky
        })
      } else if (data.precip < 25) {
        setResponseObj({
          content : "Moderate rain. May lead to localized flooding, especially in areas with poor drainage.",
          img : littleRainfall
        })
      }else if (data.precip < 40) {
        setResponseObj({
          content : "Intense, heavy rain. Can lead to significant flooding, flash floods, and potential hazards, especially in areas with inadequate drainage systems.",
          img : HeavyRainfall
        })
      }else{
        setResponseObj({
          content : "This amount of precipitation can lead to significant flooding, especially in low-lying areas or regions with inadequate drainage systems. Flash floods and river flooding are possible.",
          img : Flooding
        })
      }
      // conversation[conversation.length] = { id : 2 , msg : data.result}
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <div className="flex justify-center">
        <div className="text-center">
          
          {responseObj ? 
            (<div>
              <h3 className="text-lg font-semibold mt-4">Response:</h3>
              <p className="text-gray-700 mb-4">{responseObj.content}</p>
              <div className="max-w-sm mx-auto">
                <img
                  src={responseObj.img}
                  alt="Response Image"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>) :
            (<div onClick={handleFetchPost} className="bg-blue-gray-600 p-3 text-white ">
            Fetch Live Weather Details
          </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Notifications;
