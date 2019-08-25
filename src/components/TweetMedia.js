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

const TweetMedia = ({ media, quoted }) => {
  const { media_container, video } = useStyles();
  let control;

  const onMouseOutHandler = event => {
    const { player } = control.getState();
    if (player.ended) {
      control.load(player.currentSrc);
    }
    control.pause();
  };

  const content = media.map(item => {
    if (item.type === "photo" && media.length < 2) {
      return {
        src: item.media_url_https,
        width: item.sizes.small.w,
        height: item.sizes.small.h,
        alt: "gallery"
      };
    }

    if (item.type === "photo" && media.length > 1) {
      return {
        src: item.media_url_https,
        width: item.sizes.thumb.w,
        height: item.sizes.thumb.h,
        alt: "gallery"
      };
    }

    if (item.type === "video") {
      return (
        <Box
          key={item.id}
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
            width={
              item.video_info.aspect_ratio[0] === 16 && quoted
                ? 380
                : item.video_info.aspect_ratio[0] === 16
                ? 390
                : item.video_info.aspect_ratio[0] === 1 ||
                  item.video_info.aspect_ratio[0] === 3 ||
                  item.video_info.aspect_ratio[0] === 4
                ? 300
                : 200
            }
            muted={true}
            aspectRatio={`${item.video_info.aspect_ratio[0]}:${
              item.video_info.aspect_ratio[1]
            }`}
          >
            {item.video_info.variants[3] &&
            item.video_info.variants[3].content_type === "video/mp4" ? (
              <source
                src={item.video_info.variants[3].url}
                type={item.video_info.variants[3].content_type}
              />
            ) : item.video_info.variants[2] &&
              item.video_info.variants[2].content_type === "video/mp4" ? (
              <source
                src={item.video_info.variants[2].url}
                type={item.video_info.variants[2].content_type}
              />
            ) : item.video_info.variants[1] &&
              item.video_info.variants[1].content_type === "video/mp4" ? (
              <source
                src={item.video_info.variants[1].url}
                type={item.video_info.variants[1].content_type}
              />
            ) : (
              <source
                src={item.video_info.variants[0].url}
                type={item.video_info.variants[0].content_type}
              />
            )}
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

    if (item.type === "animated_gif") {
      return (
        <Box
          key={item.id}
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
            width={quoted ? 380 : 390}
            muted={true}
            loop={true}
            aspectRatio={`${item.video_info.aspect_ratio[0]}:${
              item.video_info.aspect_ratio[1]
            }`}
          >
            <source
              src={item.video_info.variants[0].url}
              type={item.video_info.variants[0].content_type}
            />
            <LoadingSpinner disabled />
            <Shortcut disabled />
            <ControlBar disabled />
          </Player>
        </Box>
      );
    }

    return <Box key={item.id} />;
  });

  if (content[0].alt === "gallery") {
    return <Gallery photos={content} />;
  }

  return <Box className={media_container}>{content}</Box>;
};

export default TweetMedia;
