import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { dbUsers } from '../Firebase';

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    return onValue(dbUsers(), snapshot => {
      const usersObject = snapshot.val();
      console.log(usersObject);
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      console.log(usersList);
      setUsers(usersList);
      setLoading(false);
    }, {
      onlyOnce: true
    });
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>

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

export default AdminPage;
