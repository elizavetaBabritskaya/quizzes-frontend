import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {domainName} from "../fetcher/fetcher";


export type Room = {
    roomName: string,
    roomId: string
}

export type RoomName = {
    roomName:string
}

export type PlayerId = {
    playerId: string;
}

export type RoomResponse = {
    roomId: string;
    roomName: string;
    players: Array<PlayerId>;
}

export type CreateRoomResponse = {
  roomId: string;
  ownerId: string;
  roomName: string,
  players: Array<PlayerId>
}

export type getRoomIdResponse = {
    roomId:string;
    ownerId:string; 
    roomName:string;  
    players:Array<PlayerId> 
}

export const roomsApi = createApi({
    reducerPath: "roomsApi",
    baseQuery: fetchBaseQuery({baseUrl: domainName}),
    endpoints: (build) => ({
        getRooms: build.query<Array<Room>, string>({
            query: () => ({
                url: "rooms",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                timeout: 1000,
            })
        }),
        addRoom: build.mutation<CreateRoomResponse, RoomName>({
            query: (room) => ({
                url: "rooms",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: room
            })
        }),
        getRoomId: build.query<CreateRoomResponse, string>({
            query: (currentRoom: string) => ({
                url: `rooms/${currentRoom}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
        }),
        deleteRoom: build.mutation<"", string>({
            query: (currentRoom: string) => ({
                url: `rooms/${currentRoom}/delete`,
                method:"POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            
        }),
        leaveRoom: build.mutation<"", "">({
            query: () => ({
                url: `rooms/leave`,
                method:"POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            
        })
    }),
});

export const {useGetRoomsQuery, useAddRoomMutation, useLazyGetRoomIdQuery, useDeleteRoomMutation, useLeaveRoomMutation} = roomsApi;