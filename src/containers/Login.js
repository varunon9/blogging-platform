import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Login.css';
import { loginUser } from '../actions/ApiClient';

class Login extends React.Component {
  state = {
    loginData: {
      username: '',
      password: ''
    },
    errorMessage: ''
  };

  onInputChange = key => {
    return e => {
      const value = e.target.value;
      const loginDataCopy = Object.assign({}, this.state.loginData);
      loginDataCopy[key] = value;
      this.setState({
        loginData: loginDataCopy
      })
    }
  }

  onLoginClick = () => {
    loginUser(this.state.loginData)
      .then(response => {
        if (response.error) {
          this.setState({
            errorMessage: response.error.message
          });
        } else {
          // login was successful, get user details now
          const loginSuccessData = response;
          // todo
        }
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
      });
  }

  render() {
    const state = this.state;
    return (
      <>
        <div className="container">
          <div id="login">
            <div id="form">
              <h2 className="center">Please Login</h2>
              <p>
                Username: 
                <input 
                  type="text" 
                  onChange={this.onInputChange('username')} 
                  value={state.loginData.username}
                />
              </p>
              <p>
                Password: 
                <input 
                  type="password" 
                  onChange={this.onInputChange('password')} 
                  value={state.loginData.password}
                />
              </p>
              <p className="center">
                <button onClick={this.onLoginClick}>Login</button>
              </p>
              {
                state.errorMessage && <p className="error">{state.errorMessage}</p>
              }
              <p>
                Don't have an account?&nbsp;
                <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;