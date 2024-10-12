const bucket = require('../config/firebase');
const Firebase = {}

Firebase.UploadToFirebase = async (fileToLoad, result) => {
  try {
    if(!fileToLoad) return result(null, null);
    const fileBuffer = fileToLoad.buffer;
    const file = bucket.file(`imagenes/${fileToLoad.idImage}`);
    const stream = file.createWriteStream({
      metadata: {
        contentType: fileToLoad.mimetype,
      },
      resumable: false
    });
    stream.end(fileBuffer);
    stream.on('finish', async () => {
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      return result(null, publicUrl);
    });
    stream.on('error', (error) => {
      return result(error, null);
    });
  } catch (error) {
    return result(error, null);
  }
};
Firebase.RemoveImage = async (imageName, result) => {
  try {
    const fileName = `imagenes/${imageName}.jpg`;
    await bucket.file(fileName).delete();
    result(null, true);
  } catch (error) {
    result(error, false);
  }
}

module.exports = Firebase;