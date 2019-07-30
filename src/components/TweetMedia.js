import React from "react";
import Box from "@material-ui/core/Box";
import "video-react/dist/video-react.css";
import { makeStyles } from "@material-ui/core/styles";
import { Player, ControlBar } from "video-react";

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: 390,
    height: "auto",
    borderRadius: 10
  },
  video: {
    borderRadius: 10,
    "& video": {
      borderRadius: 10
    }
  }
}));

const TweetMedia = props => {
  const { img, video } = useStyles();
  const { media } = props.media;
  let control;

  const content = media.map(media => {
    if (media.type === "photo") {
      return (
        <Box key={media.id}>
          <img className={img} src={media.media_url_https} alt="" />
        </Box>
      );
    }

    if (media.type === "video") {
      return (
        <Box
          key={media.id}
          onMouseOver={() => control.play()}
          onMouseOut={() => control.pause()}
        >
          <Player
            ref={player => {
              control = player;
            }}
            className={video}
            fluid={false}
            width={media.sizes.small.w}
            height={media.sizes.small.h}
            muted={true}
            aspectRatio={`${media.video_info.aspect_ratio[0]}:${
              media.video_info.aspect_ratio[1]
            }`}
          >
            <source src={media.video_info.variants[2].url} />
            <ControlBar autoHideTime={1000} />
          </Player>
        </Box>
      );
    }

    return <Box />;
  });

  return <Box>{content}</Box>;
};

export default TweetMedia;
