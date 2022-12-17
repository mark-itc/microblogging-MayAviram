import React from "react";
import "../css/User.css";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { userCredential, SignOut, setPhotoURL } = useContext(authContext);

  const uploadPhoto = async (file) => {
    const userImageRef = ref(
      storage,
      "images/" + "profile-" + userCredential.uid + ".jpeg"
    );

    const snapshot = async () => {
      await uploadBytes(userImageRef, file.target.files[0]);
      const imageUrl = await getDownloadURL(userImageRef);
      setPhotoURL(imageUrl);
    };
    snapshot();
  };

  return (
    <div>
      <h2>hello, {userCredential.email}</h2>
      <div>
        <img alt="profile image" src={userCredential.photoURL}></img>

        <input
          type="file"
          id="inputImage"
          onChange={(e) => {
            uploadPhoto(e);
          }}
        />
      </div>
      <button
        className="button-save-user"
        onClick={() => {
          SignOut();
        }}
      >
        log out
      </button>
    </div>
  );
}
