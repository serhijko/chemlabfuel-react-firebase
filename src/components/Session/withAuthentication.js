import React, { useEffect, useState } from 'react';

// import { AuthUserContext } from '.';
import AuthUserContext from './context';
import { onAuthUserListener } from '../Firebase';

const withAuthentication = Component => {
  return props => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const listener = onAuthUserListener(
        authUser => {
          setAuthUser(authUser)
        },
        () => {
          setAuthUser(null);
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
