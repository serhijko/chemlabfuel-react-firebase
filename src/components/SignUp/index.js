import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set } from 'firebase/database';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import * as firebase from '../Firebase';
import useFormInput from '../../handlers/useFormInput';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const SignUpFormBase = () => {
  const [firstName, setFirstName] = useState(INITIAL_STATE.firstName);
  const [lastName, setLastName] = useState(INITIAL_STATE.lastName);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [isAdmin, setIsAdmin] = useState(INITIAL_STATE.isAdmin);
  const [error, setError] = useState(INITIAL_STATE.error);

  const onSubmit = event => {
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    (async () => {
      try {
        const authUser = await createUserWithEmailAndPassword(firebase.auth, email, passwordOne);
        // Create a user in your Firebase realtime database
        const signUp = await set(firebase.user(authUser.user.uid), {
          username: { firstName, lastName },
          email,
          roles,
        });
        await firebase.doSendEmailVerification();
        return signUp;
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };

  const onChangeCheckbox = event => {
    setIsAdmin(event.target.checked);
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
      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
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
    <Link to={ROUTES.SING_UP}>Sign Up a New User</Link>
  </p>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const SignUpForm = compose(
  withRouter,
  withAuthorization(condition),
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
