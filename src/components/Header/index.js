import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdMenu} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {showMobileMenu: false}

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      showMobileMenu: !prevState.showMobileMenu,
    }))
  }

  closeMobileMenu = () => {
    this.setState({
      showMobileMenu: false,
    })
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showMobileMenu} = this.state
    const {match} = this.props
    const {path} = match
    return (
      <nav className="navbar-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720682248/websitelogo_ffkrqg.png"
                alt="website logo"
              />
            </Link>

            <button
              type="button"
              className="nav-mobile-btn"
              onClick={this.toggleMobileMenu}
            >
              <MdMenu className="nav-mobile-menu-icon" />
            </button>
          </div>
          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720682248/websitelogo_ffkrqg.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    path === '/' ? 'active-nav-link' : ''
                  }`}
                >
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link
                  to="/shelf"
                  className={`nav-link ${
                    path === '/shelf' ? 'active-nav-link' : ''
                  }`}
                >
                  BookShelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
          {showMobileMenu && (
            <div className="nav-menu-mobile">
              <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                  <Link
                    to="/"
                    className={`nav-link ${
                      path === '/' ? 'active-nav-link' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item-mobile">
                  <Link
                    to="/shelf"
                    className={`nav-link ${
                      path === '/shelf' ? 'active-nav-link' : ''
                    }`}
                  >
                    BookShelves
                  </Link>
                </li>
                <button
                  type="button"
                  className="logout-mobile-btn"
                  onClick={this.logout}
                >
                  Logout
                </button>

                <button
                  type="button"
                  className="close-mobile-btn"
                  onClick={this.closeMobileMenu}
                >
                  <AiFillCloseCircle className="close-icon" />
                </button>
              </ul>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
