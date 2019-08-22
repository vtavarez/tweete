import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchPreviousTweets } from "../../actions";
import { useTransition, animated, config } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";
import CircularLoader from "../CircularLoader";
import LinearLoader from "../LinearLoader";
import Tweet from "../Tweet";

// TODO highlight selected tweet
// TODO search bar to filter tweets

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    width: "100%",
    height: "calc(100vh - 108px)",
    transform: "translateY(54px)",
    overflowX: "hidden"
  }
}));

const Home = ({ status, timeline, fetchPreviousTweets }) => {
  const { container } = useStyles();
  const transitions = useTransition(timeline, timeline => timeline.id, {
    initial: { opacity: 1, transform: "translate3d(0%,0,0)" },
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    config: config.slow
  });

  const [cancelScroll, set] = useState(false);

  const onScrollHandler = e => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !cancelScroll
    ) {
      fetchPreviousTweets();
      set(true);
    } else if (
      e.target.scrollHeight - e.target.scrollTop !==
      e.target.clientHeight
    ) {
      set(false);
    }
  };

  if (status === "fetchingTweets") {
    return <CircularLoader />;
  }

  if (status === "fetchedTweets" && timeline.length === 0) {
    return <div />;
  }

  return (
    <div className={container} onScroll={onScrollHandler}>
      {transitions.map(({ item, props, key }) => {
        if (item.retweeted_status) {
          const retweet = { ...item.retweeted_status };

          if (item.retweeted_status.quoted_status) {
            const retweetQuotedTweet = {
              ...item.retweeted_status.quoted_status
            };

            return (
              <animated.div key={key} style={props}>
                <Tweet
                  id={retweet.id}
                  fullText={retweet.full_text}
                  entities={retweet.entities}
                  media={retweet.extended_entities}
                  created={retweet.created_at}
                  user={retweet.user}
                  retweet={true}
                  quoted={true}
                  retweeterAvatar={item.user.profile_image_url_https}
                  retweeterHandle={item.user.screen_name}
                  quotedFullText={retweetQuotedTweet.full_text}
                  quotedEntities={retweetQuotedTweet.entities}
                  quotedMedia={retweetQuotedTweet.extended_entities}
                  quotedCreated={retweetQuotedTweet.created_at}
                  quotedUser={retweetQuotedTweet.user}
                  quotedReply={retweetQuotedTweet.in_reply_to_status_id}
                />
              </animated.div>
            );
          }

          return (
            <animated.div key={key} style={props}>
              <Tweet
                id={retweet.id}
                fullText={retweet.full_text}
                entities={retweet.entities}
                media={retweet.extended_entities}
                created={retweet.created_at}
                user={retweet.user}
                retweet={true}
                quoted={false}
                retweeterAvatar={item.user.profile_image_url_https}
                retweeterHandle={item.user.screen_name}
                reply={retweet.in_reply_to_status_id}
              />
            </animated.div>
          );
        }

        if (item.quoted_status) {
          const quotedTweet = { ...item.quoted_status };

          return (
            <animated.div key={key} style={props}>
              <Tweet
                id={item.id}
                fullText={item.full_text}
                entities={item.entities}
                media={item.extended_entities}
                user={item.user}
                retweet={false}
                quoted={true}
                created={item.created_at}
                reply={item.in_reply_to_status_id}
                quotedFullText={quotedTweet.full_text}
                quotedEntities={quotedTweet.entities}
                quotedMedia={quotedTweet.extended_entities}
                quotedCreated={quotedTweet.created_at}
                quotedUser={quotedTweet.user}
                quotedReply={quotedTweet.in_reply_to_status_id}
              />
            </animated.div>
          );
        }

        return (
          <animated.div key={key} style={props}>
            <Tweet
              id={item.id}
              fullText={item.full_text}
              entities={item.entities}
              media={item.extended_entities}
              user={item.user}
              retweet={false}
              quoted={false}
              created={item.created_at}
              reply={item.in_reply_to_status_id}
            />
          </animated.div>
        );
      })}
      {status === "fetchingPreviousTweets" && <LinearLoader />}
    </div>
  );
};

const mapStateToProps = state => ({
  status: state.tweets.status,
  timeline: state.tweets.timeline
});

export default connect(
  mapStateToProps,
  { fetchPreviousTweets }
)(Home);
