import {FaTwitter, FaInstagram, FaYoutube, FaGoogle} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <FaGoogle className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaYoutube className="footer-icon" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
