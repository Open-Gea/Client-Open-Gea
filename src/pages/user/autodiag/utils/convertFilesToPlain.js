// Función para convertir un archivo a una representación plana
async function fileToPlain(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      //console.log(file);
      const plainFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: event.target.result,
      };
      resolve(plainFile);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

// Función para aplanar archivos
async function convertFilesToPlain(files) {
  const plainFiles = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i] instanceof File) {
      try {
        const plainFile = await fileToPlain(files[i]);
        //console.log(plainFile);
        plainFiles.push(plainFile);
      } catch (error) {
        console.log(error);
      }
    } else {
      plainFiles.push(files[i]); // already plain
    }
  }

  return plainFiles;
}

export default convertFilesToPlain;
