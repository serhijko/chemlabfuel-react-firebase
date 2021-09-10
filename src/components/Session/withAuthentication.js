import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

// import { AuthUserContext } from '.';
import AuthUserContext from './context';
import { auth } from '../Firebase';

const withAuthentication = Component => {
  return props => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const listener = onAuthStateChanged(
        auth,
        authUser => {
          authUser
            ? setAuthUser(authUser)
            : setAuthUser(null);
        },
      );
      return () => listener();
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
};

export default withAuthentication;
