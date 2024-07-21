import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container" testid="notFound">
      <div className="not-found-content">
        <img
          src="https://res.cloudinary.com/ds1gidzqc/image/upload/v1721113530/Group_7484notFound_oigcm5.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found
        </p>
        <Link to="/" className="link-item">
          <button type="button" className="go-to-btn">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
