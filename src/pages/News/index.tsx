import React, { useState } from 'react';
import PullDown from '@/components/PullDown';

export default function News() {
  const [fresh, setFresh] = useState(1);
  console.log(fresh);
  return (
    <>
      <PullDown
        onRefresh={() => {
          setFresh(Math.random());
        }}
      >
        {fresh > 0.5 ? <h1>大于0.5</h1> : <span>小于0.5</span>}
      </PullDown>
    </>
  );
}
