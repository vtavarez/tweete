import React from "react";
import Box from "@material-ui/core/Box";
import "video-react/dist/video-react.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Player,
  ControlBar,
  FullscreenToggle,
  Shortcut,
  PlayToggle
} from "video-react";

const useStyles = makeStyles(theme => ({
  media_container: {
    margin: "5px 0",
    paddingRight: 10
  },
  img: {
    maxWidth: 390,
    height: "auto",
    borderRadius: 10
  },
  video: {
    borderRadius: 10,
    "& video": {
      borderRadius: 10,
      outline: "none"
    }
  }
}));

const TweetMedia = props => {
  const { media_container, img, video } = useStyles();
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
          onDoubleClick={e => {
            e.preventDefault();
          }}
        >
          <Player
            ref={player => {
              control = player;
            }}
            className={video}
            fluid={true}
            muted={true}
            aspectRatio={`${media.video_info.aspect_ratio[0]}:${
              media.video_info.aspect_ratio[1]
            }`}
          >
            <source src={media.video_info.variants[2].url} />
            <Shortcut disabled />
            <ControlBar autoHideTime={1000}>
              <PlayToggle disabled />
              <FullscreenToggle disabled />
            </ControlBar>
          </Player>
        </Box>
      );
    }

    if (media.type === "animated_gif") {
      return (
        <Box
          key={media.id}
          onMouseOver={() => control.play()}
          onMouseOut={() => control.pause()}
          onDoubleClick={e => {
            e.preventDefault();
          }}
        >
          <Player
            ref={player => {
              control = player;
            }}
            className={video}
            fluid={true}
            muted={true}
            aspectRatio={`${media.video_info.aspect_ratio[0]}:${
              media.video_info.aspect_ratio[1]
            }`}
          >
            <source src={media.video_info.variants[0].url} />
            <Shortcut disabled />
            <ControlBar disabled>
              <PlayToggle disabled />
              <FullscreenToggle disabled />
            </ControlBar>
          </Player>
        </Box>
      );
    }

    return <Box key={media.id} />;
  });

  return <Box className={media_container}>{content}</Box>;
};

export default TweetMedia;
