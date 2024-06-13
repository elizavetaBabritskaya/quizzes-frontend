import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MyLayout from "../../Layouts/MyLayout/MyLayout";
import MyButton from "../../components/MyButton/MyButton";
import MyCard from "../../components/MyCard/MyCard";
import {PlayerScore, useGetGameQuery, useStartGameMutation} from "../../serviceApi/questionApi";
import {RootState, useStoreDispatch} from "../../store/store";
import {
  ANSWER_QUESTION_ACTION, GET_FIRST_QUESTION_ACTION,
  UPDATE_ANSWER, UPDATE_ANSWERS, UPDATE_CORRECT_ANSWER, UPDATE_NUMBER, UPDATE_TEXT, UPDATE_CURRENT_QUESTION_ID
} from "../../reducers/game";


import {useAnswerQuestionMutation, useLazyGetQuestionByIdQuery} from "../../serviceApi/questionApi";

export type Answer = {
  answerText: string;
  answerId: string;
}


import "./Game.css";
import CardRules from "../../components/CardRules/CardRules";
import Timer from "../../components/Timer/Timer";
// import { useDeleteRoomMutation } from "../../serviceApi/roomsApi";

const Game = () => {
  const isModalOpen = useSelector((store: RootState) => store.isModalOpen.openModal);
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const [startGame] = useStartGameMutation();
  const answer = useSelector((state: RootState) => state.game.answer);
  const correctAnswer = useSelector((state: RootState) => state.game.correctAnswer);
  const number = useSelector((state: RootState) => state.game.number);
  const point = useSelector((state: RootState) => state.game.point);
  const currentQuestionId = useSelector((state: RootState) => state.game.currentQuestionId);
  const currentQuestion = useSelector((state: RootState) => state.game.currentQuestion);
  const listAnswer = useSelector((state: RootState) => state.game.listAnswer);
  const questionScore = useSelector((state: RootState) => state.game.questionScore);

  const currentRoom = useSelector((state: RootState) => state.rooms.currentRoom);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [getQuestionById, {isLoading: loadingGetQuestion }] = useLazyGetQuestionByIdQuery();
  const [answerQuestion, {isLoading: loadingAnswerQuestion}] = useAnswerQuestionMutation();
  const {data:getGame, isLoading:loadingGetGame, isError} = useGetGameQuery(currentRoom, {pollingInterval: 1000});
  

  const deleteRoom = () => {
    localStorage.setItem(
      "point",
      JSON.stringify(point)
    )
    // const data = useDeleteRoomMutation(currentRoom)
  }

  const answerQuestionClick = async () => {
    try {
      const data = await answerQuestion({currentRoom, currentQuestionId, body: {answerId: answer}})
          .unwrap()
      dispatch(ANSWER_QUESTION_ACTION(data))
      console.log("something")
    } catch (e) {
      console.log("ERROR!!!")
    } finally {
      setNext(false)
      setIsClick(!isClick)
      if (number === 4)  {
        setEnd(true);
      }
    }
  };

  const nextQuestion = async () => {
    try {
      const data = await getQuestionById({currentRoom, currentQuestionId}).unwrap()
      dispatch(UPDATE_ANSWERS(data.answersList))
      dispatch(UPDATE_CORRECT_ANSWER(""))
      dispatch(UPDATE_TEXT(data.questionText))
      dispatch(UPDATE_NUMBER())
      setSelectedAnswer("")
    } catch (e) {
      console.log("ERROR!!!")
    } finally {
      setNext(true)
      setDisabled(true)
      setIsClick(!isClick);
    }
  };

  const onClick = (answerId:string):void => {
    setSelectedAnswer(answerId);
    if (correctAnswer !== "") {
      return;
    }
    if (answer !== answerId) {
      dispatch(UPDATE_ANSWER(answerId))
      setDisabled(false)
    } else {
      setDisabled(true)
      dispatch(UPDATE_ANSWER(""))
    }
  };


  const getFirstQuestion = async (currentQuestionId:string) => {
    const result = await getQuestionById({currentRoom, currentQuestionId}).unwrap()
    dispatch(GET_FIRST_QUESTION_ACTION(result))
  }

  const getGameFunc = async () => {
    console.log(getGame?.status);
    if(getGame && getGame.status==="IN_PROGRESS") {
      console.log("dhndncdn")
      dispatch(UPDATE_CURRENT_QUESTION_ID(getGame.questionId)) 
      getFirstQuestion(getGame.questionId);
      setLoading(false);
    }

   
  }

  useEffect(() => {
    
    if(loading) {
      getGameFunc()
    } 
      if(getGame && getGame.status==="FINISHED" || isError) {
        localStorage.setItem(
          "point",
          JSON.stringify(point));
        navigate("/end")
      }

    
    console.log("use effect")
  }, [getGame, isError]);






  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isClick, setIsClick] = useState(false);

   const title = `Question: ${number}`;

   const countPointtext = `Points: ${point}`;

  const addClassSelected = (value: string) => {
    if (selectedAnswer === value) {
      return "button__answer_selected";
    }
    return "";
  };

  const displayResult = (value: string) => {
    if (isClick) {
      if (
        value === selectedAnswer &&
        selectedAnswer !== correctAnswer
      ) {
        return "button__answer-wrong";
      }
    }
    return "";
  };

  const serchCorrectAnswer = (value: string) => {
    if (isClick) {
      if (value === correctAnswer) {
        return "button__answer-correct";
      }
    }
    return "";
  };

  return (
    <MyLayout>
      {isModalOpen && <CardRules/>}
      <>
      {  (
        <MyCard className="card_game">
          {loading && <p>Loading...</p>}
          {!loading &&(
            <>
              {" "}
              <header className="card__header">
                <h1 className="title_card">{title} </h1>
                <p className="point_game">{countPointtext} </p>
              </header>
              <p className="content__game">{currentQuestion}</p>
              <div className="buttons_ans">
                <div className="button-group">
                  {listAnswer && listAnswer.map((elem: Answer, i: number) => (
                    <MyButton
                      key={elem.answerId}
                      className={`${displayResult(
                        elem.answerId
                      )} ${serchCorrectAnswer(
                        elem.answerId
                      )} button_ans ${addClassSelected(elem.answerId)}`}
                      onChange={()=>{onClick(elem.answerId)}}
                      type="primary"
                      block
                      disabled={isClick}
                    >
                      {elem.answerText}
                    </MyButton>
                  ))}
                </div>
                {next  && (
                  <MyButton
                    type="primary"
                    disabled={!selectedAnswer}
                    onChange={answerQuestionClick}
                    className="send_ans"
                  >
                    Answer
                  </MyButton>
                )}
                {!next && !end && (
                  <MyButton
                    type="primary"
                    disabled={answer === ""}
                    onChange={nextQuestion}
                    className="send_ans"
                  >
                    Next
                  </MyButton>
                )}
                {end && (
                  <Link
                    to="/end"
                    onClick={deleteRoom}
                    className="send_ans"
                    type="primary"
                  >
                    Finish
                  </Link>
                )}
              </div>{" "}
            </>
          )}
        </MyCard>
        
      )}
      <div className="game-process">
      {getGame && getGame.status==="IN_PROGRESS" && 
        (<MyCard className="timer">
          <Timer count={getGame.timeLimit}/>
        </MyCard>)
      }
      <MyCard className="card__score"> 
      <header className="card__header-score">
                <h1 className="title_card-score"> Player </h1>
                <p className="score_game"> Score </p>
              </header>
              <div className="datas_player">
                  {getGame && getGame.playersScore.map((player: PlayerScore, i: number)=> (
                    <div key={player.playerId} className="scors">
                        <div>{player.name}</div>
                        <div>{player.score}</div>
                    </div>
                  ))}
              </div>
      </MyCard>
      <Link to="/end" className="link-exit" onClick={deleteRoom}>Exit room</Link>
      </div>
        </>
    </MyLayout>
  );
};



export default Game;
