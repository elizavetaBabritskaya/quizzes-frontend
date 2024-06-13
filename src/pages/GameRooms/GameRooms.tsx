import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {v4 as uuidv4} from 'uuid';
import MyLayout from "../../Layouts/MyLayout/MyLayout";
import MyButton from "../../components/MyButton/MyButton";
import MyCard from "../../components/MyCard/MyCard";
import CardRules from "../../components/CardRules/CardRules";

import {RootState, useStoreDispatch} from "../../store/store";
import {UPDATE_CURRENT_ROOM} from "../../reducers/rooms";
import {useGetRoomsQuery} from "../../serviceApi/roomsApi";

import "./GameRooms.css"
import { I18n } from "react-redux-i18n";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export type RoomType = {
  roomName: string;
  roomId: string;
}
const GameRooms = () => {


  const dispatch = useStoreDispatch();
  const currentRoom = useSelector((state: RootState) => state.rooms.currentRoom);

  const [disabled, setDisabled] = useState(true);

  const {data: listRooms = [], isLoading} = useGetRoomsQuery("", {
    pollingInterval: 3000,
  });



  const onClick = async (value:string) => {
    if (currentRoom !== value) {
      dispatch(UPDATE_CURRENT_ROOM(value))
      setDisabled(false)
    } else {
      setDisabled(true)
      dispatch(UPDATE_CURRENT_ROOM(""))
    }
  };
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);

  const getPlayerId = () => {
    if(!localStorage.getItem("playerId")){
      localStorage.setItem(
        "playerId",uuidv4());
    }
    return localStorage.getItem("playerId");
  }

  const playerId = getPlayerId();


 
  return (
    <MyLayout>
      {isModalOpen && <CardRules/>}
      <MyCard className="card__rooms">
        <header className="start_card_header">
          <h1 className="title_card">{I18n.t("cards.card-gameRooms.title_card")}</h1>
        </header>
        <div className="content_card">
          <p className="content__text">{I18n.t("cards.card-gameRooms.join")} <Link to="./create_room">{I18n.t("cards.card-gameRooms.link")} </Link></p>
          <div className="group_rooms">
          {isLoading && <Spin indicator={antIcon} />}
          {!isLoading && listRooms.map((rooms:RoomType, i:number) => {return<Link to='/start' onClick={()=>onClick(rooms.roomId)} key={i} type="primary" className="button__rooms">{rooms.roomName}</Link>})}
          </div>
        </div>
      </MyCard>
    </MyLayout>
  );
};

export default GameRooms;
