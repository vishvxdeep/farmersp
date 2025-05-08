import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";

import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewCrop = () => {
  const [farmerData, setCropData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/crop/`);
        if (response.status === 200) {
          setCropData(response.data);
          setFilteredData(response.data);
        } else {
          console.error('Error fetching request data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching request data:', error.message);
      }
    };

    fetchCropData();
  }, []);

  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = farmerData.filter((crop) =>
      Object.values(crop).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  // Store location and crop details in cookies
  const shareLocation = (useremail, cropname) => {
    document.cookie = `useremail=${useremail}; path=/;`;
    document.cookie = `cropname=${cropname}; path=/;`;
    window.location.href = '/post_crop_request';
  };

  const handleRequest = (useremail, cropname) => {
    shareLocation(useremail, cropname);
  };

  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{color:'#020310'}}>
            <img src={imgSmall} alt=""/>
            <Title /> 
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>  

      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
        <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt=""/></div>
            <div className="user-info">
              <h6 className="user-name mb-1">Farmer Harvest App</h6>
            </div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/buyer_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Search Crop Details</h6>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>
            {filteredData.length > 0 ? (
              <div className="row" style={{marginTop:10}}>
                {filteredData.map((crop) => (
                  <div key={crop._id} className="col-12 col-md-6">                                      
                    <div className="card product-card" style={{marginBottom:10}}>
                      <div className="card-body">
                        <a className="product-title d-block">Name: <b>{crop.name}</b></a>
                        <a className="product-title d-block">Quantity: <b>{crop.quantity}</b></a>
                        <a className="product-title d-block">Address: {crop.address}</a>
                        <a className="product-title d-block">Mobile: {crop.mobile}</a>
                        <a className="product-title d-block">Lat: {crop.lat}</a>
                        <a className="product-title d-block">Long: {crop.long}</a>
                        <a className="product-title d-block">Image:</a>
                        {crop.image && (
                          <a href={crop.image} target="_blank" rel="noopener noreferrer" className="product-title d-block">
                            <img src={crop.image} alt="crop Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                          </a>
                        )}
                      </div>
                    </div>
                    <a className="btn btn-danger" onClick={() => handleRequest(crop.useremail, crop.name)}>Request</a>
                    <a className="btn btn-danger" target="_blank" href={`https://maps.google.com/?q=${crop.lat},${crop.long}`}>Show Map</a>
                  </div>
                ))}
              </div>
            ) : (
              <p>No crop details found for the specified email or search term.</p>
            )}
          </div>
        </div>

        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active"><Link to="/buyer_home"><i className="lni lni-home"></i>Home</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCrop;
