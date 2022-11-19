import { useState } from "react";
import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Tweets from "./components/Tweets";

function App() {
  const [tweetsList, setTweetsList] = useState([]);
  const [dateToday, SetDateToday] = useState(new Date().toString());

  const createTweet = (text) => {
    SetDateToday(new Date().toString());

    setTweetsList([{ tweetText: text, tweetDate: dateToday }, ...tweetsList]);
  };

  return (
    <div className="App">
      <CreateTweet createTweet={createTweet} />
      <Tweets tweetsList={tweetsList} />
    </div>
  );
}

export default App;
