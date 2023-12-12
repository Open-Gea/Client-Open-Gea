export default function prepareAnswers(answers){
    const prepAnswers = [];
    for(let i=0; i<answers.length; i++){
        if(answers[i].files && answers[i].files.length > 0) 
            prepAnswers.push({
                ...answers[i],
                files: convertPlainObjectsToFiles(answers[i].files)
            })
        else prepAnswers.push({...answers[i], files: undefined})    
    }
    const answersToPost = prepAnswers.filter(a => !a.id);
    const answersToPatch = prepAnswers.filter(a => a.id);
    return {answersToPost, answersToPatch}
}

function plainObjectToFile(plainObject) {
    const blob = dataToBlob(plainObject.data, plainObject.type);
    return new File([blob], plainObject.name, { type: plainObject.type });
}

function dataToBlob(data, type) {
    const byteCharacters = atob(data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
}

function convertPlainObjectsToFiles(plainObjects) {
    return plainObjects.map(plainObject => plainObjectToFile(plainObject));
}
