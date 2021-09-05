import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <Link to={ROUTES.SING_IN}>Sign In</Link>
    </ul>
    <ul>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </ul>
    <ul>
      <Link to={ROUTES.HOME}>Home</Link>
    </ul>
    <ul>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </ul>
    <ul>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </ul>
  </div>
);

export default Navigation;
