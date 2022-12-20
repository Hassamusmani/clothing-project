import React from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
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

  submitHandler = async e => {
    e.preventDefault();
    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      console.log(error)
    }
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
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;