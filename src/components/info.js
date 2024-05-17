import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Info = () => {
    const [users, setUsers] = useState(null);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchToken = async () => {
        try {
          const response = await axios.get('http://localhost:2000/api/token');
          setToken(response.data.token);
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
  
      fetchToken();
    }, []);
  
    useEffect(() => {
      if (!token) return; // Check if token is empty
      const decodedToken = decodeToken(token);
      const userEmail = decodedToken?.email;
  
      if (userEmail) {
        setEmail(userEmail);
      }
    }, [token]); // Add token to the dependency array
  
    useEffect(() => {
      if (!email) return; // Check if email is empty
      axios.get(`http://localhost:2000/api/customer/profile/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
    }, [email, token]); // Add token to the dependency array
  
    const decodeToken = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.log("Error decoding token:", error);
        return null;
      }
    };
  
    if (loading) {
      return <div>Loading...</div>; // Show loading indicator
    }
  
    if (!users) {
      return <div>No user data available</div>; // Handle no user data case
    }
  
    return (
      <div className="card">
        <div className="card-body" id="body">
          <UserProfile users={users} token={token} />
        </div>
      </div>
    );
  };
  
  const UserProfile = ({ users, token }) => {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [formData, setFormData] = useState({
      name: users.name || '',
      email: users.email || '',
      age: users.age || '',
      gender: users.gender || '',
      date_of_birth: users.date_of_birth || '',
      phone_number: users.phone_number || '',
      address: `${users.address?.street || ''}, ${users.address?.city || ''}, ${users.address?.state || ''}, ${users.address?.zip_code || ''}`,
      city: users.address?.city || '',
      state: users.address?.state || '',
      zip_code: users.address?.zip_code || '',
      preferences: `Car Model: ${users.preferences?.car_model || ''}, Color Preference: ${users.preferences?.color_preference || ''}, Preferred Year: ${users.preferences?.preferred_year || ''}`
    });
  
    const toggleReadOnly = async () => {
      if (!isReadOnly) {
        // Save the form data to the database
        
        try {
          const response = await axios.put(`http://localhost:2000/api/customer/updateprofile/${formData.email}`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(response.data.message);
        } catch (error) {
          console.error('Error updating customer profile:', error);
        }
      }
      setIsReadOnly(!isReadOnly);
    };
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
  
    return (
      <form>
        <h6 className="heading-small text-muted mb-4">User information</h6>
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="name">Username</label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-alternative"
                  placeholder="Username"
                  value={formData.name}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-alternative"
                  value={formData.email}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="age">Age</label>
                <input
                  type="text"
                  id="age"
                  className="form-control form-control-alternative"
                  placeholder="Age"
                  value={formData.age}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  className="form-control form-control-alternative"
                  placeholder="Gender"
                  value={formData.gender}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="date_of_birth">Birthday</label>
                <input
                  type="text"
                  id="date_of_birth"
                  className="form-control form-control-alternative"
                  placeholder="Birthday"
                  value={formData.date_of_birth}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="phone_number">Phone number</label>
                <input
                  type="text"
                  id="phone_number"
                  className="form-control form-control-alternative"
                  placeholder="Phone"
                  value={formData.phone_number}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {/* Address */}
        <h6 className="heading-small text-muted mb-4">Contact information</h6>
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="address">Address</label>
                <input
                  id="address"
                  className="form-control form-control-alternative"
                  placeholder="Home Address"
                  value={formData.address}
                  type="text"
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="form-control form-control-alternative"
                  placeholder="City"
                  value={formData.city}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  className="form-control form-control-alternative"
                  placeholder="State"
                  value={formData.state}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="zip_code">Postal code</label>
                <input
                  type="number"
                  id="zip_code"
                  className="form-control form-control-alternative"
                  placeholder="Postal code"
                  value={formData.zip_code}
                  readOnly={isReadOnly}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {/* Description */}
        <h6 className="heading-small text-muted mb-4">About me</h6>
        <div className="pl-lg-4">
          <div className="form-group focused">
            <label htmlFor="preferences">Preferences</label>
            <input
              type="text"
              id="preferences"
              className="form-control form-control-alternative"
              placeholder="Preferences"
              value={formData.preferences}
              readOnly={isReadOnly}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              id="toggle"
              className="btn btn-sm btn-primary"
              onClick={toggleReadOnly}
              type="button"
            >
              {isReadOnly ? 'Edit' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    );
  };

export default Info;
