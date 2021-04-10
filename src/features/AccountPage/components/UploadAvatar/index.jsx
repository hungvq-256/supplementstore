import firebase from "firebase/app";
import 'firebase/storage';
import React from 'react';
import { useSelector } from "react-redux";
import imgUpload from "../../../../assets/img/uploadimg.svg";
import "./style.scss";
require("firebase/firestore");

const UploadAvatar = ({ onChangeAvatar }) => {
    const user = useSelector(state => state.user.current);
    const handleOnChange = (e) => {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        let file = e.target.files[0]
        var metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/file.name'
        var uploadTask = storageRef.child(`images/${user.userId}.jpg`).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: {
                        console.log('Upload is paused');
                        break;
                    } // or 'paused'
                    case firebase.storage.TaskState.RUNNING: {
                        console.log('Upload is running');
                        break;
                    } // or 'running'
                    default: {
                        return
                    }
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized': {
                        // User doesn't have permission to access the object
                        console.log(error.code)
                        break;
                    }
                    case 'storage/canceled': {
                        // User canceled the upload
                        console.log(error.code);
                        break;
                    }
                    case 'storage/unknown': {
                        // Unknown error occurred, inspect error.serverResponse
                        console.log(error.code);
                        break;
                    }
                    default: {
                        return
                    }
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    onChangeAvatar(downloadURL);
                });
            }
        );
    }

    return (
        <div>
            <label htmlFor="uploadavatar" className="labeluploadavatar">
                <i><img src={imgUpload} alt="img upload" /></i>
                <p>Upload Avatar</p>
            </label>
            <input hidden type="file" id="uploadavatar" onChange={handleOnChange} />
        </div>
    );
};

export default UploadAvatar;