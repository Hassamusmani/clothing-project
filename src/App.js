import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import { SignInAndSignUpPage } from './pages/signIn-and-signUp/signIn-and-signUp.component';
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user-selectors';
import CheckoutPage from './pages/checkoutPage/checkoutPage.component';
import CollectionPage from './pages/category/collection.component';
class App extends React.Component {
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(this.state));
        })
      } else this.props.setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const {currentUser} = this.props;
    console.log(currentUser);
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:collectionId' element={<CollectionPage />} />
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
