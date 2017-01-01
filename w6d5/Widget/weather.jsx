import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {city: "loading weather...", temperature: ""};

    this.setWeather = this.setWeather.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    });
  }

  getWeather(latitude, longitude) {
    const request = new XMLHttpRequest();
    request.onload = this.setWeather;

    request.open(
      "GET",
      `http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${latitude}&lon=${longitude}&APPID=0`
    );

    request.send();
  }

  setWeather(e) {
    const weather = JSON.parse(e.currentTarget.responseText);
    const city = weather.name;
    const temperature = weather.main.temp + " °F";
    this.setState({city, temperature});
  }

  render() {
    return (
      <div className="weather">
        <h1 className="widgetName">Weather</h1>
        <div className="weatherData">
          <p>{this.state.city}</p>
          <p>{this.state.temperature}</p>
        </div>
      </div>
    );
  }
}

export default Weather;
