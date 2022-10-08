import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers";
import { userRegister } from "../store/actions";
import "../css/login.css";

import { Link } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
  const [registerPwType, setRegisterPwType] = useState("password");
  const [inputVal, setInputVal] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [errorfName, setErrorfName] = useState("");
  const [errorlName, setErrorlName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const pwVisibilitty = () => {
    if (registerPwType === "password") {
      setRegisterPwType("text");
    } else {
      setRegisterPwType("password");
    }
  };

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    setInputVal({ ...inputVal, [name]: value, });
  };

  const clearError = () => {
    setErrorfName('');
    setErrorlName('');
    setErrorEmail('');
    setErrorPassword('');
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(userRegister(inputVal));
      const responseJSON = await response.json();

      if (response.status === 201) {
        Toast.fire({ icon: 'success', title: 'Account has been successfully created..' });
        navigate('/login');
      } else {
        console.log(responseJSON);
        if (responseJSON.errors) {
          responseJSON.errors.reverse().forEach(v => {
            if (v.path === 'fName' && errorfName === '') setErrorfName(v.message);
            if (v.path === 'lName' && errorlName === '') setErrorlName(v.message);
            if (v.path === 'email' && errorEmail === '') setErrorEmail(v.message);
            if (v.path === 'password' && errorPassword === '') setErrorPassword(v.message);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="registerPage">
      <div className="container">
        <div className="register-page-wrapper">
          <div id="register-page">
            <h3 className="login-title">Register</h3>
            <div className="register-page-form">
              <form onSubmit={handleRegister}>
                {/* Fistname */}
                <div className="form-floating">
                  <input
                    type="text"
                    name="fName"
                    id="floatingfNameRegisterPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.fName}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingfNameRegisterPage">First Name</label>
                </div>
                {errorfName && (
                  <div className="invalid-validation">{errorfName}</div>
                )}
                {/* End Firstname */}
                {/* Lastname */}
                <div className="form-floating">
                  <input
                    type="text"
                    name="lName"
                    id="floatinglNameRegisterPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.lName}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatinglNameRegisterPage">Last Name</label>
                </div>
                {errorlName && (
                  <div className="invalid-validation">{errorlName}</div>
                )}
                {/* End lastname */}
                {/* Email */}
                <div className="form-floating">
                  <input
                    type="text"
                    name="email"
                    id="floatingEmailRegisterPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingEmailRegisterPage">Email</label>
                </div>
                {errorEmail && (
                  <div className="invalid-validation">{errorEmail}</div>
                )}
                {/* End Email */}
                {/* Password */}
                <div className="form-floating">
                  <input
                    type={registerPwType}
                    name="password"
                    id="floatingPasswordRegisterPage"
                    className="form-control"
                    placeholder="Password"
                    value={inputVal.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPasswordRegisterPage">Password</label>
                  <div
                    className="password-visibility"
                    onClick={() => pwVisibilitty()}
                  >
                    {registerPwType === "password" ? (
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    ) : (
                      <span className="material-symbols-outlined">
                        visibility_off
                      </span>
                    )}
                  </div>
                </div>
                {errorPassword && (
                  <div className="invalid-validation">{errorPassword}</div>
                )}
                {/* End Password */}
                <div className="d-flex mt-2">
                  <span
                    className="material-icons-sharp"
                    style={{
                      color: "rgb(185 185 185)",
                      fontSize: "20px",
                      marginRight: "6px",
                    }}
                  >
                    https
                  </span>
                  <p className="privacy-policy">
                    Data kamu dilindungi dan tidak dibagikan, dan sudah
                    mengikuti syarat dan ketentuan.
                  </p>
                </div>
                <button className="btn custom-btn-1" onClick={clearError}>
                  {isLoadingSubmit ? (
                    <>
                      <span
                        className="spinner-border text-light sr-only"
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid #fff",
                          borderRightColor: "transparent",
                        }}
                      ></span>
                      <span style={{ marginLeft: "10px" }}>Loading...</span>
                    </>
                  ) : (
                    "Daftar"
                  )}
                </button>
              </form>
              <small className="login-link">Sudah punya akun, silahkan <Link to="/login">login</Link></small>
            </div>
          </div>
          <div
            className="register-image"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/31/04/11/tomato-2556426__480.jpg')`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
