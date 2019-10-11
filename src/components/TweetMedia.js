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

  const onMouseOutHandler = e => {
    const { player } = control.getState();
    if (player.ended) {
      control.load(player.currentSrc);
    }
    control.pause();
  };

  const content = media.map(item => {
    if (item.type === "photo") {
      return {
        src: item.media_url_https,
        width: item.sizes.small.w / 100,
        height: item.sizes.small.h / 100,
        alt: "gallery"
      };
    }

    if (item.type === "video") {
      const [ratioWidth, ratioHeight] = item.video_info.aspect_ratio;
      const [
        videoSourceOne,
        videoSourceTwo,
        videoSourceThree,
        videoSourceFour
      ] = item.video_info.variants;
      const bitrate = 832000;

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
              ratioWidth === 16 && quoted
                ? 380
                : ratioWidth === 16 || ratioWidth === 4
                ? 390
                : ratioWidth === 1 || ratioWidth === 3
                ? 300
                : ratioWidth === 9
                ? 200
                : 390
            }
            muted={true}
            aspectRatio={`${ratioWidth}:${ratioHeight}`}
          >
            {videoSourceFour && videoSourceFour.bitrate === bitrate && (
              <source
                src={videoSourceFour.url}
                type={videoSourceFour.content_type}
              />
            )}
            {videoSourceThree && videoSourceThree.bitrate === bitrate && (
              <source
                src={videoSourceThree.url}
                type={videoSourceThree.content_type}
              />
            )}
            {videoSourceTwo && videoSourceTwo.bitrate === bitrate && (
              <source
                src={videoSourceTwo.url}
                type={videoSourceTwo.content_type}
              />
            )}
            {videoSourceOne && videoSourceOne.bitrate === bitrate && (
              <source
                src={videoSourceOne.url}
                type={videoSourceOne.content_type}
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
      const [ratioWidth, ratioHeight] = item.video_info.aspect_ratio;
      const [gif] = item.video_info.variants;
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
            aspectRatio={`${ratioWidth}:${ratioHeight}`}
          >
            <source src={gif.url} type={gif.content_type} />
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
