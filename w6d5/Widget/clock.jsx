import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.incrementTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  incrementTime() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <div className="clock">
        <h1 className="widgetName">Clock</h1>
        <div className="clockData">
          <ul>
            <li>Time:</li>
            <li>{this.state.date.toLocaleTimeString()}</li>
          </ul>
          <ul>
            <li>Date:</li>
            <li>{this.state.date.toDateString()}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Clock;
