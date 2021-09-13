import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set } from 'firebase/database';

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

const SignUpFormBase = props => {
  const [firstName, setFirstName] = useState(INITIAL_STATE.firstName);
  const [lastName, setLastName] = useState(INITIAL_STATE.lastName);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [isAdmin, setIsAdmin] = useState(INITIAL_STATE.isAdmin);
  const [error, setError] = useState(INITIAL_STATE.error);

  const onSubmit = event => {
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    (async () => {
      try {
        const authUser = await createUserWithEmailAndPassword(firebase.auth, email, passwordOne);
        const signUp = await set(firebase.user(authUser.user.uid), {
          username: { firstName, lastName },
          email,
          roles,
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
    Don't have an account? <Link to={ROUTES.SING_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
