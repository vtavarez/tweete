import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  created_time: {
    float: "right",
    marginRight: 10,
    color: theme.palette.grey[400],
    fontWeight: 500,
    fontSize: props => props.fontSize || 13,
    userSelect: "none"
  }
}));

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "a few seconds ago",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mon",
    MM: "%dmon",
    y: "1y",
    yy: "%dy"
  }
});

const TweetCreatedAt = props => {
  const classes = useStyles(props);
  const date = new Date(Date.parse(props.created.replace(/( \+)/, " UTC$1")));
  const [time, setTime] = useState(moment.utc(date).fromNow());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(moment.utc(date).fromNow()),
      60000
    );
    return () => clearInterval(interval);
  }, [date]);

  return <span className={classes.created_time}>{time}</span>;
};

export default TweetCreatedAt;
