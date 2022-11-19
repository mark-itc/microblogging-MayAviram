import "../css/Tweets.css";

function Tweets(props) {
  const { tweetsList } = props;

  const goOverList = () => {
    return tweetsList.map((item, index) => (
      <div className="tweet" key={index}>
        <div className="tweet-date-and-user">
          <div>{item.userName}</div>
          <div>{item.tweetDate}</div>
        </div>
        <div className="tweet-text">{item.tweetText}</div>
      </div>
    ));
  };

  return <div className="tweets">{tweetsList ? goOverList() : null}</div>;
}

export default Tweets;
