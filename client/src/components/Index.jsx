import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
{/*
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgBack from "./img/bg-img/wall.png";

import Title from './Title.jsx';

const Index = () => {
  return (
    <div>
      
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Farmer Harvest App</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login"> Login</Link></li>
        
          </ul>
      </div>
    </div>
      </div>
    </div>

      <div className="container">
        <div className="pt-3">
            <div className="single-hero-slide" >
                <img src={imgBack} className="img-fluid"  />
            </div>            
      </div>
      </div>
<br></br>

      <div className="product-catagories-wrapper py-3">
        <div className="container">
          <div className="section-heading">
            <h6>Main Menu</h6>
          </div>
          <div className="product-catagory-wrap">
            <div className="row g-3">
              <div className="col-6">
                <div className="card catagory-card">
               <Link to="/login" className="btn btn-warning btn-lg w-100">
                    Admin/Farmers/Service Providers/ Buyers Login </Link>
                </div>
              </div>
			   <div className="col-6">
                <div className="card catagory-card">
                  <Link to="/register" className="btn btn-warning btn-lg w-100" >
                 Farmers/Service Providers/ Buyers Register </Link>
                </div>
              </div>
			
            </div>
          </div>
        </div>
      </div>




</div>
  )
}

export default Index