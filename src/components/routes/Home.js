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
  console.log(timeline);
  const { container } = useStyles();
  const transitions = useTransition(timeline, timeline => timeline.id, {
    initial: { opacity: 1, transform: "translate3d(0%,0,0)" },
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    reset: true,
    config: config.slow
  });

  const [cancelScroll, setCancelScroll] = useState(false);

  const resetScroll = () => setTimeout(() => setCancelScroll(false), 2000);

  const onScrollHandler = e => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !cancelScroll
    ) {
      fetchPreviousTweets();
      setCancelScroll(true);
      resetScroll();
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
      {transitions.map(({ item: tweet, props, key }) => {
        const {
          id,
          full_text,
          entities,
          extended_entities,
          created_at,
          user,
          in_reply_to_status_id,
          retweeted_status: retweet,
          quoted_status: quotedTweet
        } = tweet;

        if (retweet) {
          const {
            id: retweetId,
            full_text: retweetFullText,
            entities: retweetEntities,
            extended_entities: retweetExtendedEntities,
            created_at: retweetCreated,
            user: retweetUser,
            in_reply_to_status_id: retweetReplyStatus,
            quoted_status: retweetQuotedTweet
          } = retweet;

          if (retweetQuotedTweet) {
            const {
              full_text: retweetQuotedTweetFullText,
              entities: retweetQuotedTweetEntities,
              extended_entities: retweetQuotedTweetExtendedEntities,
              created_at: retweetQuotedTweetCreated,
              user: retweetQuotedTweetUser,
              in_reply_to_status_id: retweetQuotedTweetReplyStatus
            } = retweetQuotedTweet;

            return (
              <animated.div key={key} style={props}>
                <Tweet
                  id={retweetId}
                  fullText={retweetFullText}
                  entities={retweetEntities}
                  media={
                    retweetExtendedEntities && retweetExtendedEntities.media
                  }
                  created={retweetCreated}
                  user={retweetUser}
                  retweet={true}
                  quoted={true}
                  retweeterAvatar={tweet.user.profile_image_url_https}
                  retweeterHandle={tweet.user.screen_name}
                  quotedFullText={retweetQuotedTweetFullText}
                  quotedEntities={retweetQuotedTweetEntities}
                  quotedMedia={
                    retweetQuotedTweetExtendedEntities &&
                    retweetQuotedTweetExtendedEntities.media
                  }
                  quotedCreated={retweetQuotedTweetCreated}
                  quotedUser={retweetQuotedTweetUser}
                  quotedReply={retweetQuotedTweetReplyStatus}
                />
              </animated.div>
            );
          }

          return (
            <animated.div key={key} style={props}>
              <Tweet
                id={retweetId}
                fullText={retweetFullText}
                entities={retweetEntities}
                media={retweetExtendedEntities && retweetExtendedEntities.media}
                created={retweetCreated}
                user={retweetUser}
                retweet={true}
                quoted={false}
                retweeterAvatar={user.profile_image_url_https}
                retweeterHandle={user.screen_name}
                reply={retweetReplyStatus}
              />
            </animated.div>
          );
        }

        if (quotedTweet) {
          const {
            full_text: quotedTweetFullText,
            entities: quotedTweetEntities,
            extended_entities: quotedTweetExtendedEntities,
            created_at: quotedTweetCreated,
            user: quotedTweetUser,
            in_reply_to_status_id: quotedTweetReplyStatus
          } = quotedTweet;

          return (
            <animated.div key={key} style={props}>
              <Tweet
                id={id}
                fullText={full_text}
                entities={entities}
                media={extended_entities && extended_entities.media}
                user={user}
                retweet={false}
                quoted={true}
                created={created_at}
                reply={in_reply_to_status_id}
                quotedFullText={quotedTweetFullText}
                quotedEntities={quotedTweetEntities}
                quotedMedia={
                  quotedTweetExtendedEntities &&
                  quotedTweetExtendedEntities.media
                }
                quotedCreated={quotedTweetCreated}
                quotedUser={quotedTweetUser}
                quotedReply={quotedTweetReplyStatus}
              />
            </animated.div>
          );
        }

        return (
          <animated.div key={key} style={props}>
            <Tweet
              id={id}
              fullText={full_text}
              entities={entities}
              media={extended_entities && extended_entities.media}
              user={user}
              retweet={false}
              quoted={false}
              created={created_at}
              reply={in_reply_to_status_id}
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
