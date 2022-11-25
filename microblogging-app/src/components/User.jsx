import "../css/User.css";
import { user } from "../context/UserProvider";
import { useState, useContext } from "react";

function User() {
  const { userName, setUserName } = useContext(user);
  const [tempName, setTempName] = useState(userName);

  return (
    <div className="user">
      <form className="user-name-form">
        <h2>Profile</h2>
        <label>User Name</label>
        <input
          type="text"
          className="input-user"
          defaultValue={userName}
          onChange={(e) => {
            setTempName(e.target.value);
          }}
        ></input>
        <button
          className="button-save-user"
          onClick={(e) => {
            e.preventDefault();
            setUserName(tempName);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default User;
