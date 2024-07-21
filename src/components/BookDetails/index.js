import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import BookDetailsBookItem from '../BookDetailsBookItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetailsData()
  }

  onClickTryAgainInBookDetails = () => {
    this.getBookDetailsData()
  }

  getFormattedData = data => ({
    id: data.id,
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPicUrl: data.cover_pic,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
  })

  getBookDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.book_details)

      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookDetailsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetailsFailureView = () => (
    <div className="books-details-failure-view-container">
      <img
        src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720855702/Group_7522failure_h0u2ta.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickTryAgainInBookDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetails} = this.state

    return <BookDetailsBookItem bookDetails={bookDetails} />
  }

  renderBookDetailsViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderBookDetailsLoadingView()
      case apiStatusConstants.success:
        return this.renderBookDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderBookDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">
          <div className="book-details-content">
            {this.renderBookDetailsViews()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default BookDetails
