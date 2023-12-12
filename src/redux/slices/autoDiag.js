import { createSlice } from '@reduxjs/toolkit';
import { questions } from '../../_mock/db/autodiagQuestions';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  ods: [],
  questions: [],
  answers: [],
  answersGroupByCategories: [],
  preAnswers: [],
  changes: false
};

const slice = createSlice({
  name: 'autoDiagSlice',
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
    getOdsSuccess(state, action){
      state.isLoading = false;
      state.ods = action.payload.ods;
      state.error = null;
    },
    getAnswersSuccess(state, action){
      //state.isLoading = false;
      state.answers = action.payload.answers;
      state.error = null;
    },
    getQuestionsSuccess(state,action){
      state.isLoading = false;
      state.questions = action.payload.questions;
      state.error = null;
    },
    getAnswersGroupByCategoriesSuccess(state,action){
      state.isLoading = false;
      state.answersGroupByCategories = action.payload.answersGroupByCategories;
      state.error = null;
    },
    getPreAnswersSuccess(state, action){
      state.isLoading = false;
      state.preAnswers = action.payload;
      state.error = null;
      state.changes = !!action.payload.length
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  hasError,
  getAnswersSuccess,
  getQuestionsSuccess,
  getOdsSuccess,
  getAnswersGroupByCategoriesSuccess,
  getPreAnswersSuccess
} = slice.actions;
