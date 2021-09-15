import * as firebase from '../Firebase';
import { useContext, useState } from 'react';
import { AuthUserContext } from './index';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified;

const withEmailVerification = Component => {
  return props => {
    const [isSent, setIsSent] = useState(false);
    const authUser = useContext(AuthUserContext);

    const onSendEmailVerification = () => {
      firebase
        .doSendEmailVerification()
        .then(() => setIsSent(true));
    };

    return (needsEmailVerification(authUser) ? (
      <div>
        {isSent ? (
          <p>
            Verify your E-Mail: Check your E-Mails (Spam folder
            included) for a confirmation E-Mail or send
            another confirmation E-Mail.
          </p>
        ) : (
          <p>
            Verify your E-Mail: Check your E-Mails (Spam folder
            included) for a confirmation E-Mail or send
            another confirmation E-Mail.
          </p>
        )}

        <button
          type="button"
          onClick={onSendEmailVerification}
          disabled={isSent}
        >
          Send confirmation E-Mail
        </button>
      </div>
    ) : (
      <Component {...props} />
    ));
  };
};

export default withEmailVerification;
