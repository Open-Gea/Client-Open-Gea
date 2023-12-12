import { createSlice } from '@reduxjs/toolkit'
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: 'agronomicData',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
