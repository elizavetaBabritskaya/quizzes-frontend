import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MyLayout from '../../Layouts/MyLayout/MyLayout';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import MyCard from '../../components/MyCard/MyCard';
import MyButton from '../../components/MyButton/MyButton'
import {useLoginMutation} from "../../authApi";
import {SET_ERROR, UPDATE_AUTH} from "../../reducers/authReducer";
import { RootState } from '../../store/store';
import CardRules from '../../components/CardRules/CardRules';
import { ErrorAuth } from '../../reducers/authReducer';

import './Sign.css';
import { I18n } from 'react-redux-i18n';



const Sign = () => {
  const navigate = useNavigate();

  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0)

  const onSubmit = async () => {
    try {
      const data = await login({email, password}).unwrap()
      localStorage.setItem("token", data.accessToken);
      dispatch(UPDATE_AUTH(true))
      return navigate("/")
    } catch (e:any) {
      setError(e.status)
      if(error===400){
      dispatch(SET_ERROR('Incorrect data'))}
      if(error===404){
        dispatch(SET_ERROR('Invalid login or password'))}
      if(error===500){
        dispatch(SET_ERROR('Server is unavailable'))
      } else {
        dispatch(SET_ERROR('Error'))
      }  
      
      setEmail("");
      setPassword("")
    }
  }

  return (
      <MyLayout>
        {isModalOpen && <CardRules/>}
        <MyCard className='card-sign'>
          <header className='title_card-sign'>
            <h1 className='title__card_sign'>{I18n.t("cards.card-sign.title_card")}</h1>
          </header>
          <div className='content_card'>
          <form className='card__form'>
            <div className='form__input_email'>
              <label className='email__label' htmlFor='email'>{I18n.t("components.EmailInput.label")}</label>
              <input className={`${error!==0 && (email==="" && password==="") ? "input-error": ""} email__input`} value={email} type='email' onChange={(event)=>{setEmail(event.target.value)}} />
            </div>
            <div className='form__input_password'>
              <PasswordInput classNameForInput={`${error!==0 && (email==="" && password==="") ? "input-error" : ""}`} value={password} onChange={(event)=>{setPassword(event.target.value)}} />
            </div>
          </form>
          {error===400 && (email==="" && password==="") && <p className='error-message'>{I18n.t("cards.error.400")}</p>}
          {error===404 && (email==="" && password==="") &&  <p className='error-message'>{I18n.t("cards.error.404")}</p>}
          {error===500 && (email==="" && password==="") && <p className='error-message'>{I18n.t("cards.error.500")}</p>}
          {error!==0 && (email==="" && password==="") && <p className='error-message'>{I18n.t("cards.error.error")}</p>}
          <Link to='' type="primary" onClick={onSubmit} ><MyButton className='send-answer'>{I18n.t("cards.card-sign.submit")}</MyButton> </Link>
          <p className='card__question'>{I18n.t("cards.card-sign.isRegist")}</p><br/>
          <Link to="/registration" className='card__link'>{I18n.t("cards.card-sign.linkRegist")}</Link>
          </div>
        </MyCard>
      </MyLayout>
  );}


export default Sign;
