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
  idStr,
  liked,
  fullText,
  entities,
  media,
  user,
  created,
  quoted,
  reply,
  retweet,
  retweeter,
  quotedFullText,
  quotedEntities,
  quotedMedia,
  quotedCreated,
  quotedUser,
  quotedReply
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
        <TweetHeader user={user} created={created} reply={reply} />
        <TweetBody fullText={fullText} entities={entities} media={media} />
        {quoted && (
          <QuotedTweet
            fullText={quotedFullText}
            entities={quotedEntities}
            media={quotedMedia}
            created={quotedCreated}
            user={quotedUser}
            reply={quotedReply}
          />
        )}
        <TweetOptions user={user} tweetId={idStr} liked={liked} />
      </Grid>
    </Grid>
  );
};

export default Tweet;
