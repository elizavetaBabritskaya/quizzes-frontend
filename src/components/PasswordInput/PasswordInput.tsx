import React, {useState, useEffect, ChangeEventHandler } from "react";
import PropTypes from 'prop-types';


import './PasswordInput.css'
import { I18n } from "react-redux-i18n";

export type Props = {
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string
  classNameForInput?: string
}

const PasswordInput = ({className, onChange, value, classNameForInput}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const togglePassword = () => {
    setIsShown(!isShown);}

  return(
  <div className={`form__input_password ${className}`}>
    <label className="label__password" htmlFor='password'>{I18n.t("components.PasswordInput.label")}</label>
    <div className={`password__window ${classNameForInput}`}>
    <input className={`input__password `} value={value} onChange={onChange} type={isShown ? "text" : "password"} />
      {isShown && <div className="password__icon" onClick={togglePassword}></div>}
      {!isShown && <div className="password__iconIsShow" onClick={togglePassword}></div>}      
    </div>
    
  </div>
  )};


  export default PasswordInput;
