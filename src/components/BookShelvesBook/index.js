import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelvesBook = props => {
  const {bookItem} = props
  const {id, title, readStatus, rating, authorName, coverPicUrl} = bookItem
  return (
    <Link to={`/books/${id}`} className="link-item">
      <li className="book-item-container" key={id}>
        <img src={coverPicUrl} alt={title} className="book-item-cover-pic" />
        <div className="book-item-content">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <pre>
            <p className="book-rating">
              Avg Rating:{' '}
              <span className="star-icon">
                <BsFillStarFill />
              </span>{' '}
              {rating}
            </p>
          </pre>
          <pre>
            <p className="book-status">
              Status: <span className="status-styling">{readStatus}</span>
            </p>
          </pre>
        </div>
      </li>
    </Link>
  )
}

export default BookShelvesBook
