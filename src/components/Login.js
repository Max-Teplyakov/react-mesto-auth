import "./Authorization.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as auth from "../utils/auth";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import img from "../images/successful.png";
import img2 from "../images/notsuccessful.png";

function Login({ handleLogin, isInfoTooltipPopupOpen, onClose }) {
  const [formValue, setFormValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .login(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          handleLogin();
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header text="Регистрация" link="sign-up" />

      <div className="authorization">
        <h1 className="authorization__form__title">Вход</h1>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="authorization__email"
            id="email-login-input"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="authorization__password"
            placeholder="Пароль"
            id="login-password-input"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="authorization__btn-registration">
            Войти
          </button>
        </form>
      </div>
      {isInfoTooltipPopupOpen ? (
        <InfoTooltip
          text="Вы успешно зарегистрировались!"
          img={img}
          onClose={onClose}
          isInfoTooltipPopupOpen={isInfoTooltipPopupOpen}
        />
      ) : (
        <InfoTooltip
          text="Что-то пошло не так!
        Попробуйте ещё раз."
          img={img2}
          onClose={onClose}
          isInfoTooltipPopupOpen={isInfoTooltipPopupOpen}
        />
      )}
    </>
  );
}

export default Login;
