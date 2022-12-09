import { useState, createContext, useContext, useEffect } from "react";
import { user } from "./UserProvider";
import { db } from "../firebase.js";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

const tweets = createContext();

function TweetsProvider({ children }) {
  const [tweetsList, setTweetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");

  const [tweet, setTweet] = useState("");
  const [dateToday, SetDateToday] = useState(Timestamp.fromDate(new Date()));

  const { userName } = useContext(user);

  const tweetsCollection = collection(db, "tweets");

  const createTweet = (text) => {
    setLoader(true);
    if (text) {
      SetDateToday(Timestamp.fromDate(new Date()));

      const newTweet = { content: text, userName: userName, date: dateToday };
      setTweet(newTweet);
    } else {
      setMsgError("Empty content. The tweet is not added");
      setTimeout(() => {
        setLoader(false);
        setMsgError("");
      }, 3000);
    }
  };

  useEffect(() => {
    const getTweetsFromServer = async () => {
      try {
        const tweetsDocsList = await getDocs(tweetsCollection);
        const dataTweets = tweetsDocsList.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        dataTweets.sort((tweet1, tweet2) => {
          return tweet2.date - tweet1.date;
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
          await addDoc(tweetsCollection, tweet);
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
