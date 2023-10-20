import React from "react";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SessionOutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout(false));
    navigate('/')
  };

  return (
    <>
      <section>
        <div className="">
          <div className="">
            <h3>Please sign in to access to this page.!</h3>
            <button onClick={handleLogout} type="button" className="btn">
              OK
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SessionOutModal;
