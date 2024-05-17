import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Name = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

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
                window.alert(error)
            });
    }, [email]);
   
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.log("err")
            return null;
        }
    };

    return (
        <div>
            {users && users.name && <h3>{users.name}</h3>}
        </div>
    );
};

export default Name;
