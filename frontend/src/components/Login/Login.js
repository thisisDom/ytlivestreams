import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import googleButton from '../../assets/images/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
import './Login.css';


class Login extends Component {
  constructor(props){
    super(props)
    this.loginResponse = this.loginResponse.bind(this)
  }

  loginResponse(googleUser){
    axios({
      url: '/login',
      method: 'POST',
      data: {
        user: googleUser.getAuthResponse().id_token
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: "json"
    })
    .then(response => {
      this.props.setUser(googleUser);
    })
    .catch(error =>{

    })
  }
  render(){
    return (
      <div className="login-container">
        <div className="login-paper-container">
          <div className="login-paper-title">Must Login with Google Account to Continue</div>
          <GoogleLogin
            className="login-button"
            clientId="921339387377-4d7ia61mucajgl5u2icoetmcbti7rchc.apps.googleusercontent.com"
            buttonText=""
            onSuccess={this.loginResponse}
            discoveryDocs="https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
            scope="https://www.googleapis.com/auth/youtube"
            >
            <img src={googleButton} /><span className="button-text"> Sign In with Google</span>
            </GoogleLogin>
          </div>
      </div>
    )
  }
}

export default Login
