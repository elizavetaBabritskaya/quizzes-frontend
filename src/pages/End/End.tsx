import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyLayout from "../../Layouts/MyLayout/MyLayout";
import MyButton from "../../components/MyButton/MyButton";
import MyCard from "../../components/MyCard/MyCard";
import CardRules from "../../components/CardRules/CardRules";
import {END_GAME} from "../../reducers/game";
import {NEW_GAME_IN_NEW_ROOM} from "../../reducers/rooms";
import { RootState } from "../../store/store";
import { useDeleteRoomMutation, useLazyGetRoomIdQuery, useLeaveRoomMutation } from "../../serviceApi/roomsApi";
import { useLazyWhoAmIQuery } from "../../authApi";

import "./End.css";
import { I18n } from "react-redux-i18n";

const End = () => {
  const dispatch = useDispatch();
  const [resultRound, setResultRound] = useState("");
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const currentRoom = useSelector((store: RootState) => store.rooms.currentRoom)
  const [whoAmI, {isLoading:loadingWhoIAm}] = useLazyWhoAmIQuery();
  const [room, {isLoading: loadingGetRoom }] = useLazyGetRoomIdQuery();
  const [end, {isLoading:loadingend}] = useDeleteRoomMutation();
  const [leave, {isLoading: loagingLeave}] = useLeaveRoomMutation();

  const endGame = async () => {
    const whoAmIData = await whoAmI("").unwrap();
     const roomData = await room(currentRoom).unwrap();
    if(whoAmIData && roomData && whoAmIData.playerId===roomData.ownerId) {
      const data = await end(currentRoom).unwrap();
    } else {
      const data = await leave("").unwrap();
    }
    dispatch(END_GAME())
    dispatch(NEW_GAME_IN_NEW_ROOM())
}
  useEffect(()=>{
    const point = localStorage.getItem("point")
    if(point) {
      setResultRound(point)
    }
    
  },[])

  return (
  <MyLayout>
    {isModalOpen && <CardRules/>}
    <MyCard className="card_end">
      <header className="card__header">
        <h1 className="card__title_header">{I18n.t("cards.card-end.title_card")}</h1>
      </header>
      <div className="content__card">
        {resultRound && <p className="point-game">Score: {resultRound} points</p>}
        <Link to="/" type="primary" className="button_again send-answer" onClick={endGame}>
         {I18n.t("cards.card-end.end")}
        </Link>
      </div>
    </MyCard>
  </MyLayout>
);}


export default End;
