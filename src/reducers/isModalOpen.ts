import {createSlice} from "@reduxjs/toolkit";

export type ModalOpenStateType = {
  openModal: boolean;
}

const initialState: ModalOpenStateType = {
  openModal: false
};

export const isModalOpen = createSlice({
  name: "isModalOpen",
  initialState,
  reducers: {    
    UPDATE_MODAL: (state, action) => {
      console.log(state.openModal);
      state.openModal = action.payload
    },
  },
});

export const { UPDATE_MODAL } = isModalOpen.actions;
export default isModalOpen.reducer;