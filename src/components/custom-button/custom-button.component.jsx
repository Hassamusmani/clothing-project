import React from "react";
import './custom-button.styles.scss';

export const CustomButton = ({children, inverted, isGoogleSignIn,...otherProps}) => (
  <button 
    className={`${isGoogleSignIn ? "google-sign-in" : ""} ${inverted ? "inverted" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);