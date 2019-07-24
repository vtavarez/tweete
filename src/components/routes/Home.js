import React from "react";
import { connect } from "react-redux";
import Tweet from "../Tweet";

const Home = props => {
  if (props.user.timeline) {
    const tweets = props.user.timeline.map(tweet => {
      const { id, text, user } = tweet;

      if (tweet.retweeted_status) {
        const { text, user } = tweet.retweeted_status;
        return (
          <Tweet
            key={id}
            text={text}
            name={user.name}
            handle={user.screen_name}
            avatar={user.profile_image_url_https}
          />
        );
      }

      return (
        <Tweet
          key={id}
          text={text}
          name={user.name}
          handle={user.screen_name}
          avatar={user.profile_image_url_https}
        />
      );
    });

    return <div>{tweets}</div>;
  }

  return (
    <div>
      <Tweet id={1} />
      <Tweet id={2} />
      <Tweet id={3} />
      <Tweet id={4} />
      <Tweet id={5} />
      <Tweet id={6} />
      <Tweet id={7} />
      <Tweet id={8} />
      <Tweet id={9} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
