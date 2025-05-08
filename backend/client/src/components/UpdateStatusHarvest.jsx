import React, { useState,useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';

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

// name  vendorname city password phone  locality address city phone 

const UpdateStatusHarvest = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [businessData, setRequestData] = useState({});
  
  const [editedRequest, setEditedRequest] = useState({
    status: '',
  });
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/request/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedRequest({
            status: data.status  ,
          });
        }else {
          console.error('Error fetching Request data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching Request data:', error.message);
      }
    };

    fetchRequestDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRequest({
      ...editedRequest,
      [name]: value,
    });
  };

  const handleUpdateRequest  = async (e) =>  {
    e.preventDefault();
    try {

      const response = await fetch(`http://localhost:4000/api/v1/request/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //  'x-auth-token': token,
        },
        body: JSON.stringify(editedRequest),
      });

      if (response.ok) {
        console.log('Status updated successfully!');
        // Add any additional logic you need after a successful update
        alert('Status updated successfully')
    
        window.location.href = "/view_all_request";

      } else {
        console.error('Not updating Request details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Request details:', error.message);
    }
  };

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
            <h6 className="user-name mb-1">Lost& Found Items Finder App
            </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Update Status</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleUpdateRequest} >
              <div className="mb-3">
                  <div className="title mb-2"><span>Update Status</span></div>
                  <select name="status" id="status"
                    value={editedRequest.status}
                    onChange={handleInputChange}  >
                     <option value="Pending">Pending</option>
                      <option value="Accept">Accept</option>
                     <option value="Rejected">Rejected</option>
                    </select>
                            
                </div>
            
  
                <button  className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End
        */}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default UpdateStatusHarvest