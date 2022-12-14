import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const authContext = createContext();

function AuthProvider({ children }) {
  const getUser = async () => {
    return auth.currentUser;
  };
  const [userCredential, setUserCredential] = useState(getUser());
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      setUserCredential(user);
    } catch (err) {
      setErrorCode(err.code);
      setErrorMessage(err.message);
    }
  };

  const emailAndPasswordSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      setUserCredential(user);
    } catch (err) {
      setErrorCode(err.code);
      setErrorMessage(err.message);
    }
  };
  const emailAndPasswordSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      setUserCredential(user);
    } catch (err) {
      setErrorCode(err.code);
      setErrorMessage(err.message);
    }
  };
  const SignOut = async () => {
    try {
      signOut(auth);
    } catch (err) {
      setErrorCode(err.code);
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserCredential(currentUser);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        googleSignIn,
        emailAndPasswordSignIn,
        emailAndPasswordSignUp,
        SignOut,
        userCredential,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        errorCode,
        errorMessage,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export { authContext, AuthProvider };
