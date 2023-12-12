import axios from 'axios';

export const getQuestions = async ()=> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/questions`);
      return response;
    } catch (error) {
      return error;
  }
};

export const getAnswers = async (userId,farmId)=> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/answer/user/${userId}/${farmId}`);
    return response;
  } catch (error) {
    return error;
}
};

export const saveAnswers = async (answers) => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/answer`,answers,);
    return response;
  } catch (error) {
    return error;
  }
};
export const saveFiles = async (answers,farmId,userId) => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('farmId', farmId);
    Object.entries(answers).forEach(([questionId, file]) => {
      formData.append(questionId, file);
    });

    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/answer/files`, formData);
    return response;
  } catch (error) {
    return error;
  }
};
