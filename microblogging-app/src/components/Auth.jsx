import { useState, useContext } from "react";
import { authContext } from "../context/AuthProvider";
import GoogleButton from "react-google-button";
import Profile from "./Profile";
import "../css/User.css";

export function GoogleAuth() {
  const { googleSignIn } = useContext(authContext);
  return (
    <div>
      <form className="user-name-form">
        {" "}
        <GoogleButton
          onClick={(e) => {
            e.preventDefault();
            googleSignIn();
          }}
        />
      </form>
    </div>
  );
}
export function EmailAndPasswordAuth() {
  const {
    emailAndPasswordSignUp,
    emailAndPasswordSignIn,
    // userEmail,
    setUserEmail,
    // userPassword,
    setUserPassword,
  } = useContext(authContext);
  const [tempEmail, setTempEmail] = useState();
  const [tempPassword, setTempPassword] = useState();

  return (
    <div>
      <div>
        <form className="user-name-form">
          <label>email</label>
          <input
            type="email"
            className="input-user"
            placeholder="Enter your email"
            onChange={(e) => {
              setTempEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            className="input-user"
            placeholder="Enter your password"
            onChange={(e) => {
              setTempPassword(e.target.value);
            }}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setUserEmail(tempEmail);
              setUserPassword(tempPassword);
              emailAndPasswordSignIn();
            }}
          >
            Sign in
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setUserEmail(tempEmail);
              setUserPassword(tempPassword);
              emailAndPasswordSignUp();
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
export default function Auth() {
  const { userCredential, errorCode, errorMessage } = useContext(authContext);

  return (
    <div>
      {!userCredential ? (
        <div>
          <h3>Sign in</h3>
          <div>
            <EmailAndPasswordAuth /> <div>or</div> <GoogleAuth />
          </div>
          <div>
            {errorMessage ? "Error: " + errorCode + ": " + errorMessage : null}
          </div>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
}
