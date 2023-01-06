import React from "react";
import { CustomButton } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import { connect } from 'react-redux'
import { emailSignInStart, googleSignInStart } from "../../redux/user/user-actions";

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
    const { emailSignInStart } = this.props;
    emailSignInStart(email, password);
  }

  changeHandler = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  
  render() {
    const { googleSignInStart } = this.props;

    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form action="" onSubmit={this.submitHandler}>
          <FormInput type="email" name="email" label="Email" changeHandler={this.changeHandler} value={this.state.email} required />
          <FormInput type="password" name="password" label="Password" changeHandler={this.changeHandler} value={this.state.password} required />

          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
            <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign In With Google </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);