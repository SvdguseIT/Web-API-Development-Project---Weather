import React, { useEffect } from 'react';
import WeatherMap from './weatherMap';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // If token exists, include it in the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Example: Fetch user data after authentication
          const response = await axios.get('https://example.com/api/user');
          console.log('User data:', response.data);
        } else {
          // Token doesn't exist, handle accordingly (e.g., redirect to login)
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    // Clean up the effect
    return () => {
      // Remove the authorization header
      delete axios.defaults.headers.common['Authorization'];
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h1>Sri Lanka Weather Map</h1>
      <WeatherMap />
    </div>
  );
};

export default App;


