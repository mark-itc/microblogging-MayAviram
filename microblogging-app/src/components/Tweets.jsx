import "../css/Tweets.css";
import { tweets } from "../context/TweetsProvider";
import { useContext } from "react";

function Tweets() {
  const { tweetsList } = useContext(tweets);
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

  return <div className="tweets">{tweetsList ? goOverList() : null}</div>;
}

export default Tweets;
