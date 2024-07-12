import React, { useEffect } from "react";

const Alert = ({ msg, type, showAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 1000);
    return () => clearInterval(timeout);
  }, [list]);
  return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
