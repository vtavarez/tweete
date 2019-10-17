import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";

const useStyles = makeStyles(theme => ({
  grid_container: {
    padding: "10px",
    borderRadius: 5,
    margin: "5px 0",
    backgroundColor: "rgba(255, 255, 255, .05)"
  },
  selected: {
    backgroundColor: "rgba(255, 255, 255, .05)"
  }
}));

const QuotedTweet = ({
  full_text,
  entities,
  extended_entities,
  created_at,
  user,
  in_reply_to_status_id
}) => {
  const { grid_container } = useStyles();
  return (
    <Grid className={grid_container}>
      <Grid item xs={12}>
        <TweetHeader
          user={user}
          created={created_at}
          fontSize={13}
          reply={in_reply_to_status_id}
          quoted
        />
        <TweetBody
          fullText={full_text}
          entities={entities}
          media={extended_entities && extended_entities.media}
          fontSize={12}
          quoted
        />
      </Grid>
    </Grid>
  );
};

export default QuotedTweet;
