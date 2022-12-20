import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import { CustomButton } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  submitHandler = e => {
    e.preventDefault();
    this.setState({
      email: '',
      password: ''
    });
  }

  changeHandler = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  
  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form action="" onSubmit={this.submitHandler}>
          <FormInput type="email" name="email" label="Email" changeHandler={this.changeHandler} value={this.state.email} required />
          <FormInput type="password" name="password" label="Password" changeHandler={this.changeHandler} value={this.state.password} required />

          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;