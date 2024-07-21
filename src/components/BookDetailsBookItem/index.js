import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookDetailsBookItem = props => {
  const {bookDetails} = props
  const {
    authorName,
    title,
    coverPicUrl,
    rating,
    readStatus,
    aboutAuthor,
    aboutBook,
  } = bookDetails

  return (
    <>
      <div className="book-item-details-profile-container">
        <img
          src={coverPicUrl}
          alt={title}
          className="book-item-details-cover-pic"
        />
        <div className="book-item-details-profile-content">
          <h1 className="book-item-details-title">{title}</h1>
          <p className="book-item-details-author-name">{authorName}</p>
          <p className="book-item-details-rating">
            Avg Rating:
            <span className="book-item-details-star-icon">
              <BsFillStarFill />
            </span>
            {rating}
          </p>
          <p className="book-item-details-status">
            Status:
            <span className="book-item-details-status-styling">
              {readStatus}
            </span>
          </p>
        </div>
      </div>
      <hr className="line" />
      <div className="book-item-details-content-container">
        <h1 className="about-author-heading">About Author</h1>
        <p className="about-author-description">{aboutAuthor}</p>
        <h1 className="about-book-heading">About Book</h1>
        <p className="about-book-description">{aboutBook}</p>
      </div>
    </>
  )
}

export default BookDetailsBookItem
