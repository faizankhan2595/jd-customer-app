import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from 'App';

// Create the Context
const CountryContext = createContext();

// Create a provider component
const CountryProvider = ({ children }) => {
  const [countryList, setCountryList] = useState([]);
//   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axiosInstance.get('/api/web/country/list'); // Adjust your base URL if necessary
        setCountryList(response.data.items); // Assuming the data is in response.data
      } catch (err) {
        // setError(err.message);
      }
      
    };

    if(localStorage.getItem('token')) {
      fetchCountryData();
  }
  }, []);

  return (
    <CountryContext.Provider value={{ countryList}}>
      {children}
    </CountryContext.Provider>
  );
};

export { CountryProvider, CountryContext };
