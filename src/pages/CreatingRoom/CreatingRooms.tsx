import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import MyLayout from "../../Layouts/MyLayout/MyLayout";
import MyButton from "../../components/MyButton/MyButton";
import MyCard from "../../components/MyCard/MyCard";
import {useAddRoomMutation} from "../../serviceApi/roomsApi";
import {RootState, useStoreDispatch} from "../../store/store";
import CardRules from "../../components/CardRules/CardRules";


import './CreatingRooms.css'
import { I18n } from "react-redux-i18n";

const CreatingRoom = () => {
  const [nameRoom, setNameRoom] = useState("");
  const [addRoom] = useAddRoomMutation();
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNameRoom(event.target.value)
  }

  const  handleCreateRoom = async () => {
    const playerId = localStorage.getItem("playerId");
    if(nameRoom && playerId) {
      await addRoom({"roomName": nameRoom})
    }
    
  }

  return (
    <MyLayout>
      {isModalOpen && <CardRules/>}
      <MyCard className="card-create-room">
        <header className="start_card_header">
          <h1 className="title_card">{I18n.t("cards.card-createRoom.title_card")}</h1>
        </header>
        <div className="content_card">
          <div className="for_input">
            <label className="room__label" htmlFor="text">
              {I18n.t("components.RoomNameInput.label")}
            </label>
            <input className="room__input" type="text" onChange={onChange}/>
          </div>
          <Link to='/' className="send-answer" onClick={handleCreateRoom}>{I18n.t("cards.card-createRoom.submit")}</Link>
        </div>
      </MyCard>
    </MyLayout>
  );
};

export default CreatingRoom;
