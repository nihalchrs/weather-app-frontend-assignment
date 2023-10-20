import React from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import SessionOutModal from "./SessionOutModal";
import { useNavigate } from "react-router-dom";

const IsLoggedinHOC = (WrappedComponent) => {
  const HocComponent = ({ ...props }) => {
    const navigate = useNavigate();
    const { accessToken } = useSelector((state) => state.auth);
    const { isExpired } = useJwt(accessToken);
    if (isExpired) {
      navigate('/')
      return;
    } else {
      return <WrappedComponent {...props} isTokenExpired={isExpired} />;
    }
  };
  return HocComponent;
};

export default IsLoggedinHOC;
