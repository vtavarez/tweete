import React from "react";
import { connect } from "react-redux";
import Progress from "../Progress";
import Tweet from "../Tweet";

const Home = props => {
  if (props.user.timeline) {
    const tweets = props.user.timeline.map(tweet => {
      const { id, full_text, user, entities } = tweet;
      const retweeter_avatar = user.profile_image_url_https;
      const retweeter_handle = user.screen_name;

      if (tweet.retweeted_status) {
        const { full_text, user, entities } = tweet.retweeted_status;

        return (
          <Tweet
            key={id}
            full_text={full_text}
            entities={entities}
            name={user.name}
            handle={user.screen_name}
            avatar={user.profile_image_url_https}
            verified={user.verified}
            retweet={true}
            retweeter_avatar={retweeter_avatar}
            retweeter_handle={retweeter_handle}
          />
        );
      }

      return (
        <Tweet
          key={id}
          full_text={full_text}
          entities={entities}
          name={user.name}
          handle={user.screen_name}
          avatar={user.profile_image_url_https}
          verified={user.verified}
          retweet={false}
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
