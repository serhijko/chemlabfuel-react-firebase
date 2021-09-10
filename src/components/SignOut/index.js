import React from 'react';
import { signOut } from 'firebase/auth';

import { auth } from '../Firebase';

const SignOutButton = () => (
  <button type="button" onClick={() => signOut(auth)}>
    Sign Out
  </button>
);

export default SignOutButton;
