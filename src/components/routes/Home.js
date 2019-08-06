import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchTweets } from "../../actions";
import Progress from "../Progress";
import Tweet from "../Tweet";

const useStyles = makeStyles(theme => ({
  timeline_container: {
    margin: "54px 0",
    overflowX: "hidden"
  }
}));

const Home = props => {
  const { tweets, fetchTweets } = props;
  const { timeline_container } = useStyles();

  useEffect(() => {
    let timeout;
    if (tweets.length > 0) {
      timeout = setTimeout(() => fetchTweets(), 120000);
    }
    return () => clearTimeout(timeout);
  }, [tweets, fetchTweets]);

  if (tweets.length > 0) {
    const timeline = tweets.map(tweet => {
      const {
        id,
        full_text,
        user,
        entities,
        extended_entities,
        created_at
      } = tweet;

      if (tweet.retweeted_status) {
        const retweetedId = tweet.retweeted_status.id;
        const retweetedFullText = tweet.retweeted_status.full_text;
        const retweetedUser = tweet.retweeted_status.user;
        const retweetedEntities = tweet.retweeted_status.entities;
        const retweetedExtendedEntities =
          tweet.retweeted_status.extended_entities;
        const retweetedCreated = tweet.retweeted_status.created_at;

        if (tweet.retweeted_status.quoted_status) {
          const retweetedQuotedFullText =
            tweet.retweeted_status.quoted_status.full_text;
          const retweetedQuotedEntites =
            tweet.retweeted_status.quoted_status.entities;
          const retweetedQuotedMedia =
            tweet.retweeted_status.quoted_status.extended_entities;
          const retweetedQuotedCreated =
            tweet.retweeted_status.quoted_status.created_at;
          const retweetedQuotedUser = tweet.retweeted_status.quoted_status.user;

          return (
            <Tweet
              key={retweetedId}
              id={retweetedId}
              full_text={retweetedFullText}
              entities={retweetedEntities}
              media={retweetedExtendedEntities}
              created={retweetedCreated}
              user={retweetedUser}
              retweet={true}
              quoted={true}
              retweeter_avatar={user.profile_image_url_https}
              retweeter_handle={user.screen_name}
              quoted_full_text={retweetedQuotedFullText}
              quoted_entities={retweetedQuotedEntites}
              quoted_media={retweetedQuotedMedia}
              quoted_created={retweetedQuotedCreated}
              quoted_user={retweetedQuotedUser}
            />
          );
        }

        return (
          <Tweet
            key={retweetedId}
            id={retweetedId}
            full_text={retweetedFullText}
            entities={retweetedEntities}
            media={retweetedExtendedEntities}
            created={retweetedCreated}
            user={retweetedUser}
            retweet={true}
            quoted={false}
            retweeter_avatar={user.profile_image_url_https}
            retweeter_handle={user.screen_name}
          />
        );
      }

      if (tweet.quoted_status) {
        const quoted_full_text = tweet.quoted_status.full_text;
        const quoted_user = tweet.quoted_status.user;
        const quoted_entities = tweet.quoted_status.entities;
        const quoted_extended_entities = tweet.quoted_status.extended_entities;
        const quoted_created = tweet.quoted_status.created_at;

        return (
          <Tweet
            key={id}
            id={id}
            full_text={full_text}
            entities={entities}
            media={extended_entities}
            user={user}
            retweet={false}
            quoted={true}
            created={created_at}
            quoted_full_text={quoted_full_text}
            quoted_entities={quoted_entities}
            quoted_media={quoted_extended_entities}
            quoted_created={quoted_created}
            quoted_user={quoted_user}
          />
        );
      }

      return (
        <Tweet
          key={id}
          id={id}
          full_text={full_text}
          entities={entities}
          media={extended_entities}
          user={user}
          retweet={false}
          quoted={false}
          created={created_at}
        />
      );
    });

    return <div className={timeline_container}>{timeline}</div>;
  }

  return <Progress />;
};

const mapStateToProps = state => ({
  tweets: state.tweets
});

export default connect(
  mapStateToProps,
  { fetchTweets }
)(Home);
