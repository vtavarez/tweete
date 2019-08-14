import React from "react";
import Box from "@material-ui/core/Box";
import Gallery from "react-photo-gallery";
import "video-react/dist/video-react.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Player,
  ControlBar,
  Shortcut,
  PlayToggle,
  FullscreenToggle,
  LoadingSpinner
} from "video-react";

// TODO enlarge clicked media in a new browswer window.

const useStyles = makeStyles(theme => ({
  media_container: {
    margin: "5px 0",
    width: "fit-content"
  },
  video: {
    borderRadius: 5,
    "& video": {
      borderRadius: 5,
      outline: "none"
    }
  }
}));

const TweetMedia = props => {
  const { media_container, video } = useStyles();
  const { media } = props.media;
  let control;

  const onMouseOutHandler = event => {
    const { player } = control.getState();
    if (player.ended) {
      control.load(player.currentSrc);
    }
    control.pause();
  };

  const content = media.map(media => {
    if (media.type === "photo") {
      return {
        src: media.media_url_https,
        width: media.sizes.large.w,
        height: media.sizes.large.h,
        alt: "gallery"
      };
    }

    if (media.type === "video") {
      return (
        <Box
          key={media.id}
          onMouseOver={() => control.play()}
          onMouseOut={onMouseOutHandler}
          onDoubleClick={e => {
            e.preventDefault();
          }}
        >
          <Player
            ref={player => {
              control = player;
            }}
            className={video}
            fluid={false}
            width={390}
            muted={true}
            aspectRatio={`${media.video_info.aspect_ratio[0]}:${
              media.video_info.aspect_ratio[1]
            }`}
          >
            <source
              src={media.video_info.variants[1].url}
              type={media.video_info.variants[1].content_type}
            />
            <LoadingSpinner disabled />
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
          onMouseOut={onMouseOutHandler}
          onDoubleClick={e => {
            e.preventDefault();
          }}
        >
          <Player
            ref={player => {
              control = player;
            }}
            className={video}
            fluid={false}
            width={390}
            muted={true}
            loop={true}
            aspectRatio={`${media.video_info.aspect_ratio[0]}:${
              media.video_info.aspect_ratio[1]
            }`}
          >
            <source
              src={media.video_info.variants[0].url}
              type={media.video_info.variants[0].content_type}
            />
            <LoadingSpinner disabled />
            <Shortcut disabled />
            <ControlBar disabled />
          </Player>
        </Box>
      );
    }

    return <Box key={media.id} />;
  });

  if (content[0].alt) {
    return <Gallery photos={content} />;
  }

  return <Box className={media_container}>{content}</Box>;
};

export default TweetMedia;
