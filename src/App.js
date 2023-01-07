import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import { SignInAndSignUpPage } from './pages/signIn-and-signUp/signIn-and-signUp.component';
import { connect } from 'react-redux'
import { checkUserSession, setCurrentUser } from './redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user-selectors';
import CheckoutPage from './pages/checkoutPage/checkoutPage.component';
import { GlobalStyles } from './global.styles';
class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const {currentUser} = this.props;
    return (
      <div>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route path='/signin' element={currentUser ? <Navigate to='/' /> : <SignInAndSignUpPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
