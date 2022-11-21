import "../css/CreateTweet.css";
import { useEffect, useState } from "react";

function CreateTweet(props) {
  const { createTweet, loader, error } = props;

  const [tweetText, setTweetText] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  function validateTweetText(e) {
    setTweetText(e.target.value);
    if (tweetText.length + 1 > 140) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }

  return (
    <div className="create-tweet">
      <div className="create-tweet-container">
        <textarea
          className="create-tweet-textarea"
          onChange={validateTweetText}
          placeholder="What you have in mind..."
        ></textarea>
        {disabledButton && (
          <div className="errorMessage">
            The tweet can't contain more than 140 chars
          </div>
        )}
        {error && <div className="errorMessage">{error}</div>}
        <div className="lader-and-button">
          <div
            className="loader"
            style={loader ? { display: "block" } : { display: "none" }}
          ></div>
          <button
            className="create-tweet-button"
            onClick={() => createTweet(tweetText)}
            disabled={disabledButton || loader}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTweet;
