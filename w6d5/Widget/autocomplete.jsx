import React from 'react';

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ""};

    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    const input = e.target.value || e.target.textContent;
    this.setState({input});
  }

  render() {
    const re = new RegExp("^" + this.state.input, "i");
    let list = this.props.list.filter((el) => (re.test(el)));
    list = list.map((el, index) => (<li key={index}>{el}</li>));

    return (
      <div className="autocomplete">
        <h1 className="widgetName">Autocomplete</h1>
        <div className="autocompleteData">
          <input
            type="text"
            value={this.state.input}
            onChange={this.updateState}
            placeholder="Search...">
          </input>
          <ul onClick={this.updateState}>
            {list}
          </ul>
        </div>
      </div>
    );
  }
}

export default Autocomplete;
