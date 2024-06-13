import {domainName} from "../fetcher/fetcher";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Answer} from "../pages/Game/Game";
import { current } from "@reduxjs/toolkit";

export type GetQuestionByIdResponse = {
    questionId: string;
    questionText: string;
    answersList: Array<Answer>;
}

export type GetQuestionByIdArg = {
    currentRoom: string;
    currentQuestionId: string;
}

export type AnswerQuestionResponse = {
    correctAnswerId: string;
    questionId: string;
    totalScore: number;
    questionScore: number;
}

export type AnswerId = {
    answerId: string;
}

export type QuestionId = {
    questionId: string;
}

export type AnswerQuestionArg = {
    currentRoom: string;
    currentQuestionId: string;
    body: AnswerId;
}

export type PlayerScore = {
    playerId: string;
    name: string;
    score: number;
}

export type GetGameResponse = {
    status: string;
    questionId: string;
    playersScore: Array<PlayerScore>;
    timeLimit: number;
}

export const questionsApi = createApi({
    reducerPath: "questionsApi",
    baseQuery: fetchBaseQuery({baseUrl: domainName}),
    endpoints: (build) => ({
        getQuestionById: build.query<GetQuestionByIdResponse, GetQuestionByIdArg>({
            query: ({currentRoom, currentQuestionId}) => ({
                url: `rooms/${currentRoom}/game/question/${currentQuestionId}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
        }),
        answerQuestion: build.mutation<AnswerQuestionResponse, AnswerQuestionArg>({
            query: ({currentRoom, currentQuestionId, body}) => ({
                url: `rooms/${currentRoom}/game/question/${currentQuestionId}/answer`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body,
            })
        }),
        startGame: build.mutation<QuestionId, string>({
            query: (currentRoom: string) => ({
                url: `rooms/${currentRoom}/game/start`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            
            })
        }),
        joinGame: build.mutation<"", string>({
            query: (currentRoom: string) => ({
                url: `rooms/${currentRoom}/join`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            
            })
        }),
        getGame: build.query<GetGameResponse, string>({
            query: (currentRoom: string) => ({
                url: `rooms/${currentRoom}/game`, 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                timeout: 1000
            })
        })
    }),
});

export const {
    useLazyGetQuestionByIdQuery,
    useAnswerQuestionMutation,
    useStartGameMutation, useJoinGameMutation , useGetGameQuery} = questionsApi;