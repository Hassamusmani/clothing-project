import React from "react";
import styled from "styled-components";

const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  &.google-sign-in {
    background-color: #4285f2;
    color: #fff;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
  }

  &.inverted {
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;

export const CustomButton = ({children, inverted, isGoogleSignIn,...otherProps}) => (
  <CustomButtonContainer 
    className={`${isGoogleSignIn ? "google-sign-in" : ""} ${inverted ? "inverted" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </CustomButtonContainer>
);