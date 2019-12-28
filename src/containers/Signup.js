import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Signup.css';
import { registerUser } from '../actions/ApiClient';
import { navigateToScreen } from '../App';

class Signup extends React.Component {
  state = {
    signupData: {
      name: '',
      email: '',
      username: '',
      password: ''
    },
    errorMessage: ''
  };

  onInputChange = key => {
    return e => {
      const value = e.target.value;
      const signupDataCopy = Object.assign({}, this.state.signupData);
      signupDataCopy[key] = value;
      this.setState({
        signupData: signupDataCopy
      })
    }
  }

  onSignupClick = () => {
    registerUser(this.state.signupData)
      .then(response => {
        if (response.error) {
          this.setState({
            errorMessage: response.error.message
          });
        } else {
          navigateToScreen('/login');
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
          <div id="signup">
            <div id="form">
              <h2 className="center">Please Signup</h2>
              <p>
                Name: 
                <input 
                  type="text" 
                  onChange={this.onInputChange('name')} 
                  value={state.signupData.name}
                />
              </p>
              <p>
                Email: 
                <input 
                  type="email" 
                  onChange={this.onInputChange('email')} 
                  value={state.signupData.email}
                />
              </p>
              <p>
                Username: 
                <input 
                  type="text" 
                  onChange={this.onInputChange('username')} 
                  value={state.signupData.username}
                />
              </p>
              <p>
                Password: 
                <input 
                  type="password" 
                  onChange={this.onInputChange('password')} 
                  value={state.signupData.password}
                />
              </p>
              <p className="center">
                <button onClick={this.onSignupClick}>Signup</button>
              </p>
              {
                state.errorMessage && <p className="error">{state.errorMessage}</p>
              }
              <p>
                Already have an account?&nbsp;
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;