import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useTransition, animated, config } from "react-spring";
import { fetchPreviousTweets } from "../../actions";
import CircularLoader from "../CircularLoader";
import Tweet from "../Tweet";
import LinearLoader from "../LinearLoader";

// TODO search bar to filter tweets

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "calc(100vh - 108px)",
    transform: "translateY(54px)",
    overflowX: "hidden"
  }
}));

const Timeline = ({ status, timeline, fetchPreviousTweets }) => {
  console.log(timeline);
  const { container } = useStyles();
  const transitions = useTransition(timeline, timeline => timeline.id, {
    initial: { opacity: 1, transform: "translate3d(0%,0,0)" },
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    reset: true,
    config: config.slow
  });

  const [disabledFetch, disableFetch] = useState(false);

  useEffect(() => {
    if (status === "fetchedPreviousTweets") {
      disableFetch(false);
    }
  }, [status]);

  const onScrollHandler = e => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !disabledFetch
    ) {
      fetchPreviousTweets();
      disableFetch(true);
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
          user,
          retweeted_status: retweet,
          quoted_status: quotedTweet
        } = tweet;

        if (retweet) {
          const { quoted_status: quotedRetweet } = retweet;

          if (quotedRetweet) {
            return (
              <animated.div key={key} style={props}>
                <Tweet
                  retweet
                  quoted
                  retweeter={user}
                  quotedTweet={{
                    ...quotedRetweet
                  }}
                  {...retweet}
                />
              </animated.div>
            );
          }

          return (
            <animated.div key={key} style={props}>
              <Tweet retweet retweeter={user} {...retweet} />
            </animated.div>
          );
        }

        if (quotedTweet) {
          return (
            <animated.div key={key} style={props}>
              <Tweet quoted quotedTweet={{ ...quotedTweet }} {...tweet} />
            </animated.div>
          );
        }

        return (
          <animated.div key={key} style={props}>
            <Tweet {...tweet} />
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
)(Timeline);
