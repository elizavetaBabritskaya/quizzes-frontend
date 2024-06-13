import React, { useEffect } from "react";
import { Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {UPDATE_MODAL} from "../../reducers/isModalOpen";
import { LoadingOutlined } from "@ant-design/icons";
import {RootState, useStoreDispatch} from "../../store/store";
import {useGetRulesQuery} from "../../serviceApi/ruleApi";
import { Translate, Localize, I18n } from 'react-redux-i18n';

import "./CardRules.css";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const CardRules = () => {
  const dispatch = useStoreDispatch();

  const isShow = useSelector((state: RootState) => state.isModalOpen.openModal);

  const {data, isLoading} = useGetRulesQuery("");

  const closeModal = ():boolean => {
    dispatch(UPDATE_MODAL(false));
    return false;
  };
  return (
    <>
      <Modal
        bodyStyle={{
          padding: "75px 85px 120px",
          maxWidth: "1041px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="modal "
        open={isShow}
        width="1041px"
        centered
        footer={null}
        onCancel={closeModal}
      >
        <header className="start_card__header">
          <h1 className="title_card">{I18n.t("cards.card-rules.title_card")}</h1>
        </header>
        <div className="content_card">
          {isLoading && <Spin indicator={antIcon} />}
          {!isLoading && <p className="text_card">{data && data.rules}</p>}
        </div>
      </Modal>
    </>
  );
};
export default CardRules;
