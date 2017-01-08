import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  handleChange(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push('/');
    }
  }

  handleClick() {
    this.props.logout();
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    const userAction1 = this.props.pathname;
    let userAction2;

    if (userAction1 === 'login') {
      userAction2 = <Link to='/signup' onClick={this.handleClick}>sign up</Link>;
    } else {
      userAction2 = <Link to='/login' onClick={this.handleClick}>log in</Link>;
    }

    return (
      <div>
        <span>Welcome to BenchBnB</span>
        <br />
        <span>Please {userAction1} or {userAction2} instead</span>

        {this.renderErrors()}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={this.state.username}
            onChange={this.handleChange('username')} />
          <br />
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            value={this.state.password}
            onChange={this.handleChange('password')} />
          <br />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
