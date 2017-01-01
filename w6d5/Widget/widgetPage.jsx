import React from "react";
import Clock from "./clock";
import Weather from "./weather";
import Tabs from './tabs';
import Autocomplete from './autocomplete';

const tabData = [
  {title: "One", content: "I am the first tab."},
  {title: "Two", content: "I am the second tab."},
  {title: "Three", content: "I am the third tab."}
];

const names = [
  "Brenda",
  "Isai",
  "Miguel",
  "Scruffy",
  "Aileen",
  "Gary",
  "Natalie",
  "Jose",
  "Margarita"
].sort();

class Widgets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="widgets">
        <Clock />
        <Weather />
        <Tabs tabs={tabData} />
        <Autocomplete list={names} />
      </div>
    );
  }

}

export default Widgets;
