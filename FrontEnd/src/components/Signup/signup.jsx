import React, { useState } from "react";
import style from "./signup.module.css";

function AuthForm() {
  const [isRightExist, setisRightExist] = useState(true);
  const [userName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={`${style.container} ${isRightExist ? style.right_panel_active : ""}`}>
      <div className="row">
        {/* Sign Up */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className={`${style.container__form} ${style.container__signup}`}>
            <form className={`${style.form}`} onSubmit={(e) => e.preventDefault()}>
              <h2 className={`${style.form__title}`}>Sign Up</h2>
              <div className="form-group">
                <input
                  type="text"
                  value={userName}
                  placeholder="User Name"
                  className={`${style.input} form-control`}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  value={Email}
                  placeholder="Email"
                  className={`${style.input} form-control`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className={`${style.input} form-control`}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <button className={`bg-white text-[#3D2B1F] btn px-4 mt-5 py-2 rounded-full font-bold hover:bg-gray-300 transition`} type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Sign In */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className={`${style.container__form} ${style.container__signin}`}>
            <form className={`${style.form}`} onSubmit={(e) => e.preventDefault()}>
              <h2 className={`${style.form__title}`}>Sign In</h2>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${style.input} form-control`}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${style.input} form-control`}
                  required
                />
              </div>
              <a href="/" className={`${style.link}`}>
                Forgot your password?
              </a>
              <button className={`bg-white text-[#3D2B1F] btn px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition`} type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className={`${style.container__overlay}`}>
        <div className={`${style.overlay}`}>
          <div className={`${style.overlay__panel} ${style.overlay__left}`}>
            <button className={`bg-white text-[#3D2B1F] btn px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition`} id="signIn" onClick={() => setisRightExist(false)}>
              Sign In
            </button>
          </div>
          <div className={`${style.overlay__panel} ${style.overlay__right}`}>
            <button className={`bg-white text-[#3D2B1F] btn px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition`} id="signUp" onClick={() => setisRightExist(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;