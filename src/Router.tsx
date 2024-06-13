import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Start from './pages/Start/Start';
import Game from './pages/Game/Game';
import End from './pages/End/End';
import Sign from './pages/Sign/Sign';
import GameRooms from './pages/GameRooms/GameRooms';
import CreatingRoom from "./pages/CreatingRoom/CreatingRooms";
import PrivateLayout from "./Layouts/PrivateLayout/PrivateLayout";
import PublicLayout from './Layouts/PublicLayout/PublicLayout'
import Regestration from "./pages/Registration/Registration";

function Router() {
  return (
   <BrowserRouter> 
      <Routes>
        <Route path='/start' element={<PrivateLayout><Start/></PrivateLayout>}/> 
        <Route path='/game' element={<PrivateLayout><Game /></PrivateLayout> }/> 
        <Route path='/end' element={<PrivateLayout><End/></PrivateLayout>}/>
        <Route path="/sign" element={<PublicLayout> <Sign/></PublicLayout>}/>
        <Route path="/" element={<PrivateLayout><GameRooms/></PrivateLayout>}/>
        <Route path="/create_room" element={<PrivateLayout><CreatingRoom/></PrivateLayout>}/>
        <Route path="/registration" element={<PublicLayout> <Regestration/></PublicLayout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
