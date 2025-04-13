import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet /> {/* This renders the login/signup pages */}
    </div>
  );
};

export default AuthLayout;
