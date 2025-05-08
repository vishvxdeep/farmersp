import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewMyRequest = () => {
    
  
  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////


  const [requestData, setRequestData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/request/');
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const serviceEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)serviceemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter request data based on vendoremail
         const filteredRequest = data.filter((request) => request.serviceemail === serviceEmail);
         setRequestData(filteredRequest);
         setFilteredData(filteredRequest);
        
      } catch (error) {
        console.error('Error fetching request data:', error.message);
      
      }
    };

    fetchRequestData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = requestData.filter((request) =>
      Object.values(request).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

          const timeOptions = { hour: '2-digit', minute: '2-digit' };


  return (
    <div>
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
            <h6 className="user-name mb-1">Farmer Harvest App

            </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/service_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>My Request</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>

                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((request) => (
              <div key={request._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Date: {new Date(request.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block" style={{color:'orange'}}  >Status: {request.status}  </a>
                      <a className="product-title d-block"  >Vehicle:  <b> {request.vehicle} </b></a>
                   
                      <a className="product-title d-block"  >Name:  <b> {request.name} </b></a>
                       <a className="product-title d-block"  >Mobile: {request.mobile}  </a>
                      
                      <a className="product-title d-block"  >Lat: {request.lat}  </a>
                      <a className="product-title d-block"  >Long: {request.long}  </a>
                  </div>   
                  </div>   
                  
          
                <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${request.lat},${request.long}`}>
                  Show Map
                </a>           
          			 
              </div>


              ))}
              
        </div>
           
        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/service_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                  </ul>
                </div>
              </div>
            </div>



</div>


</div>
</div>
  )
}

export default ViewMyRequest