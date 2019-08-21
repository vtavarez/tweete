import React from "react";
import { connect } from "react-redux";
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
}) => {
  const { avatar, details, container } = useStyles();
  const higherResAavatar = () => {
    return user.profile_image_url_https.replace("_normal", "");
  };

  return (
    <Grid container className={container}>
      {retweet && (
        <Grid item xs={12}>
          <RetweeterDetails avatar={retweeterAvatar} handle={retweeterHandle} />
        </Grid>
      )}
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={higherResAavatar()} className={avatar} />
      </Grid>
      <Grid className={details} item xs={10}>
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
        <TweetOptions id={user.id} handle={user.screen_name} />
      </Grid>
    </Grid>
  );
};

export default connect(null)(Tweet);
