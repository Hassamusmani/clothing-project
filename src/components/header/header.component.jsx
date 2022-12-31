import React, { useEffect } from "react";
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

  useEffect(() => {
    if (showCart) toggleCartHidden();
  }, [location, toggleCartHidden, showCart]);

  return (
    <div className="header">
      <Link className="logo-container" to={'/'}>
        <Logo />
      </Link>
      <div className="options">
        <Link className="option" to={'/shop'}>
          SHOP
        </Link>
        <Link className="option" to={'/contact'}>
          CONTACT
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