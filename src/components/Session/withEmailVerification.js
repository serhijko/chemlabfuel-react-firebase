import * as firebase from '../Firebase';
import { useContext, useState } from 'react';
import { AuthUserContext } from './index';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified;

const DefaultComponent = ({
  buttonTitle = 'Send confirmation E-Mail',
  children,
  onClick,
  disabled,
                          }) => (
  <div>
    <p>{children}</p>

    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonTitle}
    </button>
  </div>
);

const MESSAGE_IF_EMAIL_IS_SENT = `
  Verify your E-Mail: Check your E-Mails (Spam folder
  included) for a confirmation E-Mail or send
  another confirmation E-Mail.
`;

const MESSAGE_IF_EMAIL_IS_NOT_SENT = `
  Verify your E-Mail: Check your E-Mails (Spam folder
  included) for a confirmation E-Mail or send
  another confirmation E-Mail.
`;

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
      <DefaultComponent
        onClick={onSendEmailVerification}
        disabled={isSent}
      >
        {isSent ? MESSAGE_IF_EMAIL_IS_SENT : MESSAGE_IF_EMAIL_IS_NOT_SENT}
      </DefaultComponent>
    ) : (
      <Component {...props} />
    ));
  };
};

export default withEmailVerification;
