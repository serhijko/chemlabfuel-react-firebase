import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import useFormInput from '../../handlers/useFormInput';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetForm = () => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [error, setError] = useState(INITIAL_STATE.error);

  const onSubmit = event => {
    (async () => {
      try {
        const passwordReset = await sendPasswordResetEmail(auth, email);
        setEmail(INITIAL_STATE.email);
        setError(INITIAL_STATE.error);
        return passwordReset;
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };

  const isInvalid = email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        {...useFormInput(email, setEmail)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
