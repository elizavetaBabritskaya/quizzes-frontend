import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout} from "antd";
import MyButton from "../MyButton/MyButton"
import {UPDATE_MODAL} from "../../reducers/isModalOpen"
import { UPDATE_AUTH } from "../../reducers/authReducer";
import { Translate, Localize, I18n } from 'react-redux-i18n';
import "./MyHeader.css";

const logo = require('./images/logo.png');
const enter = require( './images/Logout_button.png')
import './MyHeader.css';
import { RootState } from "../../store/store";
import CardRules from "../CardRules/CardRules";

const { Header } = Layout;

const MyHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showingModalWindow = () => {
    dispatch(UPDATE_MODAL(true));
  };

  const exit = async()=> {
    localStorage.clear();
    navigate("/sign")
    dispatch(UPDATE_AUTH(false))
  }
  return (
    
<Header className='layout__header' style={{background: 'white'}} >
<a className="Header-logo" href="#">
  <img src={logo} className="logo-img" alt="logo" />
</a>
<div className='buttons'>
  <MyButton type="text" block={false} disabled={false} className='header__button' onChange={showingModalWindow}>{I18n.t("layout.header.game-rules")}</MyButton>
  <Link to="/sign" onClick={exit}><MyButton type="text" block={false} disabled={false} onChange={exit} className='buttons__logout'> Vevo  
 <img src={enter}/></MyButton></Link>

</div>

</Header>
  );
};

export default MyHeader;





