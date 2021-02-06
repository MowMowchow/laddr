import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import laddr_img from './laddr_img.svg';


function Home(){

  return(
    <div className="home-container">
      <div className="home-header-container">
        <h1 className="home-header">Laddr</h1>
      </div>

      <div className="home-info-container">
        <div className="home-pic-container">
          <img className="home-pic" alt="ladder" src={laddr_img}></img>
          {/* {<a href='https://www.freepik.com/vectors/abstract'>Abstract vector created by vectorjuice - www.freepik.com</a>} */}

        </div>

        <div className="home-desc-container">
          <div className="home-desc">
            <h2 className="home-txt-header">Stuck?</h2>
            <p className="home-txt">
              <h3 className="home-txt-stuck">Don't be.</h3> Laddr helps you to find the degree level that will earn you the most money by the time you retire, using data provided by <a className="statcan-link" href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710012201">Statistics Canada</a>.
            </p>

          </div>
          
          <Link className="try-btn-link" to="/results">
            <button className="try-btn">
              Try Now
            </button>
          </Link>

        </div>

      </div>
      
    </div>
  )
}

export default Home;