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
  limit,
  startAfter,
  getDocs,
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

  let tweetsCollectionSort = query(
    tweetsCollection,
    orderBy("date", "desc"),
    limit(10)
  );

  const [latestDoc, setLatestDoc] = useState(null);
  let data = null;
  const loadMoreTweets = async () => {
    tweetsCollectionSort = query(
      tweetsCollection,
      orderBy("date", "desc"),
      startAfter(latestDoc),
      limit(10)
    );
    data = await getDocs(tweetsCollectionSort);
    let dataTweets = [];
    data.docs.forEach((doc) =>
      dataTweets.push({
        ...doc.data(),
        id: doc.id,
      })
    );
    setLatestDoc(data.docs[data.docs.length - 1]);
    setTweetsList([...tweetsList, ...dataTweets]);
  };

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

          setLatestDoc(snapshot.docs[snapshot.docs.length - 1]);
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
    <tweets.Provider
      value={{ tweetsList, loader, msgError, createTweet, loadMoreTweets }}
    >
      {children}
    </tweets.Provider>
  );
}

export { tweets, TweetsProvider };
