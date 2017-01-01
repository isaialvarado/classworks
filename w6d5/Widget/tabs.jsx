import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {index: 0};

    this.tabHeaders = this.tabHeaders.bind(this);
    this.tabContent = this.tabContent.bind(this);
  }

  onClick(index, e) {
    this.setState({index});
  }

  tabHeaders() {
    const headers = this.props.tabs.map((el, index) => {
      let klass = "";
      if (index === this.state.index) {
        klass = "tabSelected";
      }

      return (
        <li
          key={index}
          className={klass}
          onClick={this.onClick.bind(this, index)}>
          {el.title}
        </li>);
    });

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
