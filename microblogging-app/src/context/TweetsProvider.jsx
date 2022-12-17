import { useState, createContext, useContext, useEffect } from "react";
import { authContext } from "./AuthProvider.jsx";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const tweets = createContext();

function TweetsProvider({ children }) {
  const [tweetsList, setTweetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");

  const [tweet, setTweet] = useState("");
  const [dateToday, SetDateToday] = useState(Timestamp.fromDate(new Date()));

  const { userCredential } = useContext(authContext);

  const tweetsCollection = collection(db, "tweets");
  const tweetsCollectionSort = query(tweetsCollection, orderBy("date", "desc"));

  const createTweet = (text) => {
    setLoader(true);
    if (text) {
      SetDateToday(Timestamp.fromDate(new Date()));
      const newTweet = {
        content: text,
        userName: userCredential.uid,
        date: dateToday,
      };
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
    const getTweetsFromServer = () => {
      try {
        onSnapshot(tweetsCollectionSort, (snapshot) => {
          const dataTweets = [];
          snapshot.docs.forEach((doc) =>
            dataTweets.push({
              ...doc.data(),
              id: doc.id,
            })
          );
          setTweetsList(dataTweets);
        });
      } catch (err) {
        setMsgError(err);
      }
    };
    getTweetsFromServer();
  }, []);

  useEffect(() => {
    if (tweet) {
      const postTweetToServer = async () => {
        try {
          await addDoc(tweetsCollection, tweet);
          setLoader(false);
        } catch (err) {
          setMsgError("The tweet is not added");
          setTimeout(() => {
            setLoader(false);
            setMsgError("");
          }, 3000);
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
