import { useEffect, useState } from "react";
import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Tweets from "./components/Tweets";

function App() {
  const [tweetsList, setTweetsList] = useState([]);
  const [tweet, setTweet] = useState("");
  const [userName, setUserName] = useState("yonatan");
  const [dateToday, SetDateToday] = useState(new Date().toISOString());
  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");

  const url =
    "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

  const createTweet = (text) => {
    setLoader(true);
    SetDateToday(new Date().toISOString());
    const newTweet = { content: text, userName: userName, date: dateToday };
    setTweet(newTweet);
  };

  useEffect(() => {
    const getTweetsFromServer = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTweetsList(data.tweets);
      } catch (err) {
        console.log(err);
      }
    };
    getTweetsFromServer();
  }, [tweet]);

  useEffect(() => {
    if (tweet) {
      const postTweetToServer = async () => {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(tweet),
            headers: {
              "Content-type": "application/json",
            },
          });

          const data = await response.json();
          setLoader(false);
        } catch (err) {
          setMsgError("The tweet is not added");
        }
      };
      postTweetToServer();
      setTweet("");
    }
  }, [tweet]);

  return (
    <div className="App">
      <CreateTweet createTweet={createTweet} loader={loader} error={msgError} />
      <Tweets tweetsList={tweetsList} />
    </div>
  );
}

export default App;
