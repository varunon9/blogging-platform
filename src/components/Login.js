import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import '../css/Login.css';
import { loginUser, getUser } from '../actions/ApiClient';
import customLocalStorage from '../utils/customLocalStorage';
import { navigateToScreen } from '../App';

/*class Login extends React.Component {
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
      });
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
          const loginData = response;
          getUser(loginData)
            .then(response => {
              const user = { ...response.data, loginData };

              // save data to localstorage to persist it
              customLocalStorage.setItem('user', user);

              navigateToScreen('/articles');
            })
            .catch(error => {
              this.setState({
                errorMessage: error.message
              });
            });

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

export default Login;*/

const Login = function(props) {

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = key => {
    return e => {
      const value = e.target.value;
      const loginDataCopy = Object.assign({}, loginData);
      loginDataCopy[key] = value;
      setLoginData(loginDataCopy);
    }
  }

  const onLoginClick = () => {
    loginUser(loginData)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error.message);
        } else {
          // login was successful, get user details now
          const loginData = response;
          getUser(loginData)
            .then(response => {
              const user = { ...response.data, loginData };

              // save data to localstorage to persist it
              customLocalStorage.setItem('user', user);

              navigateToScreen('/articles');
            })
            .catch(error => {
              setErrorMessage(error.message);
            });

        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }

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
                onChange={onInputChange('username')} 
                value={loginData.username}
              />
            </p>
            <p>
              Password: 
              <input 
                type="password" 
                onChange={onInputChange('password')} 
                value={loginData.password}
              />
            </p>
            <p className="center">
              <button onClick={onLoginClick}>Login</button>
            </p>
            {
              errorMessage && <p className="error">{errorMessage}</p>
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
};

export default Login;