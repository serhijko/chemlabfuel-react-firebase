import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { SignUpLink } from '../SignUp';
import { auth } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import useFormInput from '../../handlers/useFormInput';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = props => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [error, setError] = useState(INITIAL_STATE.error);

  const onSubmit = event => {
    (async () => {
      try {
        const signIn = await signInWithEmailAndPassword(auth, email, password);
        setEmail(INITIAL_STATE.email);
        setPassword(INITIAL_STATE.password);
        setError(INITIAL_STATE.error);
        props.history.push(ROUTES.HOME);
        return signIn;
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        {...useFormInput(email, setEmail)}
        type="text"
        placeholder="Email Address"
      />
      <input
        {...useFormInput(password, setPassword)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = withRouter(SignInFormBase);

export default SignInPage;

export { SignInForm };
