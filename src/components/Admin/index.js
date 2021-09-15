import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { Link, Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import * as firebase from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { sendPasswordResetEmail } from 'firebase/auth';

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <p>
      The Admin Page is accessible by every signed in admin user.
    </p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    return onValue(firebase.users(), snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
    }, {
      onlyOnce: true
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username.firstName + ' ' + user.username.lastName}
            </span>
            <span>
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user },
                }}
              >
                Details
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserItem = props => {
  const [loading, setLoading] = useState(false);
  const initialState = { user: null, ...props.location.state };
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    if (user) {
      return;
    }

    setLoading(true);

    return onValue(firebase.user(props.match.params.id), snapshot => {
      setUser(snapshot.val());
      setLoading(false);
    }, {
      onlyOnce: true
    });
  }, [user, props.match.params.id]);

  const onSendPasswordResetEmail = () => {
    sendPasswordResetEmail(firebase.auth, user.email);
  };

  return (
    <div>
      <h2>User ({props.match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username.firstName + ' ' + user.username.lastName}
          </span>
          <span>
            <button
              type="button"
              onClick={onSendPasswordResetEmail}
            >
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(AdminPage);
