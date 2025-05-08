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

// name  vendorname mechanicname service available  locality address city mobile 

const UpdateService = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [donationData, setDonationData] = useState({});
  
  const [editedService, setEditedService] = useState({
    useremail: '',
    name:'',
    vehicle: '',
    manpower_details: '',
    address: '',
    mobile: '',
  

  });
  
  const token = localStorage.getItem('token');
  
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/service/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedService({
            useremail: data.useremail  ,
            name: data.name  ,
            vehicle: data.vehicle ,        
            address: data.address,
            mobile: data.mobile  ,
            manpower_details: data.manpower_details 
          });
        }else {
          console.error('Error fetching item data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching item data:', error.message);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value} = e.target;

   
      // For other input types, update the state with the input value
      setEditedService({
        ...editedService,
        [name]: value,
      });
    
  
};

// Ctegory =
  const handleUpdateService  = async (e) =>  {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {

      const response = await fetch(`http://localhost:4000/api/v1/service/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(editedService),
      });
    
      if (response.ok) {
        console.log('Service Updated successfully!');
        // Handle success, e.g., redirect to another page
        alert('Update Successful');
        window.location.href = '/view_my_service';
      } else {
        console.error('Error posting item data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting item data:', error.message);
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
          <li><Link to="service_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Update Service</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
            <form onSubmit={handleUpdateService}>
            <div className="mb-3">
                      <div className="title mb-2"><span>Name</span></div>
                      <input className="form-control" name="name" id="name" value={editedService.name} onChange={handleInputChange} type="text" />
                    </div>
                   
                    <div className="mb-3">
                      <div className="title mb-2"><span>Vehicle</span></div>
                      <input className="form-control" name="vehicle" id="vehicle" value={editedService.vehicle} onChange={handleInputChange} type="text" />
                     </div>
              
                    <div className="mb-3">
                      <div className="title mb-2"><span>Manpower Details</span></div>
                      <input className="form-control" name="manpower_details" id="manpower_details" value={editedService.manpower_details} onChange={handleInputChange} type="text" />
                    </div>
                  
                    <div className="mb-3">
                      <div className="title mb-2"><span>Address</span></div>
                      <input className="form-control" name="address" id="address" value={editedService.address} onChange={handleInputChange} type="text" />
                     </div>
                 
                    <div className="mb-3">
                      <div className="title mb-2"><span>Mobile</span></div>
                      <input className="form-control" name="mobile" id="mobile" value={editedService.mobile} onChange={handleInputChange} type="text" />
                    </div>
                    <button className="btn btn-success w-100" type="submit">Submit</button>
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
                    <li className="active"> <Link to="/service_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}


export default UpdateService