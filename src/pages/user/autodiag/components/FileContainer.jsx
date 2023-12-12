import { useEffect, useState } from "react";
import FileManager from "../../../../components/file-manager/FileManager";
import useAnswersHook from "../hooks/useAnswers.hook";
import convertFilesToPlain from "../utils/convertFilesToPlain";


export default function FileContainer({questionId, odsId, setResetFilesFlag, resetFilesFlag}){

    const {refreshFiles, watchAnswer} = useAnswersHook()

    const answer = watchAnswer(questionId);
    
    const initialFiles = {files: answer?.files|| [], urls: answer && answer.urls && answer.urls[0] !== "" ? answer.urls : []}
    const [preloadedFiles, setPreloadedFiles] = useState(initialFiles.files);
    const [urls, setUrls] = useState(initialFiles.urls);
    
    
    useEffect(()=>{
        async function f(){
            const plainFiles = preloadedFiles.length ? await convertFilesToPlain(preloadedFiles) : [];
            refreshFiles(questionId, odsId, urls, plainFiles);
        }
        if(preloadedFiles.length !== 0 || urls.length !== initialFiles.urls.length) f();
    },[preloadedFiles, urls]);

    useEffect(()=>{
        if(resetFilesFlag === odsId){
            setUrls(initialFiles.urls);
            setPreloadedFiles(initialFiles.files);
            setResetFilesFlag('');
        }
    },[resetFilesFlag])

    return(
        <>
            <FileManager 
            urls={urls} 
            files={preloadedFiles} 
            setFiles={setPreloadedFiles} 
            setUrls={setUrls}
            disabled={answer?.answer !== 'YES'}
            reset={resetFilesFlag}
            />
        </>
    )
}
