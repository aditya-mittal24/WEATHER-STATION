import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import Card from "./Card";

function Main() {
  const [text, setText] = useState("");
  const [weather, setWeather] = useState({
    city: null,
    temp: "",
    desc: "",
    imgurl: "",
  });
  const [daysWeather, setDaysWeather] = useState([]);
  function createCard(day) {
    return <Card
      date={day.date}
      temp={day.temp}
      desc={day.desc}
      imgurl={day.imgurl}
    />;
  }
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = (event) => {
    const query = text;
    const apiKey = "91cf67ced9b79e737a993d8782ff4016";
    const unit = "metric";

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      apiKey +
      "&units=" +
      unit;
    const url2 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      query +
      "&appid=" +
      apiKey +
      "&units=" +
      unit;
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        let weatherData2 = [
          response2.data.list[7],
          response2.data.list[15],
          response2.data.list[23],
          response2.data.list[31],
          response2.data.list[39],
        ];
        weatherData2 = weatherData2.map((day) => {
          return {
            date: format(new Date(day.dt * 1000), "dd/mm"),
            temp: day.main.temp,
            desc: day.weather[0].description,
            imgurl:
              "http://openweathermap.org/img/wn/" +
              day.weather[0].icon +
              "@2x.png",
          };
        });
        const weatherData = response.data;
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        setWeather({
          city: weatherData.name,
          temp: temp,
          desc: weatherDescription,
          imgurl: iconUrl,
        });
        setDaysWeather(weatherData2);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    event.preventDefault();
  };
  return (
    <div className="flex flex-col pt-32 justify-start h-screen w-full items-center">
      <form
        autoComplete="off"
        className="navbar relative rounded-[30px] w-[50%] pl-10 bg-gradient-to-br from-[rgba(255, 255, 255, 0.266)] to-[rgba(255, 255, 255, 0.36)]"
        action="submit"
        onSubmit={handleSubmit}
      >
        <FaSearch size={20} className="absolute text-white top-5 left-4" />
        <input
          type="text"
          name="city"
          onChange={handleChange}
          className="p-4 py-5 w-full rounded-[30px] bg-transparent"
          placeholder="City Name"
          value={text}
        />
      </form>
      {weather.city && (
        <div>
          <div className="glass-card flex flex-col items-center py-8 px-24 my-6">
            <h1 className="text-3xl my-2 font-semibold">{weather.city}</h1>
            <p className="text-2xl">Today</p>
            <div className="flex items-center justify-around">
              <img src={weather.imgurl} className="w-[120px] mx-auto" alt="" />
              <p className="text-3xl">{weather.temp}°C</p>
            </div>
            <p className="text-2xl capitalize">{weather.desc}</p>
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
          {daysWeather.map(createCard)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
