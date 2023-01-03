import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import { connect } from 'react-redux'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectShowCart } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";
import { closeCartDropdown } from "../../redux/cart/cart-actions";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ scrolled }) => scrolled ? '#ffffffbd' : 'transparent'};

  .logo-container {
    height: 100%;
    width: 100px;
    padding: 15px;
  }

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;

    .option {
      padding: 10px 15px;
      cursor: pointer;
    }
  }
`;

const Header = ({ currentUser, showCart, toggleCartHidden }) => {
  const location = useLocation();
  const [headerBackground, setHeaderBackground] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      return setHeaderBackground(true);
    }
    return setHeaderBackground(false);
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
    <Wrapper scrolled={headerBackground}>
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
    </Wrapper>
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