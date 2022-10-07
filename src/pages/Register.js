import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers.js";
import { userLogin } from "../store/actions";
import "../css/login.css";
import harvest1 from "../harvest-1.png";
import DetailPage from "./DetailPage.js";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
  const [loginPwType, setLoginPwType] = useState("password");
  const [inputVal, setInputVal] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errorGlobal, setErrorGlobal] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    // if (localStorage.getItem('access_token')) navigate('/');
  });

  const pwVisibilitty = () => {
    if (loginPwType === "password") {
      setLoginPwType("text");
    } else {
      setLoginPwType("password");
    }
  };

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    setInputVal({
      ...inputVal,
      [name]: value.toString(),
    });
  };

  const clearError = () => {
    const x = document.querySelectorAll("#loginPage")[0];
    const y = document.createElement("div");
    const textNode = document.createTextNode("Hello World");
    y.appendChild(textNode);
    x.appendChild(DetailPage());

    // x.appendChild('<div>xxxxxxxxx</div>')
    // setErrorGlobal('');
    // setErrorEmail('');
    // setErrorPassword('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(inputVal);
    // try {
    //   e.preventDefault();
    //   const response = await dispatch(userLogin(inputVal));
    //   const responseJSON = await response.json();

    //   if (response.status === 200) {
    //     navigate('/');
    //     localStorage.setItem('access_token', responseJSON.access_token);
    //     localStorage.setItem('user', JSON.stringify(responseJSON.user));
    //     Toast.fire({ icon: 'success', title: 'Product has been deleted successfully..' });
    //   } else {
    //     if (responseJSON.message === 'Invalid email or password') {
    //       setErrorGlobal(responseJSON.message);
    //     }

    //     if (responseJSON.errors) {
    //       responseJSON.errors.forEach(v => {
    //         if (v.path === 'email' && errorEmail === '') setErrorEmail(v.message);
    //         if (v.path === 'password' && errorPassword === '') setErrorPassword(v.message);
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <section id="loginPage">
      <div className="container">
        <div className="login-page-wrapper">
          <div id="login-page">
            <h4 className="login-title">
              <strong>Buat akun baru kamu</strong>
            </h4>
            <div className="login-page-form">
              <form onSubmit={handleRegister}>
                {/* Fistname */}
                {errorFirstName && (
                  <div className="invalid-validation">{errorFirstName}</div>
                )}
                <div className="form-floating">
                  <input
                    type="text"
                    name="fName"
                    id="floatingFirstNameLoginPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.fName}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingEmailLoginPage">Nama depan</label>
                </div>
                {/* End Firstname */}
                {/* Lastname */}
                {errorLastName && (
                  <div className="invalid-validation">{errorLastName}</div>
                )}
                <div className="form-floating">
                  <input
                    type="text"
                    name="lName"
                    id="floatingFirstNameLoginPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.lName}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingEmailLoginPage">Nama belakang</label>
                </div>
                {/* End lastname */}
                {/* Phone Number */}
                {errorPhoneNumber && (
                  <div className="invalid-validation">{errorPhoneNumber}</div>
                )}
                <div className="form-floating">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="floatingFirstNameLoginPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.phoneNumber}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingEmailLoginPage">Phone Number</label>
                </div>
                {/* End Phone Number */}
                {/* Email */}
                {errorEmail && (
                  <div className="invalid-validation">{errorEmail}</div>
                )}
                {errorEmail && (
                  <div className="invalid-validation">{errorEmail}</div>
                )}
                {errorGlobal && (
                  <div className="invalid-validation global-error-validation">
                    {errorGlobal}
                  </div>
                )}
                <div className="form-floating">
                  <input
                    type="text"
                    name="email"
                    id="floatingEmailLoginPage"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={inputVal.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingEmailLoginPage">Email</label>
                </div>
                {errorEmail && (
                  <div className="invalid-validation">{errorEmail}</div>
                )}
                {/* End Email */}
                {/* Password */}
                <div className="form-floating">
                  <input
                    type={loginPwType}
                    name="password"
                    id="floatingPasswordLoginPage"
                    className="form-control"
                    placeholder="Password"
                    value={inputVal.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPasswordLoginPage">Password</label>
                  <div
                    className="password-visibility"
                    onClick={() => pwVisibilitty()}
                  >
                    {loginPwType === "password" ? (
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
                <div className="d-flex">
                  <span
                    class="material-icons-sharp"
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
              <small>Sudah punya akun, silahkan <Link to="/login">login</Link></small>
            </div>
          </div>
          <div
            className="login-image"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/31/04/11/tomato-2556426__480.jpg')`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
