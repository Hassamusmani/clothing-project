import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import { connect } from 'react-redux'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectShowCart } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";
import { closeCartDropdown } from "../../redux/cart/cart-actions";

const Header = ({ currentUser, showCart, toggleCartHidden }) => {
  const location = useLocation();
  const [headerBackground, setHeaderBackground] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setHeaderBackground(true);
    }
    else {
      setHeaderBackground(false);
    }
  }

  useEffect(() => {
    if (showCart) toggleCartHidden();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <div className={`header ${headerBackground ? 'header-scroll' : ''}`}>
      <Link className="logo-container" to={'/'}>
        <Logo />
      </Link>
      <div className="options">
        <Link className="option" to={'/'}>
          HOME
        </Link>
        <Link className="option" to={'/shop'}>
          SHOP
        </Link>
        {
          currentUser ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
            : <Link className="option" to={'/signin'}>SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {showCart ? <CartDropdown /> : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  showCart: selectShowCart
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(closeCartDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);