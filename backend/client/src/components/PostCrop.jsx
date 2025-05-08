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
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// name  vendorname mechanicname service available  locality address city mobile 

const PostCrop = () => {
  
  const [formData, setFormData] = useState({
    
    useremail: '',
    name: '',
    quantity: '',
    address: '',
    mobile: '',
    image:null,
  });
  const [validationErrors, setValidationErrors] = useState({});


  const postCropData = async () => {
    const token = localStorage.getItem('token');
    const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    //console.log(vendorEmail);  // Output: vendor@gmail.com

    
  try {
    const formDataForServer = new FormData();
  
    formDataForServer.append('useremail', userEmail);
    formDataForServer.append('name', formData.name);
    formDataForServer.append('quantity', formData.quantity);
 
    formDataForServer.append('address', formData.address);
    formDataForServer.append('mobile', formData.mobile);
   
    formDataForServer.append('image', formData.image);

    const response = await fetch('http://localhost:4000/api/v1/crop/', {
      method: 'POST',
      body: formDataForServer, // Directly send FormData object
    });
    if (response.ok) {
      console.log('Crop data posted successfully!');
      // Handle success, e.g., redirect to another page
      alert('Created Successful');
      window.location.href = 'view_my_crop';
    } else {
      console.error('Error posting Crop data:', response.statusText);
    }
  } catch (error) {
    console.error('Error posting Crop data:', error.message);
  }
};

  
const handleInputChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'image') {
    // If the input is a file input (for image), update the state with the selected file
    setFormData({
      ...formData,
      [name]: files[0],
    });
  } else {
    // For other input types, update the state with the input value
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Reset validation error for the current field when it's being modified
  setValidationErrors({
    ...validationErrors,
    [name]: '',
  });
};
      // Validation 
      const validateForm = () => {
        let isValid = true;
        const errors = {};
    
        if (!formData.name) {
          errors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.quantity) {
          errors.quantity = 'quantity is required';
          isValid = false;
        }
      
     
        if (!formData.address) {
          errors.address = 'Address is required';
          isValid = false;
        }
       
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
          errors.mobile = 'Mobile must be a 10-digit number';
          isValid = false;
        }
   
        setValidationErrors(errors);
        return isValid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          return;
        }
        postCropData();
      };
  // OnForm Submit
 


  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="header-area" id="headerArea">
            <div className="container h-100 d-flex align-items-center justify-content-between">
              <div className="logo-wrapper" style={{ color: '#020310' }}>
                <img src={imgSmall} alt="" />
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
                <div className="user-profile">
                  <img src={imgBg} alt="" />
                </div>
                <div className="user-info">
                  <h6 className="user-name mb-1">Farmer Harvest App
                  </h6>
                </div>
              </div>
              <ul className="sidenav-nav ps-0">
                <li>
                  <Link to="/user_home"><i className="lni lni-home"></i>Home</Link>
                </li>
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
              <h6>Add Crop Details</h6>
            </div>
            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="title mb-2"><span> Image</span></div>
                      <input className="form-control" name="image" id="image" onChange={handleInputChange} type="file" />
                      {validationErrors.image && <p style={{ color: 'red' }}>{validationErrors.image}</p>}
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2"><span>Name</span></div>
                      <input className="form-control" name="name" id="name" value={formData.name} onChange={handleInputChange} type="text" />
                      {validationErrors.name && <p style={{ color: 'red' }}>{validationErrors.name}</p>}
                    </div>
                  
                    <div className="mb-3">
                      <div className="title mb-2"><span>Quantity</span></div>
                      <input className="form-control" name="quantity" id="quantity" value={formData.quantity} onChange={handleInputChange} type="text" />
                      {validationErrors.quantity && <p style={{ color: 'red' }}>{validationErrors.quantity}</p>}
                    </div>
              
            
                    <div className="mb-3">
                      <div className="title mb-2"><span>Address</span></div>
                      <input className="form-control" name="address" id="address" value={formData.address} onChange={handleInputChange} type="text" />
                      {validationErrors.address && <p style={{ color: 'red' }}>{validationErrors.address}</p>}
                    </div>
            
                    <div className="mb-3">
                      <div className="title mb-2"><span>Mobile</span></div>
                      <input className="form-control" name="mobile" id="mobile" value={formData.mobile} onChange={handleInputChange} type="text" />
                      {validationErrors.mobile && <p style={{ color: 'red' }}>{validationErrors.mobile}</p>}
                    </div>
                    <button className="btn btn-success w-100" type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCrop;