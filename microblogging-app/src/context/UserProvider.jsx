import { useState, useEffect, createContext } from "react";
import localForage from "localforage";

const user = createContext();

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getValueUserName = async () => {
      try {
        const data = await localForage.getItem("userName");
        setUserName(data);
      } catch (err) {
        console.log(err);
      }
    };
    getValueUserName();
  }, []);

  useEffect(() => {
    const setValueUserName = async () => {
      try {
        localForage.setItem("userName", userName);
      } catch (err) {
        console.log(err);
      }
    };

    setValueUserName();
  }, [userName]);

  return (
    <user.Provider value={{ userName, setUserName }}>{children}</user.Provider>
  );
}

export { user, UserProvider };
