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
          <div>
            <p>Time:</p>
            <p>{this.state.date.toLocaleTimeString()}</p>
          </div>
          <div>
            <p>Date:</p>
            <p>{this.state.date.toDateString()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
