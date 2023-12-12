import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswerGroupByCategories, getAnswersByRule, getOdsByRule, getQuestionsByRule, sendAnswers } from "../utils/autoDiag.actions";
import { getValidationError } from "../../../../utils/getValidationError";
import { getPreAnswersSuccess } from "../../../../redux/slices/autoDiag";

export default function useAutodiagByUserAndRule(user, rule, farmId){
    const {answers ,error, isLoading, answersGroupByCategories, preAnswers, changes} = useSelector(state => state.autoDiagSlice);

    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    useEffect(()=>{
      if(farmId){
        dispatch(getPreAnswersSuccess([]));
        dispatch(getAnswersByRule(user.id, rule, farmId));
        dispatch(getAnswerGroupByCategories(user.id, rule, farmId))
      }
    },[dispatch,farmId]);

    useEffect(() => {
        if (!isLoading && error) {
          enqueueSnackbar(getValidationError(error), { variant: 'error' });
        }
      }, [error]);

    const submitAnswers = async () =>{
      dispatch(sendAnswers(user.id,farmId,rule,preAnswers));
      // dispatch(getPreAnswersSuccess([]));
      // dispatch(getAnswersByRule(user.id, rule, farmId));
      // dispatch(getAnswerGroupByCategories(user.id, rule, farmId))
    }


    return { error, isLoading, answers, answersGroupByCategories, preAnswers, changes, submitAnswers}
}