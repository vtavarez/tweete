import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Progress from "../Progress";
import Tweet from "../Tweet";

// TODO highlight selected tweet
// TODO rubberband animation to fetch more tweets
// TODO animation for newly added tweets

const useStyles = makeStyles(theme => ({
  container: {
    margin: "54px 0",
    overflowX: "hidden"
  }
}));

const Home = props => {
  const { tweets } = props;
  const { container } = useStyles();

  if (tweets.length > 0) {
    const timeline = tweets.map(tweet => {
      if (tweet.retweeted_status) {
        const retweet = { ...tweet.retweeted_status };

        if (tweet.retweeted_status.quoted_status) {
          const retweetQuotedTweet = {
            ...tweet.retweeted_status.quoted_status
          };

          return (
            <Tweet
              key={retweet.id}
              id={retweet.id}
              fullText={retweet.full_text}
              entities={retweet.entities}
              media={retweet.extended_entities}
              created={retweet.created_at}
              user={retweet.user}
              retweet={true}
              quoted={true}
              retweeterAvatar={tweet.user.profile_image_url_https}
              retweeterHandle={tweet.user.screen_name}
              quotedFullText={retweetQuotedTweet.full_text}
              quotedEntities={retweetQuotedTweet.entities}
              quotedMedia={retweetQuotedTweet.extended_entities}
              quotedCreated={retweetQuotedTweet.created_at}
              quotedUser={retweetQuotedTweet.user}
              quotedReply={retweetQuotedTweet.in_reply_to_status_id}
            />
          );
        }

        return (
          <Tweet
            key={retweet.id}
            id={retweet.id}
            fullText={retweet.full_text}
            entities={retweet.entities}
            media={retweet.extended_entities}
            created={retweet.created_at}
            user={retweet.user}
            retweet={true}
            quoted={false}
            retweeterAvatar={tweet.user.profile_image_url_https}
            retweeterHandle={tweet.user.screen_name}
            reply={retweet.in_reply_to_status_id}
          />
        );
      }

      if (tweet.quoted_status) {
        const quotedTweet = { ...tweet.quoted_status };

        return (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            fullText={tweet.full_text}
            entities={tweet.entities}
            media={tweet.extended_entities}
            user={tweet.user}
            retweet={false}
            quoted={true}
            created={tweet.created_at}
            reply={tweet.in_reply_to_status_id}
            quotedFullText={quotedTweet.full_text}
            quotedEntities={quotedTweet.entities}
            quotedMedia={quotedTweet.extended_entities}
            quotedCreated={quotedTweet.created_at}
            quotedUser={quotedTweet.user}
            quotedReply={quotedTweet.in_reply_to_status_id}
          />
        );
      }

      return (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          fullText={tweet.full_text}
          entities={tweet.entities}
          media={tweet.extended_entities}
          user={tweet.user}
          retweet={false}
          quoted={false}
          created={tweet.created_at}
          reply={tweet.in_reply_to_status_id}
        />
      );
    });

    return <div className={container}>{timeline}</div>;
  }

  return <Progress />;
};

const mapStateToProps = state => ({
  tweets: state.tweets
});

export default connect(mapStateToProps)(Home);
