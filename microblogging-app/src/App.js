import { useEffect, useState } from "react";
import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Tweets from "./components/Tweets";
import localForage from "localforage";

function App() {
  const [tweetsList, setTweetsList] = useState([]);
  const [userName, setUserName] = useState("yonatan");
  const [dateToday, SetDateToday] = useState(new Date().toString());

  const createTweet = (text) => {
    SetDateToday(new Date().toString());

    setTweetsList([
      { userName: userName, tweetText: text, tweetDate: dateToday },
      ...tweetsList,
    ]);
  };

  useEffect(() => {
    const getTweetsList = async () => {
      try {
        const value = await localForage.getItem("tweetsList");
        setTweetsList(value);
      } catch (err) {
        console.log(err);
      }
    };
    getTweetsList();
  }, []);

  useEffect(() => {
    localForage.setItem("tweetsList", tweetsList);
  }, [tweetsList]);

  return (
    <div className="App">
      <CreateTweet createTweet={createTweet} />
      <Tweets tweetsList={tweetsList} />
    </div>
  );
}

export default App;
