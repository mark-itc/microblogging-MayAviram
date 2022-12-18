import "../css/Tweets.css";
import { tweets } from "../context/TweetsProvider";
import { useContext } from "react";
import { useEffect } from "react";

function Tweets() {
  const { tweetsList, loadMoreTweets } = useContext(tweets);
  const goOverList = () => {
    return tweetsList.map((item, index) => (
      <div className="tweet" key={index}>
        <div className="tweet-date-and-user">
          <div>{item.userName}</div>
          <div>{item.date.toDate().toISOString()}</div>
        </div>
        <div className="tweet-text">{item.content}</div>
      </div>
    ));
  };

  // const scrollFunc = (e) => {
  //   if (
  //     window.innerHeight + e.target.documentElement.scrollTop >=
  //     e.target.documentElement.scrollHeight
  //   ) {
  //     loadMoreTweets();
  //   }
  // };
  // useEffect(() => {
  //   loadMoreTweets();
  //   window.addEventListener("scroll", scrollFunc);
  // }, []);
  return (
    <div className="tweets">
      {tweetsList ? goOverList() : null}
      <button
        onClick={() => {
          loadMoreTweets();
        }}
      >
        load more
      </button>
    </div>
  );
}

export default Tweets;
