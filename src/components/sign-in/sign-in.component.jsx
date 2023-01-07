import React, { useState } from "react";
import { CustomButton } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import { connect } from 'react-redux'
import { emailSignInStart, googleSignInStart } from "../../redux/user/user-actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  const submitHandler = e => {
    e.preventDefault();
    emailSignInStart(email, password);
  }

  const changeHandler = e => {
    const {name, value} = e.target;
    setCredentials({ ...credentials, [name]: value });
  }
  
  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form action="" onSubmit={submitHandler}>
        <FormInput type="email" name="email" label="Email" changeHandler={changeHandler} value={email} required />
        <FormInput type="password" name="password" label="Password" changeHandler={changeHandler} value={password} required />

        <div className="buttons">
          <CustomButton type="submit"> Sign In </CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign In With Google </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);