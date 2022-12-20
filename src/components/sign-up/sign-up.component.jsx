import React from "react";
import FormInput from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import "./sign-up.styles.scss";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  submitHandler = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if(password !== confirmPassword) {
      alert("Passwords don't match...")
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.log(error);
    }

  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.submitHandler}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            changeHandler={this.changeHandler}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            changeHandler={this.changeHandler}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            changeHandler={this.changeHandler}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            changeHandler={this.changeHandler}
            label='Confirm Password'
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;