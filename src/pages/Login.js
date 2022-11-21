import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginSuccess, fetchApi } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    emailValid: false,
    passwordValid: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = this.state;
    const minLength = 5;
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);

    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        passwordValid: password.length >= minLength,
        emailValid: validEmail,
      });
    });
  };

  render() {
    const { emailValid, passwordValid, email, password } = this.state;
    const { dispatch } = this.props;
    const validation = emailValid && passwordValid;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ !validation }
              onClick={ () => dispatch(loginSuccess(email, password)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
