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
}

interface Video {
  id: number;
  url: string;
  name: string;
}

const PROCESS_FINISH_FLAG = 0.96;

import styles from './index.less';

export default () => {
  let playedTime: number = 0;

  const [videoPlayer, setVideoPlayer] = useState<VideoPlayer>();
  const [video, setVideo] = useState<Video>();

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
      playedTime += data;
      videoPlayer.seek(playedTime);
    });
  }, [video, videoPlayer]);

  useEffect(() => {
    if (!video || !videoPlayer) return;
    let playingInterval: Timeout;
    let reportProcessInterval: Timeout;

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
          handleFinishVideo();
        }
      };

      if (!paused || ended) {
        playedTime++;
        checkIfFinish();
      }
    }, 1000);

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
  }, [video, videoPlayer]);

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
            <ControlBar className={styles.controlBar}>
              <PlaybackRateMenuButton rates={[0.5, 1, 2]} />
            </ControlBar>
            <source src={aa} />
          </Player>
        )}
      </Skeleton>
    </div>
  );
};
