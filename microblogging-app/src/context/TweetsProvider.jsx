import { useState, createContext, useContext, useEffect } from "react";
import { user } from "./UserProvider";

const tweets = createContext();

function TweetsProvider({ children }) {
  const [tweetsList, setTweetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");

  const [tweet, setTweet] = useState("");
  const [dateToday, SetDateToday] = useState(new Date().toISOString());

  const { userName } = useContext(user);
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

        const dataTweets = data.tweets;
        dataTweets.sort((tweet1, tweet2) => {
          return tweet1.date - tweet2.date;
        });
        setTweetsList(dataTweets);
      } catch (err) {
        console.log("get error:", err);
      }
    };
    getTweetsFromServer();
    const interval = setInterval(() => {
      getTweetsFromServer();
    }, 120000);
  }, []);

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
      setTweetsList([tweet, ...tweetsList]);
      setTweet("");
    }
  }, [tweet]);

  return (
    <tweets.Provider value={{ tweetsList, loader, msgError, createTweet }}>
      {children}
    </tweets.Provider>
  );
}

export { tweets, TweetsProvider };
