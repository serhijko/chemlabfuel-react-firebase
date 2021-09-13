import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';

import * as firebase from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const AdminPage = () => {
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
      <h1>Admin Page</h1>
      <p>
        The Admin Page is accessible by every signed in admin user.
      </p>

      {loading && <div>Loading ...</div>}

      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
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
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default withAuthorization(condition)(AdminPage);
