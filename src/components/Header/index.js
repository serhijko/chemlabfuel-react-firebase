import Navigation from '../Navigation';

import logo from './logo.jpg';
import './index.css';
import React, { useContext } from 'react';
import { AuthUserContext } from '../Session';

const Header = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div className="Header">
      <Navigation/>
      {
        !authUser
          ?
          <img src={logo} className="Header-logo" alt="logo" />
          :
          <div className="Header-text">
            <h1>Испытательный центр</h1>
            <h2>Химическая лаборатория "Топливо"</h2>
          </div>
      }
    </div>
  );
};

export default Header;
