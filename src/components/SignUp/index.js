import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set } from 'firebase/database';

import { auth, dbUser } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import useFormInput from '../../handlers/useFormInput';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpFormBase = props => {
  const [firstName, setFirstName] = useState(INITIAL_STATE.firstName);
  const [lastName, setLastName] = useState(INITIAL_STATE.lastName);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error, setError] = useState(INITIAL_STATE.error);

  const onSubmit = event => {
    (async () => {
      try {
        const authUser = await createUserWithEmailAndPassword(auth, email, passwordOne);
        const signUp = await set(dbUser(authUser.user.uid), {
          username: { firstName, lastName },
          email,
        });
        setFirstName(INITIAL_STATE.firstName);
        setLastName(INITIAL_STATE.lastName);
        setEmail(INITIAL_STATE.email);
        setPasswordOne(INITIAL_STATE.passwordOne);
        setPasswordTwo(INITIAL_STATE.passwordTwo);
        setError(INITIAL_STATE.error);
        props.history.push(ROUTES.HOME);
        return signUp;
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    firstName === '' || lastName === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        {...useFormInput(firstName, setFirstName)}
        type="text"
        placeholder="First Name"
      />
      <input
        {...useFormInput(lastName, setLastName)}
        type="text"
        placeholder="Last Name"
      />
      <input
        {...useFormInput(email, setEmail)}
        type="text"
        placeholder="Email Address"
      />
      <input
        {...useFormInput(passwordOne, setPasswordOne)}
        type="password"
        placeholder="Password"
      />
      <input
        {...useFormInput(passwordTwo, setPasswordTwo)}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SING_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
