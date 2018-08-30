import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles_pwforget.css';
import { auth } from '../../firebase';

const PasswordForgetPage = () =>
  <div className='pwForget-wrapper'>
    <h1>Password Reset</h1>
    <div id='success-msg'>Password Reset Link Sent!</div>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        document.getElementById('success-msg').style.display = 'block';
        setTimeout(function(){
          document.getElementById('success-msg').style.display = 'none';
        }, 3000);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <label for='emailResetPw'>RESET PASSWORD USING EMAIL</label>
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          id='emailResetPw'
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          RESET PASSWORD
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <div>
    <Link to="/pw-forget"><p id='pwForget-link'>Forgot Password?</p></Link>
  </div>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
