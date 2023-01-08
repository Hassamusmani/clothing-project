import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner = WrappedComponent => {
  const spinner = ({isLoading, ...otherProps}) => {
    return isLoading ? (
      <div className="loading">
        <Spinner />
      </div>
    ) : (<WrappedComponent {...otherProps} />);
  }
  return spinner;
 };

export default WithSpinner;