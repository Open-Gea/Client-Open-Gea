import axios from 'axios';

export async function processFile(file){
    try{
        if (file.size > 2 * 1024 * 1024) 
            throw new Error("File size should be less than 2 MB")
        
        if(!isValidFileType(file.name))
            throw new Error("File extension must be jpg, jpeg, png or pdf")
        const isMalware = await isDangerous(file);
        if(isMalware.error) throw new Error("Malware scan incomplete");
        else if(isMalware === true) throw new Error("Malware detected. Choose another file")
        
        return {error: false};
    }
    catch(e){
        return {error: e.message } 
    }
}

const isValidFileType = (fileName) => {
    // Lista de extensiones permitidas (puedes personalizarla según tus necesidades)
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

    // Obtiene la extensión del archivo
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Verifica si la extensión está en la lista de extensiones permitidas
    return allowedExtensions.includes(fileExtension);
}

const isDangerous = async (file) => {
     
    const {data} =  await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/scan-file`, {file}, {headers: {
        'Content-Type': 'multipart/form-data'
    }}).catch(e => {return {error: e.message} });


    return data;
        
}