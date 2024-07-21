import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const TopRatedBooks = props => {
  const {booksData} = props
  const renderSlider = () => (
    <Slider {...settings}>
      {booksData.map(eachBook => {
        const {id, authorName, coverPicUrl, title} = eachBook
        return (
          <Link className="link-item" to={`/books/${id}`} key={id}>
            <li className="slick-item">
              <img className="coverpic-image" src={coverPicUrl} alt={title} />
              <h1 className="slick-book-title">{title}</h1>
              <p className="slick-book-author-name">{authorName}</p>
            </li>
          </Link>
        )
      })}
    </Slider>
  )

  return <div className="slick-container">{renderSlider()}</div>
}

export default TopRatedBooks
