import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";
import RetweeterDetails from "./RetweeterDetails";
import QuotedTweet from "./QuotedTweet";
import { Context } from "./TweetsContextProvider";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 45,
    height: 45
  },
  details: {
    borderBottom: "1px solid rgba(66,66,66,.3)"
  }
}));

const Tweet = ({
  id,
  id_str,
  favorited,
  full_text,
  entities,
  extended_entities,
  user,
  created_at,
  quoted,
  in_reply_to_status_id,
  retweet,
  retweeter,
  quotedTweet
}) => {
  const { selectedTweet, selectTweet } = useContext(Context);
  const { avatar, details } = useStyles();
  const highResAvatar = () => {
    return user.profile_image_url_https.replace("_normal", "");
  };

  const styledBy = (property, mapping) => props => mapping[props[property]];

  const TweetContainer = withStyles({
    root: {
      padding: "5px 10px",
      backgroundColor: styledBy("highlight", {
        default: "none",
        true: "rgba(255, 255, 255, .05)"
      })
    }
  })(({ classes, highlight, ...other }) => (
    <Grid container className={classes.root} {...other} />
  ));

  return (
    <TweetContainer
      onClick={() => selectTweet(id)}
      highlight={selectedTweet === id}
    >
      {retweet && (
        <Grid item xs={12}>
          <RetweeterDetails retweeter={retweeter} />
        </Grid>
      )}
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={highResAvatar()} className={avatar} />
      </Grid>
      <Grid className={details} item xs={10}>
        <TweetHeader
          user={user}
          created={created_at}
          reply={in_reply_to_status_id}
        />
        <TweetBody
          fullText={full_text}
          entities={entities}
          media={extended_entities && extended_entities.media}
        />
        {quoted && <QuotedTweet {...quotedTweet} />}
        <TweetOptions user={user} tweetId={id_str} liked={favorited} />
      </Grid>
    </TweetContainer>
  );
};

export default Tweet;
