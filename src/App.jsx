import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoSearchCircleSharp } from "react-icons/io5"; //Search icon

import { TbDropletCheck } from "react-icons/tb"; //For humidity
import { FaWind } from "react-icons/fa6"; //Foe Wind Speed

import { IoRainy } from "react-icons/io5"; //Rain
import { IoIosPartlySunny } from "react-icons/io"; //Sunny
// import { BsCloudDrizzleFill } from "react-icons/bs"; //Drizzle
// import { IoIosThunderstorm } from "react-icons/io"; //Thunder
// import { WiCloudyGusts } from "react-icons/wi"; //Windy
import { RiFoggyLine } from "react-icons/ri"; //Mist
{
  /* <BsCloudDrizzleFill /><IoIosThunderstorm /><WiCloudyGusts /> */
}

function App() {
  const [data, setData] = useState("Chennai");
  const [apiData, setApiData] = useState(null);
  const store = (event) => {
    setData(event.target.value);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=b414187c04f94736926c1bfc88c37cf2`
    )
      .then((item) => item.json())
      .then((value) => setApiData(value));
  };
  console.log(apiData);

  return (
    <>
      <div className="container">
        <div className="card">
          <h1>Weather Card</h1>

          <div className="search">
            <input
              onChange={store}
              className="input"
              type="text"
              placeholder="Enter your city"
            />
            <h1 className="sicon" onClick={getApiData}>
              <IoSearchCircleSharp />
            </h1>
          </div>

          <h2 className="city-name">{apiData && apiData.name}</h2>

          <h1 className="weather-condition">
            {apiData &&
              (apiData.weather[0].main == "Rain" ? (
                <IoRainy />
              ) : apiData && apiData.weather[0].main == "Smoke" ? (
                <RiFoggyLine />
              ) : (
                <IoIosPartlySunny />
              ))}
            &nbsp;
            <span className="weather-name">
              {apiData && apiData.weather[0].main}
            </span>
          </h1>

          <div className="percentage">
            <div className="humi">
              <h4>Humidity</h4>
              <p>
                <TbDropletCheck /> {apiData && apiData.main.humidity}%{" "}
              </p>
            </div>

            <div className="speed">
              <h4>Wind Speed</h4>
              <p>
                <FaWind /> {apiData && apiData.wind.speed}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
