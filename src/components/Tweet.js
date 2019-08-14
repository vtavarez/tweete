import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";
import RetweeterDetails from "./RetweeterDetails";
import QuotedTweet from "./QuotedTweet";

const styledBy = (property, mapping) => props => mapping[props[property]];

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 45,
    height: 45
  },
  tweet_details: {
    borderBottom: "1px solid rgba(66,66,66,.3)"
  }
}));

const TweetContainer = withStyles({
  root: {
    padding: "5px 10px",
    backgroundColor: styledBy("highlight", {
      default: "inherit",
      highlight: "rgba(255, 255, 255, .05)"
    })
  }
})(({ classes, highlight, ...other }) => (
  <Grid container className={classes.root} {...other} />
));

const Tweet = props => {
  const { avatar, tweet_details } = useStyles();
  const [highlight, setHighlight] = useState("default");
  const {
    fullText,
    entities,
    media,
    user,
    created,
    quoted,
    reply,
    retweet,
    retweeterAvatar,
    retweeterHandle,
    quotedFullText,
    quotedEntities,
    quotedMedia,
    quotedCreated,
    quotedUser,
    quotedReply
  } = props;
  const higherResAavatar = () => {
    return user.profile_image_url_https.replace("_normal", "");
  };

  const onTweetClick = () => {
    setHighlight("highlight");
  };

  return (
    <TweetContainer onClick={onTweetClick} highlight={highlight}>
      {retweet && (
        <Grid item xs={12}>
          <RetweeterDetails avatar={retweeterAvatar} handle={retweeterHandle} />
        </Grid>
      )}
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={higherResAavatar()} className={avatar} />
      </Grid>
      <Grid className={tweet_details} item xs={10}>
        <TweetHeader
          name={user.name}
          handle={user.screen_name}
          verified={user.verified}
          created={created}
          reply={reply}
        />
        <TweetBody fullText={fullText} entities={entities} media={media} />
        {quoted && (
          <QuotedTweet
            quotedFullText={quotedFullText}
            quotedEntities={quotedEntities}
            quotedMedia={quotedMedia}
            quotedCreated={quotedCreated}
            quotedUser={quotedUser}
            quotedReply={quotedReply}
          />
        )}
        <TweetOptions {...props} />
      </Grid>
    </TweetContainer>
  );
};

export default connect(null)(Tweet);
