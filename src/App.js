import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/header.component';
import { connect } from 'react-redux'
import { checkUserSession, setCurrentUser } from './redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user-selectors';
import { GlobalStyles } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shoppage/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/signIn-and-signUp/signIn-and-signUp.component'));
const CheckoutPage = lazy(() => import('./pages/checkoutPage/checkoutPage.component'));

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={(
            <Suspense fallback={<Spinner />}><HomePage /></Suspense>
          )} />
          <Route path='/shop/*' element={(
            <Suspense fallback={<Spinner />}><ShopPage /></Suspense>
          )} />
          <Route path='/signin' element={currentUser ? <Navigate to='/' /> : (
            <Suspense fallback={<Spinner />}><SignInAndSignUpPage /></Suspense>
          )} />
          <Route path='/checkout' element={(
            <Suspense fallback={<Spinner />}><CheckoutPage /></Suspense>
          )} />
        </Routes>
      </ErrorBoundary>
    </div>
  );    
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
