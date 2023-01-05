import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const WithSpinner = WrappedComponent => {
  const spinner = ({isLoading, ...otherProps}) => {
    return isLoading ? (
      <div className="loading">
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
      </div>
    ) : (<WrappedComponent {...otherProps} />);
  }
  return spinner;
 };

export default WithSpinner;