import React, { useState } from 'react';
import './App.css';

const api = {
  key:"cd5f5eecd5076077a27f629236cf3953",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const dateBuilder = (d) => {
    return d.toDateString();
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  
  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }


  const getClassName = () => {
    let theme = 'app-cool';
    if(typeof weather.main != "undefined"){
      if(weather.main.temp>25)
        theme = 'app-warm';
      else
        theme = 'app-cool';
    }
    
    return theme;
  }

  const getOverlay = () => {
    if(typeof weather.weather != "undefined"){
      return weather.weather[0].main.toLowerCase();
    } 
    return '';
  }

  return (
    <div className={getClassName()}>
      <main className={getOverlay()}>
        <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
              >
            </input>  
        </div>
        {(typeof weather.main != "undefined")? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
