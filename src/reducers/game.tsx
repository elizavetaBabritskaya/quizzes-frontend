import {Answer} from "../pages/Game/Game";
import {createSlice} from "@reduxjs/toolkit";


export type GameState = {
  currentQuestion: string;
  listAnswer: Array<Answer>;
  currentQuestionId: string;
  point: number;
  correctAnswer: string;
  questionScore: number;
  answer: string;
  number: number;
  loading: boolean;
}

const initialState: GameState = {
  currentQuestion: "",
  listAnswer: [],
  currentQuestionId: "",
  point: 0,
  correctAnswer: "",
  questionScore: 0,
  answer: "",
  number: 1,
  loading: false
}

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
      UPDATE_ANSWER: (state, action) => {
          state.answer = action.payload
      },
      END_GAME: (state) => {
          state.point = 0
          state.number = 1
          state.correctAnswer = ""
          state.answer = ""
      },
      UPDATE_CURRENT_QUESTION_ID: (state, action) => {
          state.currentQuestionId = action.payload
      },
      ANSWER_QUESTION_ACTION: (state, action) => {
          state.currentQuestionId = action.payload.questionId
          state.correctAnswer = action.payload.correctAnswerId
          state.questionScore = action.payload.questionScore
          state.point = action.payload.totalScore
      },
      NEXT_QUESTION_ACTION: (state, action) => {
          state.listAnswer = action.payload.listAnswer
          state.currentQuestion = action.payload.questionText
          state.correctAnswer = ""
          state.number = state.number + 1
      },
      GET_FIRST_QUESTION_ACTION: (state, action) => {
          state.currentQuestion = action.payload.questionText
          state.listAnswer = action.payload.answersList
      },
      UPDATE_ANSWERS: (state, action) => {
          state.listAnswer = action.payload
      },
      UPDATE_TEXT: (state, action) => {
          state.currentQuestion = action.payload
      },
      UPDATE_CORRECT_ANSWER: (state, action) => {
          state.correctAnswer = action.payload
      },
      UPDATE_NUMBER: (state) => {
          state.number = state.number + 1
      },
  },
});

export const {UPDATE_ANSWER, UPDATE_ANSWERS, UPDATE_CORRECT_ANSWER, UPDATE_TEXT, UPDATE_NUMBER, ANSWER_QUESTION_ACTION, END_GAME, UPDATE_CURRENT_QUESTION_ID, GET_FIRST_QUESTION_ACTION, NEXT_QUESTION_ACTION} = game.actions;
export default game.reducer;