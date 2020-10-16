import React, { useState, useEffect, useCallback } from 'react';
import { Skeleton, message } from 'antd';

import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ControlBar,
} from 'video-react';

import 'video-react/dist/video-react.css';

import {
  getVideo,
  getVideoProcess,
  reportVideoProcess,
  finishVideo,
  getDocuments,
  getQuestions,
} from '@/server';

import Header from '@/components/Header';

// import aa from '@/assets/1.mp4';
//@ts-ignore
import aa from '@/assets/0.mp4';
//@ts-ignore
import IMG from '@/assets/0.jpg';

interface VideoPlayer {
  seek: (arg0: number) => void;
  getState: () => {
    player: {
      duration: number;
      currentTime: number;
      paused: boolean;
      ended: boolean;
    };
  };
  subscribeToStateChange: (
    arg0: ({
      isFullscreen,
      playbackRate,
    }: {
      isFullscreen: boolean;
      playbackRate: number;
    }) => void,
  ) => void;
}

interface Video {
  id: number;
  url: string;
  name: string;
}

enum Rate {
  'Slow' = 2000,
  'Normal' = 1000,
  'Fast' = 500,
}

const RateToDurationMap: {
  [key: number]: Rate;
} = {
  0.5: Rate['Slow'],
  1: Rate['Normal'],
  2: Rate['Fast'],
};

const PROCESS_FINISH_FLAG = 0.8;

let playingInterval: Timeout;
let reportProcessInterval: Timeout;

import styles from './index.less';

export default () => {
  const [videoPlayer, setVideoPlayer] = useState<VideoPlayer>();
  const [video, setVideo] = useState<Video>();
  const [IsFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [intervalDuration, setIntervalDuration] = useState<Rate>(1000);
  const [playedTime, setPlayedTime] = useState<number>(0);

  const isFinishedVideo = (time: number, duration: number) =>
    time / duration > PROCESS_FINISH_FLAG;

  const handleFinishVideo = useCallback(() => {
    if (!video) return;
    finishVideo({ videoId: video.id }).then(() => {
      message.success('视频已完成');
    });
  }, [video]);

  useEffect(() => {
    const videoId = location.pathname.split('/').pop();
    getVideo({ videoId: Number(videoId) }).then(({ data }: { data: Video }) => {
      setVideo(data);
    });
    getDocuments({ videoId: Number(videoId) });
    getQuestions({ videoId: Number(videoId) });
  }, []);

  useEffect(() => {
    if (!video || !videoPlayer) return;
    getVideoProcess({ videoId: video.id }).then(({ data }) => {
      const newPlayedTime = playedTime + data;
      setPlayedTime(newPlayedTime);
      videoPlayer.seek(newPlayedTime);
    });
  }, [video, videoPlayer]);

  useEffect(() => {
    if (!video || !videoPlayer) return;
    videoPlayer.subscribeToStateChange(({ isFullscreen, playbackRate }) => {
      setIsFullScreen(isFullscreen);
      setIntervalDuration(RateToDurationMap[playbackRate]);
    });
  }, [video, videoPlayer]);

  useEffect(() => {
    if (!video || !videoPlayer || isFinish) return;

    const stopInterval = () => {
      playingInterval && window.clearInterval(playingInterval);
      reportProcessInterval && window.clearInterval(reportProcessInterval);
    };

    playingInterval = setInterval(() => {
      const { player } = videoPlayer.getState();
      const { duration, paused, currentTime, ended } = player;

      const checkIfFinish = () => {
        if (
          isFinishedVideo(playedTime, duration) &&
          isFinishedVideo(currentTime, duration)
        ) {
          stopInterval();
          setIsFinish(true);
          handleFinishVideo();
        }
      };

      if (!paused || ended) {
        setPlayedTime(playedTime + 1);
        checkIfFinish();
      }
    }, intervalDuration);

    reportProcessInterval = setInterval(() => {
      const { player } = videoPlayer.getState();
      const { paused } = player;
      if (!paused) {
        reportVideoProcess({
          videoId: video.id,
          process: playedTime,
        });
      }
    }, 5000);

    return () => {
      stopInterval();
    };
  }, [video, videoPlayer, intervalDuration, playedTime, isFinish]);

  return (
    <div>
      <Header title={video?.name ?? ''} />

      <Skeleton loading={!video}>
        {video && (
          <Player
            poster={IMG}
            aspectRatio="16:9"
            ref={(player: VideoPlayer) => {
              setVideoPlayer(player);
            }}
          >
            <BigPlayButton position="center" />
            <LoadingSpinner />
            <ControlBar
              className={
                IsFullScreen ? styles.fullControlBar : styles.controlBar
              }
            >
              <PlaybackRateMenuButton rates={[0.5, 1, 2]} />
            </ControlBar>
            <source src={aa} />
          </Player>
        )}
      </Skeleton>
    </div>
  );
};
