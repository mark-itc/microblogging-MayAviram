import { useContext, useEffect, useState } from "react";
import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import User from "./components/User";
import { user } from "./context/UserProvider";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

function App() {
  const [tweetsList, setTweetsList] = useState([]);
  const [tweet, setTweet] = useState("");
  const [dateToday, SetDateToday] = useState(new Date().toISOString());
  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");

  const { userName, setUserName } = useContext(user);
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
        console.log("get error:", err);
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <CreateTweet
            createTweet={createTweet}
            loader={loader}
            error={msgError}
          />
          <Tweets tweetsList={tweetsList} />
        </>
      ),
    },
    {
      path: "/Profile",
      element: <User />,
    },
  ]);
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
