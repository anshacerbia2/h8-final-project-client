import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../helpers';
import { userLogin } from '../store/actions';
import '../css/login.css';
import harvest1 from '../harvest-1.png';
import DetailPage from './DetailPage.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
  const [loginPwType, setLoginPwType] = useState('password');
  const [inputVal, setInputVal] = useState({
    email: '',
    password: ''
  });
  const [errorGlobal, setErrorGlobal] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    // if (localStorage.getItem('access_token')) navigate('/');
  });

  const pwVisibilitty = () => {
    if (loginPwType === 'password') {
      setLoginPwType('text');
    } else {
      setLoginPwType('password');
    }
  }

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    setInputVal({ ...inputVal, [name]: value.toString() });
  }

  const clearError = () => {
    const x = document.querySelectorAll('#loginPage')[0];
    const y = document.createElement('div');
    const textNode = document.createTextNode("Hello World");
    y.appendChild(textNode)
    x.appendChild(DetailPage())

    // x.appendChild('<div>xxxxxxxxx</div>')
    // setErrorGlobal('');
    // setErrorEmail('');
    // setErrorPassword('');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
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
  }

  return (
    <section id="loginPage">
      <div className="container">
        <div className="login-page-wrapper">
          <div className="login-image" style={{
            backgroundImage: `url(${harvest1})`
          }}>
          </div>
          <div id="login-page">
            <h3 className="login-title">Login</h3>
            <div className="login-page-form">
              <form onSubmit={handleLogin}>
                {
                  errorGlobal && <div className="invalid-validation global-error-validation">{errorGlobal}</div>
                }
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
                {
                  errorEmail && <div className="invalid-validation">{errorEmail}</div>
                }
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
                  <div className="password-visibility" onClick={(() => pwVisibilitty())}>
                    {
                      loginPwType === 'password' ?
                        <span className="material-symbols-outlined">visibility</span>
                        :
                        <span className="material-symbols-outlined">visibility_off</span>
                    }
                  </div>
                </div>
                {
                  errorPassword && <div className="invalid-validation">{errorPassword}</div>
                }
                <div className="d-flex">
                  <span class="material-icons-sharp" style={{ color: 'rgb(185 185 185)', fontSize: '20px', marginRight: '6px' }}>
                    https
                  </span>
                  <p className="privacy-policy">Data kamu dilindungi dan tidak dibagikan, dan sudah mengikuti Terms and conditions.</p>
                </div>
                <button className="btn custom-btn-1" onClick={clearError}>
                  {
                    isLoadingSubmit ?
                      <>
                        <span className="spinner-border text-light sr-only" style={{ width: '20px', height: '20px', border: '2px solid #fff', borderRightColor: 'transparent' }}></span>
                        <span style={{ marginLeft: '10px' }}>Loading...</span>
                      </>
                      :
                      'Login'
                  }
                </button>
              </form>
            </div>
          </div>
        </div >

      </div>
    </section>
  )
}

