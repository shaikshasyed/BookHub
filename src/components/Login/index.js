import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720675738/Rectangle_1467loginPageImage_lc3jab.png"
            alt="website login"
            className="login-page-image"
          />
        </div>
        <form className="form-container" onSubmit={this.onClickLogin}>
          <img
            src="https://res.cloudinary.com/dgonqoet4/image/upload/v1686887647/bookhublogo_upkhlx.png"
            alt="login website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label htmlFor="userName" className="input-label">
              Username*
            </label>
            <input
              id="userName"
              className="input-element"
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="input-container">
            <label htmlFor="passWord" className="input-label">
              Password*
            </label>
            <input
              id="passWord"
              className="input-element"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
