import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import BookShelvesTabs from '../BookShelvesTabs'
import BookShelvesBook from '../BookShelvesBook'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    searchInput: '',
    bookShelvesBooksList: [],
    activeTabValue: bookshelvesList[0].value,
    activeTabLabel: bookshelvesList[0].label,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookShelvesData()
  }

  tabChange = value => {
    this.setState({
      activeTabValue: value,
    })

    const {bookShelvesBooksList} = this.state
    const filteredData = bookShelvesBooksList.filter(
      each =>
        value.replace('_', ' ').toLowerCase() === each.readStatus.toLowerCase(),
    )
    this.setState(
      {
        bookShelvesBooksList: filteredData,
      },
      this.getBookShelvesData,
    )
  }

  labelChange = label => {
    this.setState({
      activeTabLabel: label,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })

    const {bookShelvesBooksList} = this.state
    const searchResults = bookShelvesBooksList.filter(book =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState(
      {
        bookShelvesBooksList: searchResults,
      },
      this.getBookShelvesData,
    )
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBookShelvesData()
    }
  }

  onClickSearchIcon = () => {
    this.getBookShelvesData()
  }

  onClickTryAgain = () => {
    this.getBookShelvesData()
  }

  getBookShelvesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {activeTabValue, searchInput} = this.state
    const Url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTabValue}&search=${searchInput}`
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
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPicUrl: each.cover_pic,
      }))
      this.setState({
        bookShelvesBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          className="search-input-element"
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onKeyDownSearchInput}
        />
        <button
          testid="searchButton"
          className="search-icon-button"
          type="button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderTabsListContainer = () => {
    const {activeTabValue} = this.state
    return (
      <ul className="tabs-list-container">
        {bookshelvesList.map(each => (
          <BookShelvesTabs
            tabChange={this.tabChange}
            labelChange={this.labelChange}
            activeTabValue={activeTabValue}
            tabDetails={each}
            key={each.id}
          />
        ))}
      </ul>
    )
  }

  renderBookShelvesLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookShelvesSuccessView = () => {
    const {bookShelvesBooksList, searchInput} = this.state
    if (bookShelvesBooksList.length > 0) {
      return (
        <ul className="bookshelves-books-list-container">
          {bookShelvesBooksList.map(book => (
            <BookShelvesBook bookItem={book} key={book.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-results-view-container">
        <img
          src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1720937617/Asset_1_1bookshleves-failure_hcffht.png"
          alt="no books"
          className="bookshelves-no-results-image"
        />
        <p className="bookshelves-no-results-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookShelvesFailureView = () => (
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
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderBookShelvesBooksViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderBookShelvesLoadingView()
      case apiStatusConstants.success:
        return this.renderBookShelvesSuccessView()
      case apiStatusConstants.failure:
        return this.renderBookShelvesFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeTabLabel} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container" testid="bookShelves">
          <div className="bookshelves-content">
            <div className="search-container">
              {this.renderSearchContainer()}
            </div>
            <div className="tabs-books-container">
              <div className="tabs-container">
                <h1 className="tabs-heading">BookShelves</h1>
                {this.renderTabsListContainer()}
              </div>
              <div className="bookshelves-views-container">
                <div className="desktop-views-header">
                  <h1 className="views-heading">{activeTabLabel} Books</h1>
                  {this.renderSearchContainer()}
                </div>
                {this.renderBookShelvesBooksViews()}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
