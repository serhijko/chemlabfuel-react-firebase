import Navigation from '../Navigation';

import logo from './logo.jpg';
import './index.css';

const Header = () => (
  <div className="Header">
    <Navigation />
    <img src={logo} className="Header-logo" alt="logo" />
  </div>
);

export default Header;
