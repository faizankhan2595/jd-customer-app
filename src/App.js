import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from './configs/AppConfig';
import axios from "axios";
import { API_BASE_URL } from 'constants/ApiConstant';
import { CountryProvider } from 'CountryContext';
import { PermissionsProvider } from 'contexts/PermissionsContext';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};


export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  // other configurations
})


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response);
    if (error.response.status===401 || error.response.data.message === "Unauthorized") {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
          <CountryProvider> 
            <PermissionsProvider>
              <Router>
                <Switch>
                  <Route path="/" component={Views} />
                </Switch>
              </Router>
            </PermissionsProvider>
          </CountryProvider>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
