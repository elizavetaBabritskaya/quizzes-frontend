import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {RootState, useStoreDispatch} from "../../store/store";
import {useGetRulesQuery} from "../../serviceApi/ruleApi";
import MyLayout from "../../Layouts/MyLayout/MyLayout";
import MyButton from "../../components/MyButton/MyButton";
import MyCard from "../../components/MyCard/MyCard";
import {useJoinGameMutation, useStartGameMutation} from "../../serviceApi/questionApi";
import {UPDATE_CURRENT_QUESTION_ID} from "../../reducers/game";
import CardRules from "../../components/CardRules/CardRules";

import "./Start.css";
import { I18n } from "react-redux-i18n";
import { useLazyGetRoomIdQuery } from "../../serviceApi/roomsApi";
import { useLazyWhoAmIQuery } from "../../authApi";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Start = () => {
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const currentRoom = useSelector((state: RootState) => state.rooms.currentRoom);
  const {data, isLoading} = useGetRulesQuery("");
  const [joinRoom, {isLoading: loadingJoin}] = useJoinGameMutation();
  const [whoAmI, {isLoading:loadingWhoIAm}] = useLazyWhoAmIQuery();
  const [room, {isLoading: loadingGetRoom }] = useLazyGetRoomIdQuery();
  
  const [startGame] = useStartGameMutation();
  

  const getFirstQuestion = async () => {
    const whoAmIData = await whoAmI("").unwrap();
     const roomData = await room(currentRoom).unwrap();
    if(whoAmIData && roomData && whoAmIData.playerId===roomData.ownerId) {
      console.log("if get first question")
      const data = await startGame(currentRoom).unwrap()
        dispatch(UPDATE_CURRENT_QUESTION_ID(data.questionId)) 
    } else {
      const joinGame = await joinRoom(currentRoom).unwrap();
    }
          
  }

  useEffect(() => {
    console.log("use effect start")
    console.log(room);
  console.log(whoAmI);
    getFirstQuestion()
  }, []);
  return (
    <MyLayout>
      {isModalOpen && <CardRules/>}
      <MyCard className="card_start">
        <header className="start_card_header">
          <h1 className="title_card">{I18n.t("cards.card-rules.title_card")}</h1>
        </header>
        <div className="content_card">
          {isLoading && <Spin indicator={antIcon} />}
          {!isLoading && <p className="text_card">{data && data.rules}</p>}
        </div>
        <Link className="send_ans" to="/game">
        {I18n.t("cards.card-rules.start")}
        </Link>
      </MyCard>
    </MyLayout>
  );
};

export default Start;
