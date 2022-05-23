import { storage } from './firebase';
    
const uploadImage = (image, callBackFunction) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_change',
        (snapshot) => {}, //current progress
        (error) => {},
        () => {
            storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    callBackFunction(url)
                });
        });
}

export default uploadImage