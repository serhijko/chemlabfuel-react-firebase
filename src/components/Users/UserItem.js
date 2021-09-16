import { onValue } from 'firebase/database';
import { sendPasswordResetEmail } from 'firebase/auth';

import * as firebase from '../Firebase';

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

export default UserItem;
