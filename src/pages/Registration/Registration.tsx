import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MyLayout from '../../Layouts/MyLayout/MyLayout';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import MyCard from '../../components/MyCard/MyCard';
import MyButton from '../../components/MyButton/MyButton'
import {useRegistrationMutation} from "../../authApi";
import {UPDATE_AUTH} from "../../reducers/authReducer";
import { RootState } from '../../store/store';
import CardRules from '../../components/CardRules/CardRules';
import { SET_ERROR } from '../../reducers/authReducer';

import "./Registation.css"
import { I18n } from 'react-redux-i18n';



const Regestration = () => {
  const navigate = useNavigate()
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const dispatch = useDispatch();
  const [registrete, {isLoading}] = useRegistrationMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [addParagrath, setAddParagrath] = useState(false);
  const [error, setError] = useState(0)

  const onSubmit = async () => {
    try {
      if(name!=="" && password!=="" && email!=="") {
        console.log(name);
        console.log(password);
        console.log(email);
        setAddParagrath(false)
      const data = await registrete({"name": name, "email":email, "password":password}).unwrap()
       navigate("/sign")}
    } catch (e:any) {
      setError(e.status)
      if(error===400){
        dispatch(SET_ERROR('Incorrect data'))}
        if(error===500){
          dispatch(SET_ERROR('Server is unavailable'))
        } else {
          dispatch(SET_ERROR('Error'))
        }  
      setName("");
      setEmail("")
      setPassword("")
      navigate("/registration") 
    }
  }

  return (
      <MyLayout>
        {isModalOpen && <CardRules/>}
        <MyCard className='card-sign'>
          <header className='title_card-sign'>
            <h1 className='title__card_sign'>{I18n.t("cards.card-regestration.title_card")}</h1>
          </header>
          <div className='content_card'>
          <form className='card__form'>
          <div className='form__input_name'>
              <label className='name__label' htmlFor='text'>{I18n.t("components.NameInput.label")}</label>
              <input className="name__input" type='text' value={name} onChange={(event)=>{setName(event.target.value)}} />
            </div>
            <div className='form__input_email'>
              <label className='email__label' htmlFor='email'>Email</label>
              <input className="email__input" type='email' value={email} onChange={(event)=>{setEmail(event.target.value)}} />
            </div>
            <div className='form__input_password'>
              <PasswordInput value={password} onChange={(event)=>{setPassword(event.target.value)}} />
            </div>
          </form>
          {error===400 && (name==="" && password==="" && email==="") &&  <p className='error-message'>{I18n.t("cards.error.400")}</p>}
          {error===500 && (name==="" && password==="" && email==="") && <p className='error-message'>{I18n.t("cards.error.500")}</p>}
          {error!==0 && (name==="" && password==="" && email==="")  && <p className='error-message'>{I18n.t("cards.error.error")}</p>}
          <Link to="" onClick={onSubmit}><MyButton type="primary" disabled={name==="" || password==="" || email===""} className='send-answer'>{I18n.t("cards.card-regestration.submit")}</MyButton> </Link>
          <p className='card__question'>Already have an account? <br/>
                          <Link to="/sign">Sign in</Link></p>
          </div>
        </MyCard>
      </MyLayout>
  );}


export default Regestration;