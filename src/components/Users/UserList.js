import { useEffect, useState } from 'react';
import { off, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

import * as firebase from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    onValue(firebase.users(), snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
    });

    return () => {
      off(firebase.users());
    }
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid} {' '}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email} {' '}
            </span>
            <span>
              <strong>Username:</strong> {user.username.firstName + ' ' + user.username.lastName} {' '}
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

      <SignUpLink />
    </div>
  );
};

export default UserList;
