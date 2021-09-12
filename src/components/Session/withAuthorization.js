import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';

import AuthUserContext from './context';
import { auth } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  const WithAuthorization = props => {
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
      const listener = onAuthStateChanged(
        auth,
        authUser => {
          if (!condition(authUser)) {
            props.history.push(ROUTES.SING_IN);
          }
        },
      );
      return () => listener();
    }, [props.history]);

    return (
      condition(authUser) ? <Component {...props} /> : null
    );
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
