import React from "react";
import { connect } from "react-redux";
import Progress from "../Progress";
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

  return <Progress />;
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
