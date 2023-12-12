import { createSlice } from '@reduxjs/toolkit';
// ----------------------------------------------------------------------

const initialState = {
  themeMode: 'light',
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    onChangeMode(state, action) {
      return {
        ...state,
        themeMode: action.payload,
      };
    },
    onResetSettings() {
      return initialState;
    },
    handleToggleCollapse(state) {
      state.collapseClick = !state.collapseClick;
    },
    handleHoverEnter(state) {
      state.collapseHover = true;
    },
    handleHoverLeave(state) {
      if (state.collapseClick) {
        state.collapseHover = false;
      }
    },
  },
});

// Reducer
export default slice.reducer;
export const { onChangeMode, onResetSettings, handleToggleCollapse, handleHoverEnter, handleHoverLeave } = slice.actions;
