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

const UpdateCrop = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [donationData, setDonationData] = useState({});
  
  const [editedCrop, setEditedCrop] = useState({
     
    useremail: '',
    name: '',
    quantity: '',
    address: '',
    mobile: '',
    image:null,
    
  

  });
  
  
  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/crop/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedCrop({
            useremail: data.useremail  ,
            name: data.name  ,
            quantity: data.quantity ,      
            address:data.address,  
            mobile: data.mobile,
            image:data.image,
          });
        }else {
          console.error('Error fetching item data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching item data:', error.message);
      }
    };

    fetchCropDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value} = e.target;

   
      // For other input types, update the state with the input value
      setEditedCrop({
        ...editedCrop,
        [name]: value,
      });
    
  
};

// Ctegory =
  const handleUpdateCrop  = async (e) =>  {
    e.preventDefault();
  
    try {

      const response = await fetch(`http://localhost:4000/api/v1/crop/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(editedCrop),
      });
    
      if (response.ok) {
        console.log('Crop Updated successfully!');
        // Handle success, e.g., redirect to another page
        alert('Update Successful');
        window.location.href = '/view_my_crop';
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
          <li><Link to="user_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Update Crop</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
            <form onSubmit={handleUpdateCrop}>
                
                    <div className="mb-3">
                      <div className="title mb-2"><span>Name</span></div>
                      <input className="form-control" name="name" id="name" value={editedCrop.name} onChange={handleInputChange} type="text" />
                    </div>
                  
                    <div className="mb-3">
                      <div className="title mb-2"><span>Quantity</span></div>
                      <input className="form-control" name="quantity" id="quantity" value={editedCrop.quantity} onChange={handleInputChange} type="text" />
                    </div>
              
            
                    <div className="mb-3">
                      <div className="title mb-2"><span>Address</span></div>
                      <input className="form-control" name="address" id="address" value={editedCrop.address} onChange={handleInputChange} type="text" />
                    </div>
            
                    <div className="mb-3">
                      <div className="title mb-2"><span>Mobile</span></div>
                      <input className="form-control" name="mobile" id="mobile" value={editedCrop.mobile} onChange={handleInputChange} type="text" />
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


export default UpdateCrop