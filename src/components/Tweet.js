import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";
import RetweeterDetails from "./RetweeterDetails";
import QuotedTweet from "./QuotedTweet";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "5px 10px"
  },
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
  const { avatar, details, container } = useStyles();
  const highResAvatar = () => {
    return user.profile_image_url_https.replace("_normal", "");
  };

  return (
    <Grid container className={container}>
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
    </Grid>
  );
};

export default Tweet;
