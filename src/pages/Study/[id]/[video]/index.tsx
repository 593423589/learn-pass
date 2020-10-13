import React, { useRef, useEffect } from 'react';
// import {
//   Player,
//   BigPlayButton,
//   LoadingSpinner,
//   PlaybackRateMenuButton,
//   ControlBar,
// } from 'video-react';
// import 'video-react/dist/video-react.css';

import checkFull from '@/util/checkFull';
// import aa from '@/assets/2.mp4';
// import aa from '@/assets/1.mp4';
// import IMG from '@/assets/1.jpg';
export default () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <p>第一节课</p>
{/* 
      <Player poster={IMG} aspectRatio="16:9">
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar>
          <PlaybackRateMenuButton rates={[0.5, 1, 2]} />
        </ControlBar>
        <source src={aa} />
      </Player> */}
    </div>
  );
};
