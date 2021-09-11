import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';

import { auth } from '../Firebase';
import useFormInput from '../../handlers/useFormInput';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = () => {
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error, setError] = useState(INITIAL_STATE.error);
  
  const onSubmit = event => {
    (async () => {
      try {
        const passwordUpdate = await updatePassword(auth.currentUser, passwordOne);
        setPasswordOne(INITIAL_STATE.passwordOne);
        setPasswordTwo(INITIAL_STATE.passwordTwo);
        setError(INITIAL_STATE.error);
        return passwordUpdate;
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        {...useFormInput(passwordOne, setPasswordOne)}
        type="password"
        placeholder="New Password"
      />
      <input
        {...useFormInput(passwordTwo, setPasswordTwo)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

export default PasswordChangeForm;
