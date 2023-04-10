import React, { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "bootstrap-4-react/lib/components";
import { isLoggedIn, logout } from "../../firebase";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(isLoggedIn);
  const location = useLocation();

  const handleClick = () => {
    setUser(!user);
    logout();
  };

  return (
    <>
      <div className={styles.header}>
        Header
        <div className={styles.btnWrapper}>
          {isLoggedIn ? (
            <Button primary type="button" onClick={handleClick}>
              Log out
            </Button>
          ) : (
            <>
              <Link style={{ color: "#fff" }} to="/">
                <Button primary type="button">
                  Sign up
                </Button>
              </Link>
              <Link style={{ color: "#fff" }} to="/login">
                <Button primary type="button">
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
      {!user && location.pathname === "/user" && (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Header;
