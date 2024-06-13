import React from 'react';
import Router from './Router';
import {useWhoAmIQuery} from "./authApi";
import {useStoreDispatch} from "./store/store";
import {UPDATE_AUTH} from "./reducers/authReducer";

function App() {
  const dispatch = useStoreDispatch();
  const {data} = useWhoAmIQuery("");

  if (data !== undefined) {
    dispatch(UPDATE_AUTH(true))
  }
    return <Router></Router>
  
}

export default App;

