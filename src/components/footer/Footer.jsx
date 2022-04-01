import React from 'react';
import './footer.scss';

import {link} from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/fotoo.png';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="footer" style={{backgroundImage: `url(${bg})`}}>
      <div className="footer__content container">
        <div className="footer_content__logo">
        <div className="logo">
            <img src={logo} alt="" />
            <Link to="/">tMovies </Link>
        </div>
        </div>
        <div className="footer__content__menus">

          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Term of Services</Link>

            <Link to="/">About Us</Link>
            </div>

           
          <div className="footer__content__menu">
            <Link to="/">Perprogramera</Link>
            <Link to="/">Bootcamp</Link>
            <Link to="/">React </Link>

            <Link to="/">2022</Link>
            </div>


         
          <div className="footer__content__menu">
            <Link to="/">Best</Link>
            <Link to="/">Top</Link>
            <Link to="/">React</Link>

            <Link to="/">2022</Link>
            </div>


          </div>
        </div>
      </div>
    
  );
}

export default Footer;