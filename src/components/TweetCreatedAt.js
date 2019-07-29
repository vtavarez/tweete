import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  created_time: {
    float: "right",
    marginRight: 10,
    color: theme.palette.grey[500],
    fontWeight: 600,
    fontSize: 13,
    userSelect: "none"
  }
}));

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "a few seconds ago",
    ss: "%ds",
    m: "a minute ago",
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
  const classes = useStyles();

  const createdAt = () => {
    const date = new Date(Date.parse(props.created.replace(/( \+)/, " UTC$1")));
    return moment.utc(date).fromNow();
  };

  const [time, setTime] = useState(createdAt());

  const updateTime = () => {
    setTime(createdAt());
  };

  useEffect(() => {
    setInterval(updateTime, 60000);
  }, []);

  return <span className={classes.created_time}>{time}</span>;
};

export default TweetCreatedAt;
