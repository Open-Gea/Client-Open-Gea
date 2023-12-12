import axios from 'axios';
import { getAnswersGroupByCategoriesSuccess, getAnswersSuccess, getOdsSuccess, getPreAnswersSuccess, getQuestionsSuccess, hasError,startLoading } from '../../../../redux/slices/autoDiag';
import prepareAnswers from './prepareAnswers';

export const getAnswersByRule = (userId,rule, farmId) => {
    return async dispatch => {
      dispatch(startLoading());
      try {
        const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/answer?userId=${userId}&rule=${rule}&farmId=${farmId}`);
        dispatch(
          getAnswersSuccess({
            answers: response.data
          })
        );
      } catch (error) {
        dispatch(hasError(error));
        console.log(error);
      }
    };
  };
  
export const getQuestionsByRule = (rule) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
        const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/question`);
        
        dispatch(
            getQuestionsSuccess({
            questions: response.data
            })
        );
        } catch (error) {
        dispatch(hasError(error));
        console.log(error);
        }
    };
  }

  export const getOdsByRule = (rule) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
        const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/category`);
        
        dispatch(
            getOdsSuccess({
            ods: response.data
            })
        );
        } catch (error) {
        dispatch(hasError(error));
        console.log(error);
        }
    };

};

export const getAnswerGroupByCategories = (userId,rule,farmId) => {
  return async dispatch => {
      dispatch(startLoading());
      try {
        const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/answer/by-categories?userId=${userId}&rule=${rule}&farmId=${farmId}`);
      
      dispatch(
        getAnswersGroupByCategoriesSuccess({
          answersGroupByCategories: response.data
          })
      );
      } catch (error) {
      dispatch(hasError(error));
      console.log(error);
      }
  };

};

export const sendAnswers = (userId, farmId, rule, answers) => {
  return async dispatch =>{
    dispatch(startLoading());
    try{
        const {answersToPost, answersToPatch} = prepareAnswers(answers);

        if(answersToPost.length){
          for(let i =0; i<answersToPost.length; i++){
            const data = {...answersToPost[i], userId, farmId};
            await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/answer`,data,{headers: {
              'Content-Type': 'multipart/form-data'
            }});
          };
        }

        if(answersToPatch.length){
          for(let i =0; i<answersToPatch.length; i++){
            const {id, odsId, ...data} = answersToPatch[i]; //odsId useless
            await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/autodiag/answer/${id}`,data,{headers: {
              'Content-Type': 'multipart/form-data'
            }});
          };
        }

        await dispatch(getPreAnswersSuccess([]));
        await dispatch(getAnswersByRule(userId, rule, farmId));
        await dispatch(getAnswerGroupByCategories(userId, rule, farmId))
        
    }
    catch(error){
      dispatch(hasError(error.message));
      console.log(error.message);
    }
  }
}

