import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedBooksListData()
  }

  getTopRatedBooksListData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const Url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPicUrl: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTopRatedBooksLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopRatedBooksSuccessView = () => {
    const {topRatedBooksList} = this.state

    return (
      <div className="top-rated-books-content">
        <TopRatedBooks booksData={topRatedBooksList} />
      </div>
    )
  }

  renderTopRatedBooksFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720855702/Group_7522failure_h0u2ta.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.getTopRatedBooksListData}
      >
        Try Again
      </button>
    </div>
  )

  renderTopRatedBooksContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderTopRatedBooksLoaderView()
      case apiStatusConstants.success:
        return this.renderTopRatedBooksSuccessView()
      case apiStatusConstants.failure:
        return this.renderTopRatedBooksFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <div className="home-header-container">
              <h1 className="home-heading">Find Your Next Favorite Books?</h1>
              <p className="home-description">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/shelf" className="find-books-mobile-link-item">
                <button type="button" className="find-books-mobile-button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="top-rated-books-container">
              <div className="top-rated-header-container">
                <h1 className="top-rated-books-heading">Top Rated Books</h1>
                <Link to="/shelf" className="find-books-desktop-link-item">
                  <button type="button" className="find-books-desktop-button">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderTopRatedBooksContent()}
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default Home
