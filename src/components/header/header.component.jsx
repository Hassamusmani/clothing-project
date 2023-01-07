import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectShowCart } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";
import { closeCartDropdown } from "../../redux/cart/cart-actions";
import styled from "styled-components";
import { signOutStart } from "../../redux/user/user-actions";

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

  @media screen and (max-width: 800px) {
    height: 80px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .logo-container {
    height: 100%;
    width: 100px;
    padding: 15px;

    @media screen and (max-width: 800px) {
      width: 50px;
      padding: 0;
    }
  }

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;

    @media screen and (max-width: 800px) {
      width: 80%;
      font-size: 16px;
    }
    .option {
      padding: 10px 15px;
      cursor: pointer;

      &.active {
        border-bottom: 5px solid #000000b3;

        @media screen and (max-width: 800px) {
          border-bottom: 2px solid #000000b3;
        }
      }

      @media screen and (max-width: 800px) {
        padding: 5px 7px;
      }
    }
  }
`;

const Header = ({ currentUser, showCart, toggleCartHidden, signOutStart }) => {
  const location = useLocation();
  const [headerBackground, setHeaderBackground] = useState(false);

  const listenScrollEvent = useCallback(() => {
    if (window.scrollY > 50) {
      return setHeaderBackground(true);
    }
    return setHeaderBackground(false);
  }, []);

  const handleToggleOnLocationCahnge = useCallback(() => {
    if (showCart) toggleCartHidden();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  useEffect(() => {
    handleToggleOnLocationCahnge();
  }, [handleToggleOnLocationCahnge]);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, [listenScrollEvent]);

  return (
    <Wrapper scrolled={headerBackground}>
      <Link className="logo-container" to={'/'}>
        <Logo />
      </Link>
      <div className="options">
        <NavLink className={({ isActive }) => isActive ? "active option" : "option" } to={'/'}>
          HOME
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? "active option" : "option"} to={'/shop'}>
          SHOP
        </NavLink>
        {
          currentUser ? <div className="option" onClick={signOutStart}>SIGN OUT</div>
            : <NavLink className={({ isActive }) => isActive ? "active option" : "option"} to={'/signin'}>SIGN IN</NavLink>
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
  toggleCartHidden: () => dispatch(closeCartDropdown()),
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);