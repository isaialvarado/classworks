import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {index: 0};

    this.tabHeaders = this.tabHeaders.bind(this);
    this.tabContent = this.tabContent.bind(this);
  }

  componentDidMount() {
    const firstTab = document.querySelector(".tabHeaders li");
    firstTab.classList.add("tabSelected");
  }

  onClick(index, e) {
    const lastTab = document.querySelector(".tabSelected");
    lastTab && lastTab.classList.remove("tabSelected");
    e.currentTarget.classList.add("tabSelected");
    this.setState({index});
  }

  tabHeaders() {
    const headers = this.props.tabs.map((el, index) => (
      <li key={index} onClick={this.onClick.bind(this, index)}>
        <p>{el.title}</p>
      </li>
    ));

    return (
      <ul className="tabHeaders">
        {headers}
      </ul>
    );
  }

  tabContent() {
    const tabs = this.props.tabs;

    return (
      <section className="tabContent">
        <article>{tabs[this.state.index]["content"]}</article>
      </section>
    );
  }

  render() {

    return (
      <div className="tabs">
        <h1 className="widgetName">Tabs</h1>
        <this.tabHeaders />
        <this.tabContent />
      </div>
    );
  }
}

export default Tabs;
