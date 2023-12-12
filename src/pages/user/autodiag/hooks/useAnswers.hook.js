import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFarmsByUser from "../../farms/hooks/useFarmsByUser.hook";
import { getPreAnswersSuccess } from "../../../../redux/slices/autoDiag";

export default function useAnswersHook(){
    const {answers, preAnswers} = useSelector(state => state.autoDiagSlice);

    const [hasChanges, setHasChanges] = useState(false);
    const [resetFilesFlag, setResetFilesFlag] = useState(''); //odsId
    
    //console.log(resetFilesFlag)
    const refreshPreUrls = (questionId, odsId, urls) =>{
      // const answer = preAnswers.find(a => a.question === questionId) || answers.find(a => a.question.id === questionId);
      // answer && refreshPreAnswers(questionId, answer.id, {answer: answer.answer, urls, files: answers.files}, odsId);
    }

    const refreshFiles = (questionId, odsId, urls, files) => {
      const answer = preAnswers.find(a => a.question === questionId) || answers.find(a => a.question.id === questionId);
      answer && refreshPreAnswers(questionId, answer.id, {answer: answer.answer, files, urls}, odsId);
    }

    const dispatch = useDispatch();

    const refreshPreAnswers = (questionId, answerId, newAnswer, odsId) =>{

      // console.log('newAnswer',newAnswer);
        if(answerId){ //update
            const answerToPatch = {
                id:answerId,
                question:questionId,
                answer: newAnswer.answer,
                urls: newAnswer.urls ||  undefined,
                files: newAnswer.files,
                odsId: odsId
                }
            dispatch(
            getPreAnswersSuccess(
            [answerToPatch, ...preAnswers.filter(a => a.id !==answerId )]
            ))

            setHasChanges(true);
        }
        else{ // new answer in db
          
          const newAnswerToPost = {
            question: questionId,
            answer: newAnswer.answer,
            urls: newAnswer.urls ||  undefined,
            files: newAnswer.files,
            odsId: odsId
          }
          dispatch(
            getPreAnswersSuccess(
            [newAnswerToPost, ...preAnswers.filter(a => a.question !== questionId)]
            ))

          setHasChanges(true);
        }
    }

    const watchAnswer = (questionId) =>{
        const answer = preAnswers.find(a => a.question === questionId) || answers.find(a => a.question.id === questionId);
        //console.log(preAnswers.find(a => a.question === questionId) ? 'preAnswers' : 'answer')
        return answer;
    }

    const resetAnswers = async (odsId) => {
      setResetFilesFlag(odsId);
      dispatch(
            getPreAnswersSuccess(        
            [...preAnswers.filter(a => a.odsId !== odsId)]
            ))
    }

    return {refreshPreAnswers, hasChanges, watchAnswer, resetAnswers, refreshPreUrls, refreshFiles, resetFilesFlag, setResetFilesFlag}

}